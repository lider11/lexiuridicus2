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
      "Diagnostico juridico empresarial para tradicion de acciones, imagen empresarial y gobierno corporativo.",
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
  "Organizacion de soportes de tradicion de acciones.",
  "Preparacion juridica para conversacion con inversionistas.",
  "Acompanamiento en conflicto societario.",
];

const checklistItems = [
  "Titularidad, transferencias y soportes accionarios",
  "Actas, estatutos y decisiones de socios",
  "Imagen juridica ante inversionistas o aliados",
  "Gobierno corporativo y reglas internas",
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
            <span>Tradicion de acciones</span>
            <span>Imagen empresarial</span>
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
            La prevencion juridica ayuda a ordenar propiedad accionaria, imagen
            empresarial, gobierno interno y decisiones sensibles antes de una
            crisis.
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
            <strong>Imagen empresarial poco preparada</strong>
            <p>
              Documentos, narrativa y soportes dispersos reducen confianza ante
              inversionistas, aliados o compradores.
            </p>
          </div>
          <div>
            <strong>Gobierno interno informal</strong>
            <p>
              Roles, organos y procesos de decision poco definidos generan
              incertidumbre entre socios y administradores.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="servicios">
        <div className="section-heading">
          <span className="eyebrow">Servicios juridicos</span>
          <h2>
            Tres frentes para ordenar empresas con socios e inversionistas
          </h2>
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
            acciones, sociedades, imagen empresarial y gobierno corporativo.
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
            la confianza empresarial y ordenar la estructura de decision.
          </p>
        </div>
        <a className="button final-cta-button" href={siteConfig.whatsappHref}>
          Hablar por WhatsApp
        </a>
      </section>
    </main>
  );
}
