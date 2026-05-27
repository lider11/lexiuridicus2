import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Metodo Lexiuridicus | Diagnostico corporativo",
  description:
    "Conoce el metodo de diagnostico de Lexiuridicus para ordenar acciones, imagen empresarial y gobierno corporativo.",
  alternates: {
    canonical: "/metodo",
  },
  openGraph: {
    title: "Metodo Lexiuridicus | Diagnostico corporativo",
    description:
      "Un proceso claro para identificar riesgos societarios, priorizar decisiones y preparar la empresa para crecer.",
    url: "/metodo",
    type: "website",
  },
};

const methodSteps = [
  {
    number: "01",
    title: "Entendemos la situacion",
    text: "Revisamos el contexto de la empresa, sus socios, decisiones recientes y el objetivo que motiva la consulta.",
  },
  {
    number: "02",
    title: "Ubicamos el frente critico",
    text: "Determinamos si la prioridad esta en tradicion de acciones, imagen empresarial, gobierno corporativo o una combinacion de estos frentes.",
  },
  {
    number: "03",
    title: "Revisamos soportes clave",
    text: "Analizamos la informacion corporativa disponible para detectar vacios, inconsistencias o riesgos visibles ante socios e inversionistas.",
  },
  {
    number: "04",
    title: "Definimos una ruta de accion",
    text: "Entregamos una orientacion inicial para saber que ordenar primero y que decisiones conviene documentar con prioridad.",
  },
];

const reviewAreas = [
  "Titularidad y movimientos accionarios",
  "Documentos societarios y actas relevantes",
  "Roles de socios, administradores y organos de decision",
  "Narrativa e imagen corporativa ante terceros",
  "Riesgos visibles para inversionistas, aliados o compradores",
  "Prioridades juridicas para avanzar con mayor claridad",
];

export default function MetodoPage() {
  return (
    <main className="site-shell">
      <Header />

      <section className="method-hero">
        <div className="method-hero-copy">
          <span className="eyebrow">Metodo Lexiuridicus</span>
          <h1>Un diagnostico claro antes de tomar decisiones corporativas.</h1>
          <p>
            Nuestro metodo ayuda a identificar que debe ordenarse primero en la
            empresa: propiedad accionaria, imagen ante terceros o reglas de
            gobierno corporativo.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/#consulta">
              Solicitar diagnostico empresarial
            </Link>
            <Link className="ghost-button" href="/#servicios">
              Ver servicios
            </Link>
          </div>
        </div>

        <aside className="method-summary">
          <span className="status-pill">Proceso guiado</span>
          <h2>De la incertidumbre a una ruta de accion.</h2>
          <p>
            Primero entendemos el problema, luego revisamos los soportes y
            finalmente priorizamos el camino juridico mas conveniente.
          </p>
        </aside>
      </section>

      <section className="section method-section">
        <div className="section-heading">
          <span className="eyebrow">Paso a paso</span>
          <h2>Como trabajamos el diagnostico</h2>
          <p>
            Cada etapa esta pensada para que la empresa avance sin perderse en
            tecnicismos y pueda tomar decisiones con mejor informacion.
          </p>
        </div>

        <div className="method-steps">
          {methodSteps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section method-review">
        <div>
          <span className="eyebrow">Que revisamos</span>
          <h2>El metodo conecta lo juridico con la realidad de la empresa.</h2>
          <p>
            No partimos de formatos genericos. Partimos de la situacion actual:
            socios, documentos, decisiones, crecimiento esperado y nivel de
            exposicion ante terceros.
          </p>
        </div>

        <div className="review-list">
          {reviewAreas.map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </section>

      <section className="section method-outcome">
        <div className="section-heading">
          <span className="eyebrow">Resultado esperado</span>
          <h2>Una empresa con mayor claridad para decidir y presentarse.</h2>
          <p>
            Al finalizar el diagnostico inicial sabras que frente atender, que
            informacion ordenar y que riesgos conviene tratar antes de crecer,
            negociar o recibir inversion.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat">
            <strong>Menos incertidumbre</strong>
            <p>Identificacion de vacios societarios y puntos sensibles.</p>
          </div>
          <div className="stat">
            <strong>Mayor confianza</strong>
            <p>Mejor preparacion para socios, aliados e inversionistas.</p>
          </div>
          <div className="stat">
            <strong>Ruta priorizada</strong>
            <p>Claridad sobre que ordenar primero y por que hacerlo.</p>
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div>
          <span className="eyebrow">Empezar con orden</span>
          <h2>Si la empresa tiene decisiones pendientes, primero diagnostica.</h2>
          <p>
            Te ayudamos a ubicar el frente juridico que requiere atencion antes
            de avanzar.
          </p>
        </div>
        <Link className="button final-cta-button" href="/#consulta">
          Solicitar diagnostico
        </Link>
      </section>
    </main>
  );
}
