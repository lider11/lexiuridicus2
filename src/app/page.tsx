import Link from "next/link";
import { Header } from "@/components/Header";
import { LeadForm } from "@/components/LeadForm";

export default function Home() {
  return (
    <main className="site-shell">
      <Header />

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            Derecho corporativo para empresas con socios e inversionistas
          </div>

          <h1>
            Ordena la propiedad, las decisiones y la confianza juridica de tu
            empresa.
          </h1>

          <p>
            Diagnosticamos tradicion de acciones, imagen empresarial y gobierno
            corporativo para que socios, administradores e inversionistas tengan
            claridad antes de tomar decisiones importantes.
          </p>
          <div className="service-pills" aria-label="Servicios principales">
            <span>Acciones y socios</span>
            <span>Gobierno corporativo</span>
            <span>Preparacion para inversionistas</span>
          </div>
          <div className="trust-row" aria-label="Garantias de servicio">
            <span>Revision inicial orientativa</span>
            <span>Enfoque corporativo</span>
            <span>Confidencialidad</span>
          </div>

          <div className="hero-actions">
            <Link className="button" href="#consulta">
              Solicitar diagnostico empresarial
            </Link>

            <Link className="ghost-button" href="#servicios">
              Ver servicios corporativos
            </Link>
          </div>

          <p className="hero-microcopy">
            Respuesta inicial orientativa. Informacion tratada con
            confidencialidad.
          </p>

          <div className="specialty-card">
            <strong>Especialidad</strong>
            <span>
              Sociedades, accionistas, organos de decision y documentacion
              corporativa.
            </span>
          </div>
        </div>

        <aside
          className="intake-panel"
          id="consulta"
          aria-label="Formulario de consulta"
        >
          <span className="form-note">Tiempo estimado: 2 minutos</span>
          <h2>Diagnostico Empresarial</h2>
          <p>
            Te responderemos con una primera orientacion sobre el servicio mas
            adecuado para tu empresa.
          </p>

          <LeadForm />
        </aside>
      </section>

      <section className="section problem-section">
        <div className="section-heading">
          <span className="eyebrow">Problemas que resolvemos</span>

          <h2>
            Cuando la empresa crece, el desorden jurídico empieza a costar.
          </h2>

          <p>
            Lexiuridicus ayuda a convertir temas societarios dispersos en una
            estructura clara para socios, administradores e inversionistas.
          </p>
        </div>

        <div className="problem-grid">
          <div>
            <strong>Acciones sin trazabilidad suficiente</strong>
            <p>
              Riesgo de conflictos entre socios por titularidad, transferencias
              o documentación incompleta.
            </p>
          </div>

          <div>
            <strong>La empresa no se ve preparada ante inversionistas</strong>
            <p>
              La información corporativa no comunica orden, solidez ni
              preparación frente a terceros.
            </p>
          </div>

          <div>
            <strong>Las decisiones dependen de acuerdos informales</strong>
            <p>
              Roles, órganos y procesos internos poco definidos afectan
              confianza y continuidad.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="servicios">
        <div className="section-heading">
          <h2>Servicios para empresas que quieren crecer con orden</h2>

          <p>
            Elige el frente que hoy genera más incertidumbre en tu empresa. Cada
            servicio está pensado para ayudarte a reconocer el problema y dar el
            siguiente paso con claridad.
          </p>
        </div>

        <div className="feature-grid">
          <article className="feature service-card service-card-actions">
            <span className="feature-icon">01</span>
            <span className="status-pill">Propiedad</span>

            <h3>Tradición de acciones</h3>

            <span className="service-question">
              ¿Está claro quién posee qué en tu empresa?
            </span>

            <p>
              Para empresas con transferencias, acuerdos o registros accionarios
              que necesitan trazabilidad y soporte.
            </p>

            <div className="service-list">
              <strong>Qué revisamos</strong>
              <span>Documentos societarios</span>
              <span>Movimientos accionarios</span>
              <span>Inconsistencias de titularidad</span>
            </div>

            <strong>
              Resultado: claridad sobre propiedad y transferencias.
            </strong>

            <Link
              className="related-link"
              href="/servicios/tradicion-de-acciones"
            >
              Ver pagina del servicio
            </Link>

            <Link
              className="related-link"
              href="/blog/por-que-la-tradicion-de-acciones-importa-en-una-sociedad"
            >
              Leer guía sobre tradición de acciones
            </Link>

            <Link
              className="service-cta"
              href="/?servicio=Tradicion%20de%20acciones#consulta"
            >
              <span>Quiero revisar mis acciones</span>
              <strong aria-hidden="true">→</strong>
            </Link>
          </article>

          <article className="feature service-card service-card-image">
            <span className="feature-icon">02</span>
            <span className="status-pill">Confianza externa</span>

            <h3>Imagen empresarial</h3>

            <span className="service-question">
              ¿Tu empresa está lista para presentarse ante terceros?
            </span>

            <p>
              Para empresas que quieren proyectar orden ante inversionistas,
              aliados, compradores o entidades financieras.
            </p>

            <div className="service-list">
              <strong>Qué revisamos</strong>
              <span>Narrativa corporativa</span>
              <span>Documentos de soporte</span>
              <span>Riesgos visibles ante terceros</span>
            </div>

            <strong>
              Resultado: mejor preparación frente a inversionistas y aliados.
            </strong>

            <Link className="related-link" href="/servicios/imagen-empresarial">
              Ver pagina del servicio
            </Link>

            <Link
              className="related-link"
              href="/blog/como-preparar-la-empresa-para-inversionistas"
            >
              Leer guía para inversionistas
            </Link>

            <Link
              className="service-cta"
              href="/?servicio=Imagen%20empresarial#consulta"
            >
              <span>Mejorar imagen empresarial</span>
              <strong aria-hidden="true">→</strong>
            </Link>
          </article>

          <article className="feature service-card service-card-governance">
            <span className="feature-icon">03</span>
            <span className="status-pill">Decisiones internas</span>

            <h3>Gobierno corporativo</h3>

            <span className="service-question">
              ¿Las decisiones dependen de acuerdos informales?
            </span>

            <p>
              Para empresas que necesitan reglas, roles, órganos y procesos de
              decisión más claros.
            </p>

            <div className="service-list">
              <strong>Qué revisamos</strong>
              <span>Roles y responsabilidades</span>
              <span>Actas y decisiones</span>
              <span>Reglas de administración</span>
            </div>

            <strong>Resultado: decisiones más ordenadas y verificables.</strong>

            <Link
              className="related-link"
              href="/servicios/gobierno-corporativo"
            >
              Ver pagina del servicio
            </Link>

            <Link
              className="related-link"
              href="/blog/gobierno-corporativo-para-empresas-en-crecimiento"
            >
              Leer guía de gobierno corporativo
            </Link>

            <Link
              className="service-cta"
              href="/?servicio=Gobierno%20corporativo#consulta"
            >
              <span>Ordenar decisiones internas</span>
              <strong aria-hidden="true">→</strong>
            </Link>
          </article>
        </div>

        <div className="service-guide">
          <div>
            <span className="eyebrow">¿No sabes por dónde empezar?</span>
            <h3>Ubica primero el tipo de incertidumbre.</h3>
          </div>

          <p>
            Si el problema es propiedad, empieza por tradición de acciones. Si
            necesitas proyectar confianza ante terceros, empieza por imagen
            empresarial. Si las decisiones internas no tienen reglas claras,
            empieza por gobierno corporativo.
          </p>

          <Link className="button final-cta-button" href="/metodo">
            Ver metodo
          </Link>
        </div>
      </section>
    </main>
  );
}
