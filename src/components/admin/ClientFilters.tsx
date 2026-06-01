import { statusOptions } from "./admin.constants";
import type { ClientStatusFilter } from "./admin.types";

type ClientFiltersProps = {
  search: string;
  statusFilter: ClientStatusFilter;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: ClientStatusFilter) => void;
};

export function ClientFilters({
  search,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
}: ClientFiltersProps) {
  return (
    <div className="filters">
      <label>
        Buscar
        <input
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Nombre, empresa, correo, telefono o caso"
          value={search}
        />
      </label>

      <label>
        Estado
        <select
          onChange={(event) =>
            onStatusFilterChange(event.target.value as ClientStatusFilter)
          }
          value={statusFilter}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
