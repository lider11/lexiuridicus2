import type { AdminTab } from "./admin.types";

type AdminTabsProps = {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onLogout: () => void;
};

export function AdminTabs({
  activeTab,
  onTabChange,
  onLogout,
}: AdminTabsProps) {
  return (
    <div
      className="tabbar"
      role="tablist"
      aria-label="Secciones de administracion"
    >
      <button
        aria-selected={activeTab === "clientes"}
        className="tab-button"
        onClick={() => onTabChange("clientes")}
        role="tab"
        type="button"
      >
        Clientes
      </button>

      <button
        aria-selected={activeTab === "blog"}
        className="tab-button"
        onClick={() => onTabChange("blog")}
        role="tab"
        type="button"
      >
        Blog
      </button>

      <button
        aria-selected={activeTab === "comentarios"}
        className="tab-button"
        onClick={() => onTabChange("comentarios")}
        role="tab"
        type="button"
      >
        Comentarios
      </button>

      <button className="tab-button" onClick={onLogout} type="button">
        Salir
      </button>
    </div>
  );
}
