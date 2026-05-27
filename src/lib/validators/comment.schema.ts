import { z } from "zod";
import { allowedCommentStatuses } from "@/lib/constants";

const commentStatusSchema = z
  .string()
  .trim()
  .refine(
    (value) =>
      allowedCommentStatuses.includes(
        value as (typeof allowedCommentStatuses)[number],
      ),
    "Estado de comentario invalido.",
  );

export const UpdateCommentStatusSchema = z.object({
  id: z.coerce.number().int().positive("Comentario invalido."),
  status: commentStatusSchema,
});

export type UpdateCommentStatusInput = z.infer<
  typeof UpdateCommentStatusSchema
>;

export const DeleteCommentSchema = z.object({
  id: z.coerce.number().int().positive("Comentario invalido."),
});

export type DeleteCommentInput = z.infer<typeof DeleteCommentSchema>;
