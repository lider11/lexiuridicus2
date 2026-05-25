import { describe, expect, it } from "vitest";
import { LeadSchema } from "@/lib/validators/client.schema";

describe("LeadSchema", () => {
  it("valida correctamente datos válidos", () => {
    const result = LeadSchema.safeParse({
      full_name: "Daniel Vergel",
      company: "Lexiuridicus",
      role: "Abogado",
      email: "devergel1980@gmail.com",
      phone: "3001234567",
      legal_need: "Gobierno corporativo",
      business_goal: "Fortalecer estructura societaria",
      shareholder_context: "",
      urgency: "alta",
      notes: "Cliente corporativo",
      privacy_accepted: true,
    });

    expect(result.success).toBe(true);
  });

  it("rechaza correos inválidos", () => {
    const result = LeadSchema.safeParse({
      full_name: "Daniel Vergel",
      company: "Lexiuridicus",
      role: "Abogado",
      email: "correo-invalido",
      phone: "3001234567",
      legal_need: "Gobierno corporativo",
      business_goal: "Fortalecer estructura societaria",
      shareholder_context: "",
      urgency: "alta",
      notes: "Cliente corporativo",
      privacy_accepted: true,
    });

    expect(result.success).toBe(false);
  });

  it("rechaza formularios sin autorización de privacidad", () => {
    const result = LeadSchema.safeParse({
      full_name: "Daniel Vergel",
      company: "Lexiuridicus",
      role: "Abogado",
      email: "devergel1980@gmail.com",
      phone: "3001234567",
      legal_need: "Gobierno corporativo",
      business_goal: "Fortalecer estructura societaria",
      shareholder_context: "",
      urgency: "alta",
      notes: "Cliente corporativo",
      privacy_accepted: false,
    });

    expect(result.success).toBe(false);
  });
});
