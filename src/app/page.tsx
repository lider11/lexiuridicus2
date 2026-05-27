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
            Para empresas que crecieron mas rapido que sus documentos
          </div>
          <h1>
            Si tu empresa crecio, pero sus papeles no, es momento de ordenar su
            estructura juridica.
          </h1>
          <p>
            Revisamos la situacion de socios, acciones, actas, decisiones
            internas y gobierno corporativo para reducir riesgos y preparar la
            empresa para crecer con seguridad.
          </p>
          <div className="service-pills" aria-label="Problemas frecuentes">
            <span>Socios sin reglas claras</span>
            <span>Acciones sin trazabilidad</span>
            <span>Decisiones informales</span>
          </div>
          <div className="trust-row" aria-label="Beneficios">
            <span>Claridad societaria</span>
            <span>Menos conflictos</span>
            <span>Mayor confianza</span>
          </div>
          <div className="hero-actions">
            <Link className="button" href="#consulta">
              Revisar mi empresa
            </Link>
            <Link className="ghost-button" href="#servicios">
              Que podemos ordenar
            </Link>
          </div>
          <p className="hero-microcopy">
            Ideal para empresas con socios, accionistas o decisiones internas
            pendientes de formalizar.
          </p>
          <div className="specialty-card">
            <strong>Diagnostico</strong>
            <span>
              Detectamos riesgos juridicos antes de que se conviertan en
              conflictos.
            </span>
          </div>
        </div>
        <aside
          className="intake-panel"
          id="consulta"
          aria-label="Formulario de consulta"
        >
          <span className="form-note">Diagnostico inicial</span>
          <h2>Cuentanos que esta desordenado</h2>
          <p>
            Identificaremos si el problema esta en acciones, gobierno
            corporativo o imagen empresarial.
          </p>
          <LeadForm />
        </aside>
      </section>

      <section className="section problem-section">
        <div className="section-heading">
          <span className="eyebrow">Problemas que resolvemos</span>
          <h2>
            Cuando la empresa crece, el desorden juridico empieza a costar.
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
              o documentacion incompleta.
            </p>
          </div>
          <div>
            <strong>La empresa no se ve preparada ante inversionistas</strong>
            <p>
              La informacion corporativa no comunica orden, solidez ni
              preparacion frente a terceros.
            </p>
          </div>
          <div>
            <strong>Las decisiones dependen de acuerdos informales</strong>
            <p>
              Roles, organos y procesos internos poco definidos afectan
              confianza y continuidad.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="servicios">
        <div className="section-heading">
          <h2>Servicios para empresas que quieren crecer con orden</h2>
          <p>
            Elige el frente que hoy genera mas incertidumbre en tu empresa. Cada
            servicio esta pensado para ayudarte a reconocer el problema y dar el
            siguiente paso con claridad.
          </p>
        </div>
        <div className="feature-grid">
          <article className="feature service-card service-card-actions">
            <span className="feature-icon">01</span>
            <span className="status-pill">Propiedad</span>
            <h3>Tradicion de acciones</h3>
            <span className="service-question">
              Esta claro quien posee que en tu empresa?
            </span>
            <p>
              Para empresas con transferencias, acuerdos o registros accionarios
              que necesitan trazabilidad y soporte.
            </p>
            <div className="service-list">
              <strong>Que revisamos</strong>
              <span>Documentos societarios</span>
              <span>Movimientos accionarios</span>
              <span>Inconsistencias de titularidad</span>
            </div>
            <strong>
              Resultado: claridad sobre propiedad y transferencias.
            </strong>
            <Link
              className="related-link"
              href="/blog/por-que-la-tradicion-de-acciones-importa-en-una-sociedad"
            >
              Leer guia sobre tradicion de acciones
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
              Tu empresa esta lista para presentarse ante terceros?
            </span>
            <p>
              Para empresas que quieren proyectar orden ante inversionistas,
              aliados, compradores o entidades financieras.
            </p>
            <div className="service-list">
              <strong>Que revisamos</strong>
              <span>Narrativa corporativa</span>
              <span>Documentos de soporte</span>
              <span>Riesgos visibles ante terceros</span>
            </div>
            <strong>
              Resultado: mejor preparacion frente a inversionistas y aliados.
            </strong>
            <Link
              className="related-link"
              href="/blog/como-preparar-la-empresa-para-inversionistas"
            >
              Leer guia para inversionistas
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
              Las decisiones dependen de acuerdos informales?
            </span>
            <p>
              Para empresas que necesitan reglas, roles, organos y procesos de
              decision mas claros.
            </p>
            <div className="service-list">
              <strong>Que revisamos</strong>
              <span>Roles y responsabilidades</span>
              <span>Actas y decisiones</span>
              <span>Reglas de administracion</span>
            </div>
            <strong>Resultado: decisiones mas ordenadas y verificables.</strong>
            <Link
              className="related-link"
              href="/blog/gobierno-corporativo-para-empresas-en-crecimiento"
            >
              Leer guia de gobierno corporativo
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
            <span className="eyebrow">No sabes por donde empezar?</span>
            <h3>Ubica primero el tipo de incertidumbre.</h3>
          </div>
          <p>
            Si el problema es propiedad, empieza por tradicion de acciones. Si
            necesitas proyectar confianza ante terceros, empieza por imagen
            empresarial. Si las decisiones internas no tienen reglas claras,
            empieza por gobierno corporativo.
          </p>
        </div>
      </section>
    </main>
  );
}
