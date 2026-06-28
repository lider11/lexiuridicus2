import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { LeadForm } from "@/components/LeadForm";
import { servicePages } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Inteligencia Juridica para Empresas que Crecen",
  description:
    "Lex Iuridicus brinda asesoria juridica corporativa, societaria y estrategica para proteger empresas, prevenir riesgos y acompanar decisiones empresariales de alto impacto.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Inteligencia Juridica para Empresas que Crecen",
    description:
      "Asesoria juridica empresarial en Colombia para derecho corporativo, derecho societario, contratos comerciales, gobierno corporativo y recuperacion de cartera.",
    url: "/",
    type: "website",
  },
};

const trustPoints = [
  "Enfoque juridico estrategico",
  "Prevencion de riesgos empresariales",
  "Acompanamiento personalizado",
  "Vision corporativa",
  "Confidencialidad",
  "Analisis juridico con apoyo tecnologico",
];

const successCases = [
  "Estructuracion juridica de empresa familiar.",
  "Recuperacion estrategica de cartera comercial.",
  "Diseno de contratos comerciales de alto impacto.",
  "Acompanamiento en conflicto societario.",
];

const checklistItems = [
  "Contratos comerciales y obligaciones criticas",
  "Socios, acciones, estatutos y actas",
  "Cartera vencida y soportes de cobro",
  "Gobierno corporativo y toma de decisiones",
];

