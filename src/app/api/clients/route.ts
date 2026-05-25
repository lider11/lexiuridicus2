import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { allowedClientStatuses, allowedUrgencies } from "@/lib/constants";
import { isRateLimited, requestIp } from "@/lib/rateLimit";
import type { Client, ClientStatus } from "@/types";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  const clients = await query<Client[]>(
    `SELECT id, full_name, company, role, email, phone, legal_need, business_goal, shareholder_context, urgency, status,
       privacy_accepted, notes, internal_notes, created_at
     FROM clients
     ORDER BY created_at DESC`
  );

  return NextResponse.json({ clients });
}

export async function POST(request: Request) {
  if (isRateLimited(`lead:${requestIp(request)}`, 6, 60_000)) {
    return NextResponse.json({ error: "Demasiados intentos. Intenta de nuevo en un minuto." }, { status: 429 });
  }

  const body = await request.json();
  const fullName = String(body.full_name || "").trim();
  const company = String(body.company || "").trim();
  const role = String(body.role || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const legalNeed = String(body.legal_need || "").trim();
  const businessGoal = String(body.business_goal || "").trim();
  const shareholderContext = String(body.shareholder_context || "").trim();
  const urgency = allowedUrgencies.includes(body.urgency) ? body.urgency : "media";
  const notes = String(body.notes || "").trim();
  const privacyAccepted = Boolean(body.privacy_accepted);

  if (!fullName || !company || !role || !email || !phone || !legalNeed || !businessGoal || !privacyAccepted) {
    return NextResponse.json(
      { error: "Nombre, empresa, cargo, contacto, servicio, objetivo y autorizacion son obligatorios." },
      { status: 400 }
    );
  }

  await query(
    `INSERT INTO clients
       (full_name, company, role, email, phone, legal_need, business_goal, shareholder_context, urgency, privacy_accepted, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      fullName,
      company,
      role,
      email,
      phone,
      legalNeed,
      businessGoal,
      shareholderContext || null,
      urgency,
      privacyAccepted,
      notes || null,
    ]
  );

  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  const body = await request.json();
  const id = Number(body.id);
  const status = body.status ? (String(body.status) as ClientStatus) : undefined;
  const internalNotes = typeof body.internal_notes === "string" ? body.internal_notes.trim() : undefined;

  if (!id) {
    return NextResponse.json({ error: "Cliente invalido." }, { status: 400 });
  }

  if (status && !allowedClientStatuses.includes(status)) {
    return NextResponse.json({ error: "Estado invalido." }, { status: 400 });
  }

  if (status && internalNotes !== undefined) {
    await query("UPDATE clients SET status = ?, internal_notes = ? WHERE id = ?", [status, internalNotes || null, id]);
  } else if (status) {
    await query("UPDATE clients SET status = ? WHERE id = ?", [status, id]);
  } else if (internalNotes !== undefined) {
    await query("UPDATE clients SET internal_notes = ? WHERE id = ?", [internalNotes || null, id]);
  } else {
    return NextResponse.json({ error: "No hay cambios para guardar." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));

  if (!id) {
    return NextResponse.json({ error: "Cliente invalido." }, { status: 400 });
  }

  await query("DELETE FROM clients WHERE id = ?", [id]);

  return NextResponse.json({ ok: true });
}
