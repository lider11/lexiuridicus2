import { afterEach, describe, expect, it, vi } from "vitest";
import { isAdminRequest } from "@/lib/auth";

function adminRequest(token: string) {
  return new Request("https://lexiuridicus.site/api/clients", {
    headers: { "x-admin-token": token },
  });
}

describe("isAdminRequest", () => {
  const originalAdminToken = process.env.ADMIN_TOKEN;

  afterEach(() => {
    process.env.ADMIN_TOKEN = originalAdminToken;
    vi.unstubAllEnvs();
  });

  it("acepta el token configurado aunque sea mas corto que la recomendacion", () => {
    process.env.ADMIN_TOKEN = "short-admin-token";

    expect(isAdminRequest(adminRequest("short-admin-token"))).toBe(true);
  });

  it("acepta el token configurado en produccion aunque sea mas corto que la recomendacion", () => {
    vi.stubEnv("NODE_ENV", "production");
    process.env.ADMIN_TOKEN = "short-admin-token";

    expect(isAdminRequest(adminRequest("short-admin-token"))).toBe(true);
  });

  it("rechaza tokens de ejemplo aunque coincidan con el encabezado", () => {
    process.env.ADMIN_TOKEN =
      "replace-with-a-random-token-of-at-least-32-characters";

    expect(
      isAdminRequest(
        adminRequest("replace-with-a-random-token-of-at-least-32-characters"),
      ),
    ).toBe(false);
  });
});
