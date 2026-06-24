import { ZodError } from "zod";
import { isAdminRequest, unauthorized } from "@/lib/auth";
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
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  try {
    const clients = await query<Client[]>(
      `SELECT id, full_name, company, role, email, phone, legal_need, business_goal, shareholder_context, urgency, status,
         privacy_accepted, notes, internal_notes, created_at
       FROM clients
       ORDER BY created_at DESC`,
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
         (full_name, company, role, email, phone, legal_need, business_goal, shareholder_context, urgency, privacy_accepted, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  try {
    const body = await request.json();
    const payload = UpdateClientSchema.parse(body);

    if (payload.status && payload.internal_notes !== undefined) {
      await query(
        "UPDATE clients SET status = ?, internal_notes = ? WHERE id = ?",
        [payload.status, payload.internal_notes || null, payload.id],
      );
    } else if (payload.status) {
      await query("UPDATE clients SET status = ? WHERE id = ?", [
        payload.status,
        payload.id,
      ]);
    } else if (payload.internal_notes !== undefined) {
      await query("UPDATE clients SET internal_notes = ? WHERE id = ?", [
        payload.internal_notes || null,
        payload.id,
      ]);
    } else {
      return badRequest("No hay cambios para guardar.");
    }

    return ok();
  } catch (error) {
    if (error instanceof ZodError) {
      return validationError(error);
    }

    return serverError("CLIENT_UPDATE_ERROR", error);
  }
}

export async function DELETE(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    if (!Number.isInteger(id) || id <= 0) {
      return badRequest("Cliente inválido.");
    }

    await query("DELETE FROM clients WHERE id = ?", [id]);

    return ok();
  } catch (error) {
    return serverError("CLIENT_DELETE_ERROR", error);
  }
}
