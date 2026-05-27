import type { ClientStatusFilter } from "./admin.types";

export const statusOptions: { label: string; value: ClientStatusFilter }[] = [
  { label: "Todos", value: "todos" },
  { label: "Nuevo", value: "nuevo" },
  { label: "Contactado", value: "contactado" },
  { label: "En proceso", value: "en_proceso" },
  { label: "Cerrado", value: "cerrado" },
];
