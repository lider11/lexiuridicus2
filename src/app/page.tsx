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
            Especialistas en empresas, socios e inversionistas
          </div>
          <h1>
            Ordenamos la estructura juridica de tu empresa para crecer con
            confianza.
          </h1>
          <p>
            Diagnostico y asesoria en tradicion de acciones, imagen empresarial
            y gobierno corporativo para empresas que buscan claridad ante
            socios, administradores e inversionistas.
          </p>
          <div className="service-pills" aria-label="Servicios principales">
            <span>Tradicion de acciones</span>
            <span>Imagen empresarial</span>
            <span>Gobierno corporativo</span>
          </div>
          <div className="trust-row" aria-label="Garantias de servicio">
            <span>Diagnostico inicial</span>
            <span>Enfoque corporativo</span>
            <span>Confidencialidad empresarial</span>
          </div>
          <div className="hero-actions">
            <Link className="button" href="#consulta">
              Solicitar diagnostico empresarial
            </Link>
            <Link className="ghost-button" href="#servicios">
              Ver servicios
            </Link>
          </div>
          <p className="hero-microcopy">
            Respuesta inicial segun prioridad y servicio requerido.
          </p>
          <div className="specialty-card">
            <strong>Especialidad</strong>
            <span>Sociedades, accionistas y gobierno corporativo.</span>
          </div>
        </div>
        <aside
          className="intake-panel"
          id="consulta"
          aria-label="Formulario de consulta"
        >
          <span className="form-note">Tiempo estimado: 2 minutos</span>
          <h2>Diagnostico empresarial</h2>
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
          <Link className="button" href="#consulta">
            Solicitar diagnostico empresarial
          </Link>
        </div>
      </section>

      <section className="section audience-section" id="para-quien">
        <div>
          <span className="eyebrow">Para quien es</span>
          <h2>
            Empresas que necesitan verse tan ordenadas como quieren crecer.
          </h2>
          <p>
            No somos una firma generalista; trabajamos con empresarios que
            necesitan ordenar su estructura corporativa.
          </p>
        </div>
        <div className="audience-list">
          <span>Empresas familiares</span>
          <span>Sociedades en crecimiento</span>
          <span>Fundadores con socios</span>
          <span>Empresas buscando inversion</span>
        </div>
      </section>

      <section className="section split-section" id="proceso">
        <div>
          <span className="eyebrow">Como funciona</span>
          <h2>Tres pasos para ordenar la ruta juridica</h2>
          <p>
            El acompanamiento se enfoca en entender la empresa, priorizar
            riesgos y convertir el orden legal en ventaja.
          </p>
        </div>
        <div className="process-list">
          <div>
            <strong>1. Envia tu consulta</strong>
            <p>
              Indicanos el servicio corporativo, la empresa, tu cargo y el
              objetivo principal.
            </p>
          </div>
          <div>
            <strong>2. Diagnosticamos prioridades</strong>
            <p>
              Identificamos si la prioridad esta en acciones, imagen empresarial
              o gobierno corporativo.
            </p>
          </div>
          <div>
            <strong>3. Definimos ruta de accion</strong>
            <p>
              Recibes una ruta inicial con prioridades juridicas y corporativas
              para avanzar con mayor claridad.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="stats-grid">
          <div className="stat">
            <strong>Orden interno</strong>
            <p>
              Claridad sobre propiedad, decisiones, roles y procesos sensibles.
            </p>
          </div>
          <div className="stat">
            <strong>Ventaja competitiva</strong>
            <p>
              Mayor confianza para negociar, presentarse y tomar decisiones.
            </p>
          </div>
          <div className="stat">
            <strong>Atraccion de inversion</strong>
            <p>
              Una estructura juridica clara facilita conversaciones con
              inversionistas.
            </p>
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="section-heading">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Antes de consultar</h2>
        </div>
        <div className="faq-grid">
          <details>
            <summary>Que recibo despues del diagnostico?</summary>
            <p>
              Una primera orientacion sobre el servicio adecuado y las
              prioridades juridicas que conviene revisar.
            </p>
          </details>
          <details>
            <summary>Puedo consultar si aun no busco inversionistas?</summary>
            <p>
              Si. Ordenar acciones, imagen y gobierno corporativo tambien ayuda
              a prevenir conflictos internos.
            </p>
          </details>
          <details>
            <summary>Este servicio aplica para empresas familiares?</summary>
            <p>
              Si. Especialmente cuando propiedad, administracion y decisiones
              familiares se mezclan en la empresa.
            </p>
          </details>
        </div>
      </section>

      <section className="section final-cta">
        <div>
          <span className="eyebrow">Siguiente paso</span>
          <h2>
            Ordena la estructura juridica antes de que el crecimiento la ponga a
            prueba.
          </h2>
          <p>
            Solicita un diagnostico empresarial y recibe una primera orientacion
            sobre el frente que conviene priorizar.
          </p>
        </div>
        <Link className="button final-cta-button" href="#consulta">
          Solicitar diagnostico
        </Link>
      </section>
    </main>
  );
}
