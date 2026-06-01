import type { Client, ClientStatus } from "@/types";

type ClientListProps = {
  clients: Client[];
  draftNotes: Record<number, string>;
  onClientStatusChange: (id: number, status: ClientStatus) => void;
  onDraftNoteChange: (id: number, value: string) => void;
  onSaveInternalNotes: (id: number) => void;
  onDeleteClient: (id: number, name: string) => void;
};

export function ClientList({
  clients,
  draftNotes,
  onClientStatusChange,
  onDraftNoteChange,
  onSaveInternalNotes,
  onDeleteClient,
}: ClientListProps) {
  return (
    <div className="stack">
      {clients.length ? (
        clients.map((client) => (
          <article className="client-row" key={client.id}>
            <div className="client-heading">
              <div>
                <strong>{client.full_name}</strong>
                <span className="meta">
                  {client.company} | {client.role}
                </span>
                <span className="meta">
                  {client.email} | {client.phone}
                </span>
              </div>

              <select
                aria-label={`Estado de ${client.full_name}`}
                onChange={(event) =>
                  onClientStatusChange(
                    client.id,
                    event.target.value as ClientStatus,
                  )
                }
                value={client.status}
              >
                <option value="nuevo">Nuevo</option>
                <option value="contactado">Contactado</option>
                <option value="en_proceso">En proceso</option>
                <option value="cerrado">Cerrado</option>
              </select>
            </div>

            <div className="client-tags">
              <span className="status-pill">{client.legal_need}</span>
              <span className="status-pill">{client.business_goal}</span>

              {client.shareholder_context ? (
                <span className="status-pill">
                  {client.shareholder_context}
                </span>
              ) : null}

              <span className="status-pill">Prioridad: {client.urgency}</span>
            </div>

            {client.notes ? <p>{client.notes}</p> : null}

            <label>
              Notas internas
              <textarea
                onChange={(event) =>
                  onDraftNoteChange(client.id, event.target.value)
                }
                placeholder="Seguimiento interno del caso"
                value={draftNotes[client.id] || ""}
              />
            </label>

            <div className="panel-actions">
              <button
                className="ghost-button compact-button"
                onClick={() => onSaveInternalNotes(client.id)}
                type="button"
              >
                Guardar notas
              </button>

              <button
                className="danger-button compact-button"
                onClick={() => onDeleteClient(client.id, client.full_name)}
                type="button"
              >
                Eliminar
              </button>
            </div>

            <span className="meta">
              Recibido: {new Date(client.created_at).toLocaleString("es-CO")}
            </span>
          </article>
        ))
      ) : (
        <p>No hay solicitudes para los filtros seleccionados.</p>
      )}
    </div>
  );
}
