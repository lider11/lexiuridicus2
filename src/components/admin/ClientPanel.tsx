import { ClientFilters } from "./ClientFilters";
import { ClientList } from "./ClientList";
import { ClientPanelHeader } from "./ClientPanelHeader";
import { ClientStats } from "./ClientStats";
import type { Client, ClientStatus } from "@/types";
import type { ClientStatusFilter } from "./admin.types";

type ClientStatsModel = {
  total: number;
  nuevos: number;
  contactados: number;
  enProceso: number;
  cerrados: number;
  altaPrioridad: number;
};

type ClientPanelProps = {
  clients: Client[];
  clientStats: ClientStatsModel;
  draftNotes: Record<number, string>;
  search: string;
  statusFilter: ClientStatusFilter;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: ClientStatusFilter) => void;
  onExportClients: () => void;
  onClientStatusChange: (id: number, status: ClientStatus) => void;
  onDraftNoteChange: (id: number, value: string) => void;
  onSaveInternalNotes: (id: number) => void;
  onDeleteClient: (id: number, name: string) => void;
};

export function ClientPanel({
  clients,
  clientStats,
  draftNotes,
  search,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onExportClients,
  onClientStatusChange,
  onDraftNoteChange,
  onSaveInternalNotes,
  onDeleteClient,
}: ClientPanelProps) {
  return (
    <section className="admin-panel stack">
      <ClientStats
        total={clientStats.total}
        nuevos={clientStats.nuevos}
        contactados={clientStats.contactados}
        enProceso={clientStats.enProceso}
        cerrados={clientStats.cerrados}
        altaPrioridad={clientStats.altaPrioridad}
        onStatusFilterChange={onStatusFilterChange}
      />

      <ClientPanelHeader
        visibleCount={clients.length}
        onExportClients={onExportClients}
      />

      <ClientFilters
        search={search}
        statusFilter={statusFilter}
        onSearchChange={onSearchChange}
        onStatusFilterChange={onStatusFilterChange}
      />

      <ClientList
        clients={clients}
        draftNotes={draftNotes}
        onClientStatusChange={onClientStatusChange}
        onDraftNoteChange={onDraftNoteChange}
        onSaveInternalNotes={onSaveInternalNotes}
        onDeleteClient={onDeleteClient}
      />
    </section>
  );
}
