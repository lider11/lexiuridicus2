import type {
  ClientStatus,
  ClientUrgency,
  CommentStatus,
  PostStatus,
} from "@/types";

export const allowedClientStatuses: ClientStatus[] = [
  "nuevo",
  "contactado",
  "en_proceso",
  "cerrado",
];
export const allowedUrgencies: ClientUrgency[] = ["baja", "media", "alta"];
export const allowedPostStatuses: PostStatus[] = ["borrador", "publicado"];
export const allowedCommentStatuses: CommentStatus[] = [
  "pendiente",
  "aprobado",
  "rechazado",
];
export const allowedPostCategories = [
  "Tradicion de acciones",
  "Imagen empresarial",
  "Gobierno corporativo",
] as const;
