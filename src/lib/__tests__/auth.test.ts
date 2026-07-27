import { beforeEach, describe, expect, it, vi } from "vitest";

const { queryMock } = vi.hoisted(() => ({ queryMock: vi.fn() }));
vi.mock("@/lib/db", () => ({ query: queryMock }));

import {
  authenticateRequest,
  hashSessionToken,
  requirePermission,
} from "@/lib/auth";

function request(token?: string) {
  return new Request("https://lexiuridicus.site/api/clients", {
    headers: token ? { authorization: `Bearer ${token}` } : {},
  });
}

describe("autenticación y autorización", () => {
  beforeEach(() => queryMock.mockReset());

  it("rechaza solicitudes sin sesión", async () => {
    await expect(authenticateRequest(request())).resolves.toBeNull();
    expect(queryMock).not.toHaveBeenCalled();
  });

  it("rechaza tokens demasiado cortos antes de consultar la base", async () => {
    await expect(authenticateRequest(request("short"))).resolves.toBeNull();
    expect(queryMock).not.toHaveBeenCalled();
  });

  it("resuelve usuario, organización, roles y permisos de una sesión activa", async () => {
    queryMock.mockResolvedValue([
      {
        session_id: 8,
        user_id: 4,
        organization_id: 2,
        email: "admin@example.com",
        roles: "administrator",
        permissions: "clients:read,clients:write",
      },
    ]);

    const context = await authenticateRequest(request("a".repeat(48)));
    expect(context).toMatchObject({
      userId: 4,
      organizationId: 2,
      roles: ["administrator"],
    });
  });

  it("aplica deny-by-default cuando falta el permiso", async () => {
    queryMock.mockResolvedValue([
      {
        session_id: 8,
        user_id: 4,
        organization_id: 2,
        email: "reader@example.com",
        roles: "reader",
        permissions: "clients:read",
      },
    ]);

    await expect(
      requirePermission(request("b".repeat(48)), "clients:write"),
    ).resolves.toBeNull();
  });

  it("no almacena el token de sesión en texto plano", () => {
    const token = "c".repeat(48);
    expect(hashSessionToken(token)).not.toContain(token);
    expect(hashSessionToken(token)).toHaveLength(64);
  });
});