export default function Home() {
  return (
    <main className="site-shell">
      <Header />

      <section className="hero legal-hero">
        <div className="hero-copy">
          <div className="eyebrow">Firma juridica corporativa en Colombia</div>

          <h1>Inteligencia Juridica para Empresas que Crecen</h1>

          <p>
            Lex Iuridicus brinda asesoria juridica corporativa, societaria y
            estrategica para proteger empresas, prevenir riesgos y acompanar
            decisiones empresariales de alto impacto.
          </p>

          <div className="service-pills" aria-label="Areas principales">
            <span>Derecho corporativo</span>
            <span>Derecho societario</span>
            <span>Contratos comerciales</span>
            <span>Gobierno corporativo</span>
          </div>

          <div className="hero-actions">
            <Link className="button" href="#consulta">
              Solicitar diagnostico juridico
            </Link>
            <a className="ghost-button" href={siteConfig.whatsappHref}>
              Hablar por WhatsApp
            </a>
          </div>

          <p className="hero-microcopy">
            Atencion corporativa, reserva profesional y valoracion inicial
            orientativa.
          </p>
        </div>

        <aside
          className="intake-panel"
          id="consulta"
          aria-label="Formulario de diagnostico juridico"
        >
          <span className="form-note">Valoracion inicial</span>
          <h2>Solicita una valoracion inicial</h2>
          <p>
            Cuentanos el contexto de la empresa y recibe una primera orientacion
            sobre el frente juridico que conviene priorizar.
          </p>

          <LeadForm />
        </aside>
      </section>

      <section className="section problem-section">
        <div className="section-heading">
          <span className="eyebrow">Riesgos que atendemos</span>
          <h2>
            Protege juridicamente tu empresa antes de que el riesgo escale.
          </h2>
          <p>
            La prevencion juridica ayuda a ordenar contratos, socios, cartera,
            gobierno interno y decisiones sensibles antes de una crisis.
          </p>
        </div>

        <div className="problem-grid">
          <div>
            <strong>Decisiones sin soporte</strong>
            <p>
              Actas, reglas y aprobaciones incompletas pueden afectar la
              continuidad y la confianza de socios o inversionistas.
            </p>
          </div>
          <div>
            <strong>Contratos que no cubren la operacion</strong>
            <p>
              Ambiguedades sobre pagos, obligaciones, garantias o terminacion
              generan disputas evitables.
            </p>
          </div>
          <div>
            <strong>Cartera y conflictos empresariales</strong>
            <p>
              La falta de estrategia y soportes reduce la probabilidad de
              recuperar cartera o resolver controversias.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="servicios">
        <div className="section-heading">
          <span className="eyebrow">Servicios juridicos</span>
          <h2>Asesoria juridica empresarial para decisiones relevantes</h2>
          <p>
            Cada servicio combina diagnostico, estrategia y documentacion para
            que la empresa actue con mayor claridad.
          </p>
        </div>

        <div className="service-directory">
          {servicePages.map((service, index) => (
            <article className="feature service-card" key={service.slug}>
              <span className="feature-icon">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="status-pill">{service.eyebrow}</span>
              <h3>{service.title}</h3>
              <p>{service.problem}</p>
              <strong>{service.benefit}</strong>
              <Link className="service-cta" href={`/servicios/${service.slug}`}>
                <span>Conocer mas</span>
                <strong aria-hidden="true">-&gt;</strong>
              </Link>
            </article>
          ))}
        </div>

        <div className="conversion-band">
          <div>
            <span className="eyebrow">Agenda una consulta</span>
            <h3>Una valoracion temprana puede evitar costos mayores.</h3>
          </div>
          <Link className="button final-cta-button" href="#consulta">
            Protege juridicamente tu empresa
          </Link>
        </div>
      </section>

      <section className="section trust-section">
        <div className="section-heading">
          <span className="eyebrow">Confianza y autoridad</span>
          <h2>Por que elegir Lex Iuridicus</h2>
          <p>
            Una firma juridica corporativa debe entender el negocio, anticipar
            riesgos y convertir el analisis legal en decisiones ejecutables.
          </p>
        </div>

        <div className="authority-grid">
          {trustPoints.map((point) => (
            <article key={point}>
              <strong>{point}</strong>
            </article>
          ))}
        </div>

        <div className="case-section">
          <div>
            <span className="eyebrow">Casos anonimizados</span>
            <h3>Experiencia aplicada a situaciones empresariales reales.</h3>
          </div>
          <div className="case-grid">
            {successCases.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section split-section about-preview">
        <div>
          <span className="eyebrow">Sobre Lex Iuridicus</span>
          <h2>
            Una practica juridica sobria, estrategica y orientada a empresa.
          </h2>
          <p>
            Trabajamos con empresarios, socios y administradores que necesitan
            ordenar riesgos legales, fortalecer su estructura y actuar con
            informacion juridica clara.
          </p>
          <Link className="ghost-button" href="/sobre-lex-iuridicus">
            Conocer la firma
          </Link>
        </div>
        <div className="process-list">
          <div>
            <strong>Mision</strong>
            <p>
              Proteger empresas mediante asesoria juridica empresarial clara,
              preventiva y estrategica.
            </p>
          </div>
          <div>
            <strong>Propuesta diferencial</strong>
            <p>
              Traducimos complejidad juridica en prioridades, documentos y rutas
              de accion comprensibles para la direccion.
            </p>
          </div>
        </div>
      </section>

      <section className="section checklist-section" id="checklist">
        <div className="section-heading">
          <span className="eyebrow">Lead magnet</span>
          <h2>Checklist Juridico para Empresas</h2>
          <p>
            Descarga una guia basica para identificar riesgos legales en
            contratos, sociedades, cartera y gobierno corporativo.
          </p>
        </div>

        <div className="checklist-layout">
          <div className="checklist-card">
            {checklistItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="intake-panel">
            <span className="form-note">Guia descargable</span>
            <h3>Solicita el checklist</h3>
            <p>
              Usa el formulario para pedir el recurso. El envio de este
              formulario no constituye asesoria juridica ni crea relacion
              abogado-cliente.
            </p>
            <LeadForm />
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div>
          <span className="eyebrow">Siguiente paso</span>
          <h2>Agenda una consulta antes de tomar una decision sensible.</h2>
          <p>
            Una revision juridica oportuna ayuda a prevenir conflictos, mejorar
            contratos y ordenar la estructura de la empresa.
          </p>
        </div>
        <a className="button final-cta-button" href={siteConfig.whatsappHref}>
          Hablar por WhatsApp
        </a>
      </section>
    </main>
  );
}
