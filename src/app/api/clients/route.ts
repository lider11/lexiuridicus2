import { ZodError } from "zod";
import { requirePermission, unauthorized } from "@/lib/auth";
import { appendAuditEvent } from "@/lib/audit";
import {
  badRequest,
  created,
  ok,
  serverError,
  tooManyRequests,
  validationError,
} from "@/lib/api-response";
import { query } from "@/lib/db";
import { isRateLimited, requestIp } from "@/lib/rateLimit";
import { LeadSchema, UpdateClientSchema } from "@/lib/validators/client.schema";
import type { Client } from "@/types";

export async function GET(request: Request) {
  const actor = await requirePermission(request, "clients:read");
  if (!actor) return unauthorized();

  try {
    const clients = await query<Client[]>(
      `SELECT id, full_name, company, role, email, phone, legal_need, business_goal, shareholder_context, urgency, status,
         privacy_accepted, notes, internal_notes, created_at
       FROM clients
       WHERE organization_id = ?
       ORDER BY created_at DESC`,
      [actor.organizationId],
    );

    return ok({ clients });
  } catch (error) {
    return serverError("CLIENTS_GET_ERROR", error);
  }
}

export async function POST(request: Request) {
  if (isRateLimited(`lead:${requestIp(request)}`, 6, 60_000)) {
    return tooManyRequests(
      "Demasiados intentos. Intenta de nuevo en un minuto.",
    );
  }

  try {
    const body = await request.json();
    const lead = LeadSchema.parse(body);

    await query(
      `INSERT INTO clients
         (organization_id, full_name, company, role, email, phone, legal_need, business_goal,
          shareholder_context, urgency, privacy_accepted, notes)
       SELECT id, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
       FROM organizations
       WHERE slug = ? AND status = 'active'`,
      [
        lead.full_name,
        lead.company,
        lead.role,
        lead.email,
        lead.phone,
        lead.legal_need,
        lead.business_goal,
        lead.shareholder_context || null,
        lead.urgency,
        lead.privacy_accepted,
        lead.notes || null,
        process.env.LEAD_ORGANIZATION_SLUG || "lex-iuridicus",
      ],
    );

    return created();
  } catch (error) {
    if (error instanceof ZodError) {
      return validationError(error);
    }

    return serverError("CLIENT_CREATE_ERROR", error);
  }
}

export async function PATCH(request: Request) {
  const actor = await requirePermission(request, "clients:write");
  if (!actor) return unauthorized();

  try {
    const body = await request.json();
    const payload = UpdateClientSchema.parse(body);

    if (payload.status && payload.internal_notes !== undefined) {
      await query(
        "UPDATE clients SET status = ?, internal_notes = ? WHERE id = ? AND organization_id = ?",
        [
          payload.status,
          payload.internal_notes || null,
          payload.id,
          actor.organizationId,
        ],
      );
    } else if (payload.status) {
      await query(
        "UPDATE clients SET status = ? WHERE id = ? AND organization_id = ?",
        [payload.status, payload.id, actor.organizationId],
      );
    } else if (payload.internal_notes !== undefined) {
      await query(
        "UPDATE clients SET internal_notes = ? WHERE id = ? AND organization_id = ?",
        [payload.internal_notes || null, payload.id, actor.organizationId],
      );
    } else {
      return badRequest("No hay cambios para guardar.");
    }

    await appendAuditEvent(request, actor, {
      action: "client.updated",
      entityType: "client",
      entityId: payload.id,
      metadata: { fields: Object.keys(payload).filter((key) => key !== "id") },
    });
    return ok();
  } catch (error) {
    if (error instanceof ZodError) {
      return validationError(error);
    }

    return serverError("CLIENT_UPDATE_ERROR", error);
  }
}

export async function DELETE(request: Request) {
  const actor = await requirePermission(request, "clients:write");
  if (!actor) return unauthorized();

  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    if (!Number.isInteger(id) || id <= 0) {
      return badRequest("Cliente inválido.");
    }

    await query("DELETE FROM clients WHERE id = ? AND organization_id = ?", [
      id,
      actor.organizationId,
    ]);
    await appendAuditEvent(request, actor, {
      action: "client.deleted",
      entityType: "client",
      entityId: id,
    });

    return ok();
  } catch (error) {
    return serverError("CLIENT_DELETE_ERROR", error);
  }
}
