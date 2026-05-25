import { NextResponse } from "next/server";

export function isAdminRequest(request: Request) {
  const configuredToken = process.env.ADMIN_TOKEN;
  const providedToken = request.headers.get("x-admin-token");

  return Boolean(
    configuredToken && providedToken && providedToken === configuredToken,
  );
}

export function unauthorized() {
  return NextResponse.json({ error: "No autorizado." }, { status: 401 });
}
