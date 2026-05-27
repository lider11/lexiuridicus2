import { z } from "zod";
import { allowedPostCategories } from "@/lib/constants";
import { slugify } from "@/lib/validators";

const postCategorySchema = z
  .string()
  .trim()
  .refine(
    (value) =>
      allowedPostCategories.includes(
        value as (typeof allowedPostCategories)[number],
      ),
    "Categoria invalida.",
  )
  .default("Gobierno corporativo");

const postStatusSchema = z.enum(["borrador", "publicado"]);

export const CreatePostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "El titulo es obligatorio.")
    .max(180, "El titulo es demasiado largo."),

  slug: z
    .string()
    .trim()
    .max(220, "El slug es demasiado largo.")
    .optional()
    .or(z.literal("")),

  category: postCategorySchema,

  excerpt: z
    .string()
    .trim()
    .min(10, "El resumen es obligatorio.")
    .max(500, "El resumen es demasiado largo."),

  content: z
    .string()
    .trim()
    .min(30, "El contenido es obligatorio."),

  author: z
    .string()
    .trim()
    .min(2, "El autor es obligatorio.")
    .max(120, "El autor es demasiado largo.")
    .default("Lexiuridicus"),

  status: postStatusSchema.default("borrador"),
}).transform((post) => ({
  ...post,
  slug: slugify(post.slug || post.title),
}));

export type CreatePostInput = z.infer<typeof CreatePostSchema>;

export const UpdatePostStatusSchema = z.object({
  id: z.coerce.number().int().positive("Articulo invalido."),
  status: postStatusSchema,
});

export type UpdatePostStatusInput = z.infer<typeof UpdatePostStatusSchema>;

export const DeletePostSchema = z.object({
  id: z.coerce.number().int().positive("Articulo invalido."),
});

export type DeletePostInput = z.infer<typeof DeletePostSchema>;
