import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { query } from "@/lib/db";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { isRateLimited, requestIp } from "@/lib/rateLimit";
import { LeadSchema, UpdateClientSchema } from "@/lib/validators/client.schema";
import type { Client } from "@/types";

function validationError(error: unknown) {
  if (error instanceof ZodError) {
    const firstError = error.issues[0]?.message || "Datos inválidos.";
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
}

function serverError(context: string, error: unknown) {
  console.error(context, error);

  return NextResponse.json(
    { error: "Ocurrió un error interno. Intenta nuevamente." },
    { status: 500 }
  );
}

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  try {
    const clients = await query<Client[]>(
      `SELECT id, full_name, company, role, email, phone, legal_need, business_goal, shareholder_context, urgency, status,
         privacy_accepted, notes, internal_notes, created_at
       FROM clients
       ORDER BY created_at DESC`
    );

    return NextResponse.json({ clients });
  } catch (error) {
    return serverError("CLIENTS_GET_ERROR", error);
  }
}

export async function POST(request: Request) {
  if (isRateLimited(`lead:${requestIp(request)}`, 6, 60_000)) {
    return NextResponse.json(
      { error: "Demasiados intentos. Intenta de nuevo en un minuto." },
      { status: 429 }
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
      ]
    );

    return NextResponse.json({ ok: true }, { status: 201 });
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
      await query("UPDATE clients SET status = ?, internal_notes = ? WHERE id = ?", [
        payload.status,
        payload.internal_notes || null,
        payload.id,
      ]);
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
      return NextResponse.json(
        { error: "No hay cambios para guardar." },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true });
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
      return NextResponse.json({ error: "Cliente inválido." }, { status: 400 });
    }

    await query("DELETE FROM clients WHERE id = ?", [id]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return serverError("CLIENT_DELETE_ERROR", error);
  }
}