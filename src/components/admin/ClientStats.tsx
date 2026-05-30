import type { ClientStatusFilter } from "./admin.types";

type ClientStatsProps = {
  total: number;
  nuevos: number;
  contactados: number;
  enProceso: number;
  cerrados: number;
  altaPrioridad: number;
  onStatusFilterChange: (status: ClientStatusFilter) => void;
};

export function ClientStats({
  total,
  nuevos,
  contactados,
  enProceso,
  cerrados,
  altaPrioridad,
  onStatusFilterChange,
}: ClientStatsProps) {
  return (
    <div className="admin-stats" aria-label="Resumen de solicitudes">
      <button onClick={() => onStatusFilterChange("todos")} type="button">
        <span>Total</span>
        <strong>{total}</strong>
      </button>

      <button onClick={() => onStatusFilterChange("nuevo")} type="button">
        <span>Nuevos</span>
        <strong>{nuevos}</strong>
      </button>

      <button onClick={() => onStatusFilterChange("contactado")} type="button">
        <span>Contactados</span>
        <strong>{contactados}</strong>
      </button>

      <button onClick={() => onStatusFilterChange("en_proceso")} type="button">
        <span>En proceso</span>
        <strong>{enProceso}</strong>
      </button>

      <button onClick={() => onStatusFilterChange("cerrado")} type="button">
        <span>Cerrados</span>
        <strong>{cerrados}</strong>
      </button>

      <div className="priority-stat">
        <span>Alta prioridad</span>
        <strong>{altaPrioridad}</strong>
      </div>
    </div>
  );
}
