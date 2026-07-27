import { randomBytes } from "node:crypto";
import type { ResultSetHeader } from "mysql2";
import { z, ZodError } from "zod";
import { appendAuditEvent } from "@/lib/audit";
import {
  authenticateRequest,
  hashSessionToken,
  unauthorized,
} from "@/lib/auth";
import {
  badRequest,
  created,
  ok,
  serverError,
  validationError,
} from "@/lib/api-response";
import { query } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { isRateLimited, requestIp } from "@/lib/rateLimit";

const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .max(254)
    .transform((value) => value.toLowerCase()),
  password: z.string().min(12).max(200),
  organization: z.string().trim().min(2).max(120),
});

type LoginRow = {
  user_id: number;
  organization_id: number;
  password_hash: string;
};

export async function POST(request: Request) {
  if (isRateLimited(`admin-login:${requestIp(request)}`, 5, 15 * 60_000)) {
    return badRequest("Demasiados intentos. Intenta más tarde.");
  }

  try {
    const input = LoginSchema.parse(await request.json());
    const users = await query<LoginRow[]>(
      `SELECT u.id AS user_id, m.organization_id, u.password_hash
       FROM admin_users u
       INNER JOIN organization_memberships m ON m.user_id = u.id AND m.status = 'active'
       INNER JOIN organizations o ON o.id = m.organization_id AND o.status = 'active'
       WHERE u.email = ? AND u.status = 'active' AND o.slug = ?
       LIMIT 1`,
      [input.email, input.organization],
    );
    const user = users[0];
    if (!user || !verifyPassword(input.password, user.password_hash)) {
      return unauthorized();
    }

    const token = randomBytes(48).toString("base64url");
    const result = await query<ResultSetHeader>(
      `INSERT INTO admin_sessions
         (user_id, organization_id, token_hash, expires_at)
       VALUES (?, ?, ?, DATE_ADD(UTC_TIMESTAMP(), INTERVAL 8 HOUR))`,
      [user.user_id, user.organization_id, hashSessionToken(token)],
    );
    await query(
      "UPDATE admin_users SET last_login_at = UTC_TIMESTAMP() WHERE id = ?",
      [user.user_id],
    );

    return created({
      token,
      expiresInSeconds: 28_800,
      sessionId: result.insertId,
    });
  } catch (error) {
    if (error instanceof ZodError) return validationError(error);
    return serverError("ADMIN_LOGIN_ERROR", error);
  }
}

export async function DELETE(request: Request) {
  const actor = await authenticateRequest(request);
  if (!actor) return unauthorized();

  try {
    await query(
      "UPDATE admin_sessions SET revoked_at = UTC_TIMESTAMP() WHERE id = ? AND user_id = ?",
      [actor.sessionId, actor.userId],
    );
    await appendAuditEvent(request, actor, {
      action: "session.revoked",
      entityType: "admin_session",
      entityId: actor.sessionId,
    });
    return ok();
  } catch (error) {
    return serverError("ADMIN_LOGOUT_ERROR", error);
  }
}
