import { afterEach, describe, expect, it } from "vitest";
import { isAdminRequest } from "@/lib/auth";

const originalAdminToken = process.env.ADMIN_TOKEN;

function adminRequest(token?: string) {
  const headers = new Headers();

  if (token !== undefined) {
    headers.set("x-admin-token", token);
  }

  return new Request("https://lexiuridicus.test/api/clients", { headers });
}

afterEach(() => {
  process.env.ADMIN_TOKEN = originalAdminToken;
});

describe("isAdminRequest", () => {
  it("accepts a matching admin token after trimming copied whitespace", () => {
    process.env.ADMIN_TOKEN = "  admin-token-for-tests  ";

    expect(isAdminRequest(adminRequest(" admin-token-for-tests "))).toBe(true);
  });

  it("rejects missing or mismatched admin tokens", () => {
    process.env.ADMIN_TOKEN = "admin-token-for-tests";

    expect(isAdminRequest(adminRequest())).toBe(false);
    expect(isAdminRequest(adminRequest("wrong-token"))).toBe(false);
  });

  it("rejects unsafe placeholder admin token configuration", () => {
    process.env.ADMIN_TOKEN = "replace-with-a-random-token-of-at-least-32-characters";

    expect(
      isAdminRequest(
        adminRequest("replace-with-a-random-token-of-at-least-32-characters"),
      ),
    ).toBe(false);
  });
});
