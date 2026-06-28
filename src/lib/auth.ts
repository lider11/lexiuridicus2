import { NextResponse } from "next/server";

const unsafeAdminTokens = new Set([
  "",
  "change-this-admin-token",
  "replace-with-a-random-token-of-at-least-32-characters",
]);
const recommendedProductionTokenLength = 32;

function isSecureAdminToken(token: string | undefined) {
  const normalizedToken = token?.trim() || "";

  if (unsafeAdminTokens.has(normalizedToken)) {
    return false;
  }

  if (
    process.env.NODE_ENV === "production" &&
    normalizedToken.length < recommendedProductionTokenLength
  ) {
    console.warn("ADMIN_TOKEN should be at least 32 characters in production.");
  }

  return true;
}

export function isAdminRequest(request: Request) {
  const configuredToken = process.env.ADMIN_TOKEN;
  const providedToken = request.headers.get("x-admin-token");

  return Boolean(
    isSecureAdminToken(configuredToken) &&
    providedToken &&
    providedToken === configuredToken,
  );
}

export function unauthorized() {
  return NextResponse.json({ error: "No autorizado." }, { status: 401 });
}
