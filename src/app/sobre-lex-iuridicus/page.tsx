import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre Lex Iuridicus",
  description:
    "Conoce el enfoque profesional de Lex Iuridicus: asesoria juridica empresarial, prevencion de riesgos, derecho corporativo y acompanamiento estrategico.",
  alternates: {
    canonical: "/sobre-lex-iuridicus",
  },
  openGraph: {
    title: "Sobre Lex Iuridicus",
    description:
      "Firma juridica corporativa orientada a empresas, socios y administradores que necesitan claridad legal y estrategia.",
    url: "/sobre-lex-iuridicus",
    type: "website",
  },
};

const values = [
  "Claridad",
  "Confidencialidad",
  "Rigor juridico",
  "Vision empresarial",
  "Prevencion",
  "Responsabilidad profesional",
];

export default function AboutPage() {
  return (
    <main className="site-shell">
      <Header />

      <section className="method-hero">
        <div className="method-hero-copy">
          <span className="eyebrow">Sobre Lex Iuridicus</span>
          <h1>Asesoria juridica empresarial con criterio estrategico.</h1>
          <p>
            Lex Iuridicus acompana a empresas, socios y administradores en la
            prevencion de riesgos, organizacion corporativa y toma de decisiones
            juridicas relevantes.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/#consulta">
              Solicitar diagnostico juridico
            </Link>
            <a className="ghost-button" href={siteConfig.whatsappHref}>
              Hablar por WhatsApp
            </a>
          </div>
        </div>

        <aside className="method-summary">
          <span className="status-pill">Propuesta diferencial</span>
          <h2>Derecho claro para decisiones empresariales complejas.</h2>
          <p>
            El trabajo combina analisis juridico, lectura corporativa y
            documentacion practica para que la empresa actue con mayor control.
          </p>
        </aside>
      </section>

      <section className="section split-section">
        <div>
          <span className="eyebrow">Mision y vision</span>
          <h2>Una firma orientada a proteger empresas en crecimiento.</h2>
          <p>
            Nuestra mision es brindar asesoria juridica empresarial clara,
            preventiva y util para proteger decisiones, contratos, relaciones
            societarias y patrimonio corporativo.
          </p>
          <p>
            Nuestra vision es consolidar una plataforma juridica de referencia
            para empresarios que buscan rigor legal, tecnologia y pensamiento
            estrategico en Colombia.
          </p>
        </div>

        <div className="process-list">
          <div>
            <strong>Enfoque profesional</strong>
            <p>
              Priorizamos diagnosticos claros, rutas de accion y documentos
              alineados con la realidad operativa de cada empresa.
            </p>
          </div>
          <div>
            <strong>Perfil de firma</strong>
            <p>
              Practica juridica corporativa enfocada en derecho societario,
              contratos comerciales, gobierno corporativo, cartera, compliance y
              empresa familiar.
            </p>
          </div>
        </div>
      </section>

      <section className="section trust-section">
        <div className="section-heading">
          <span className="eyebrow">Valores</span>
          <h2>Principios que guian el acompanamiento juridico</h2>
        </div>
        <div className="authority-grid">
          {values.map((value) => (
            <article key={value}>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section final-cta">
        <div>
          <span className="eyebrow">Agenda una consulta</span>
          <h2>Hablemos del riesgo juridico que necesita ordenar tu empresa.</h2>
          <p>
            Una conversacion inicial permite ubicar prioridades antes de
            comprometer recursos en acciones dispersas.
          </p>
        </div>
        <Link className="button final-cta-button" href="/#consulta">
          Solicitar valoracion inicial
        </Link>
      </section>
    </main>
  );
}
