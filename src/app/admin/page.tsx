import { Header } from "@/components/Header";
import { AdminDashboard } from "@/components/AdminDashboard";

export default function AdminPage() {
  return (
    <main className="site-shell">
      <Header />
      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">Administracion</span>
          <h1>Panel Lexiuridicus</h1>
          <p>
            Gestiona solicitudes, estados, notas internas, exportaciones y
            contenido juridico desde un mismo lugar.
          </p>
        </div>
      </section>
      <AdminDashboard />
    </main>
  );
}
