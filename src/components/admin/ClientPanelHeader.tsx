type ClientPanelHeaderProps = {
  visibleCount: number;
  onExportClients: () => void;
};

export function ClientPanelHeader({
  visibleCount,
  onExportClients,
}: ClientPanelHeaderProps) {
  return (
    <div className="panel-header">
      <div>
        <span className="eyebrow">Clientes</span>
        <h2>Solicitudes recibidas</h2>
      </div>

      <div className="panel-actions">
        <span className="status-pill">{visibleCount} visibles</span>

        <button
          className="ghost-button compact-button"
          onClick={onExportClients}
          type="button"
        >
          Exportar CSV
        </button>
      </div>
    </div>
  );
}
