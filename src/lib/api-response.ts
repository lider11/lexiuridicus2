import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function ok<T>(data?: T) {
  return NextResponse.json(data ?? { ok: true });
}

export function created<T>(data?: T) {
  return NextResponse.json(data ?? { ok: true }, { status: 201 });
}

export function badRequest(message = "Datos inválidos.") {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function tooManyRequests(message: string) {
  return NextResponse.json({ error: message }, { status: 429 });
}

export function validationError(error: unknown) {
  if (error instanceof ZodError) {
    const firstError = error.issues[0]?.message || "Datos inválidos.";
    return badRequest(firstError);
  }

  return badRequest();
}

export function serverError(context: string, error: unknown) {
  console.error(context, error);

  return NextResponse.json(
    { error: "Ocurrió un error interno. Intenta nuevamente." },
    { status: 500 },
  );
}
