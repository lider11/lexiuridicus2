import { z } from "zod";

export const LeadSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .max(120, "El nombre es demasiado largo."),

  company: z
    .string()
    .trim()
    .min(2, "La empresa es obligatoria.")
    .max(160, "El nombre de la empresa es demasiado largo."),

  role: z
    .string()
    .trim()
    .min(2, "El cargo es obligatorio.")
    .max(120, "El cargo es demasiado largo."),

  email: z
    .string()
    .trim()
    .email("El correo no tiene un formato válido.")
    .max(160, "El correo es demasiado largo."),

  phone: z
    .string()
    .trim()
    .min(7, "El teléfono debe tener al menos 7 caracteres.")
    .max(40, "El teléfono es demasiado largo."),

  legal_need: z.enum([
    "Gobierno corporativo",
    "Tradicion de acciones",
    "Imagen empresarial",
  ]),

  business_goal: z
    .string()
    .trim()
    .min(3, "El objetivo empresarial es obligatorio.")
    .max(180, "El objetivo empresarial es demasiado largo."),

  shareholder_context: z
    .string()
    .trim()
    .max(160, "El contexto societario es demasiado largo.")
    .optional()
    .or(z.literal("")),

  urgency: z.enum(["baja", "media", "alta"]).default("media"),

  notes: z
    .string()
    .trim()
    .max(1500, "Los detalles no pueden superar 1500 caracteres.")
    .optional()
    .or(z.literal("")),

  privacy_accepted: z.literal(true, {
    message: "Debes aceptar el tratamiento de la información.",
  }),
});

export type LeadInput = z.infer<typeof LeadSchema>;

export const UpdateClientSchema = z.object({
  id: z.coerce.number().int().positive("Cliente inválido."),

  status: z.enum(["nuevo", "contactado", "en_revision", "cerrado"]).optional(),

  internal_notes: z
    .string()
    .trim()
    .max(2000, "Las notas internas no pueden superar 2000 caracteres.")
    .optional(),
});

export type UpdateClientInput = z.infer<typeof UpdateClientSchema>;
