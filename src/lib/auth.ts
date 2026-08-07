import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export type Permission =
  | "clients:read"
  | "clients:write"
  | "posts:write"
  | "comments:moderate"
  | "admin:manage";

export type AuthContext = {
  userId: number;
  organizationId: number;
  sessionId: number;
  email: string;
  roles: string[];
  permissions: Permission[];
};

type SessionRow = {
  session_id: number;
  user_id: number;
  organization_id: number;
  email: string;
  roles: string;
  permissions: string;
};

function bearerToken(request: Request) {
  const authorization = request.headers.get("authorization") || "";
  const [scheme, token] = authorization.split(" ", 2);
  return scheme?.toLowerCase() === "bearer" && token ? token.trim() : null;
}

export function hashSessionToken(token: string) {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

export async function authenticateRequest(
  request: Request,
): Promise<AuthContext | null> {
  const token = bearerToken(request);
  if (!token || token.length < 32) return null;

  const tokenHash = hashSessionToken(token);
  const sessions = await query<SessionRow[]>(
    `SELECT s.id AS session_id, u.id AS user_id, m.organization_id, u.email,
       GROUP_CONCAT(DISTINCT r.code ORDER BY r.code) AS roles,
       GROUP_CONCAT(DISTINCT p.code ORDER BY p.code) AS permissions
     FROM admin_sessions s
     INNER JOIN admin_users u ON u.id = s.user_id AND u.status = 'active'
     INNER JOIN organization_memberships m
       ON m.user_id = u.id AND m.organization_id = s.organization_id AND m.status = 'active'
     INNER JOIN membership_roles mr ON mr.membership_id = m.id
     INNER JOIN roles r ON r.id = mr.role_id
     INNER JOIN role_permissions rp ON rp.role_id = r.id
     INNER JOIN permissions p ON p.id = rp.permission_id
     WHERE s.token_hash = ? AND s.revoked_at IS NULL AND s.expires_at > UTC_TIMESTAMP()
     GROUP BY s.id, u.id, m.organization_id, u.email
     LIMIT 1`,
    [tokenHash],
  );

  const session = sessions[0];
  if (!session) return null;

  return {
    userId: session.user_id,
    organizationId: session.organization_id,
    sessionId: session.session_id,
    email: session.email,
    roles: session.roles ? session.roles.split(",") : [],
    permissions: session.permissions
      ? (session.permissions.split(",") as Permission[])
      : [],
  };
}

export async function requirePermission(
  request: Request,
  permission: Permission,
): Promise<AuthContext | null> {
  const context = await authenticateRequest(request);
  return context?.permissions.includes(permission) ? context : null;
}

export function unauthorized() {
  return NextResponse.json({ error: "No autorizado." }, { status: 401 });
}

export function forbidden() {
  return NextResponse.json({ error: "Permiso insuficiente." }, { status: 403 });
}
