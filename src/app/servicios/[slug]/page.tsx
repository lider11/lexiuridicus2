import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { getServicePage, servicePages } from "@/lib/services";
import { siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    return {
      title: "Servicio no encontrado | Lexiuridicus",
    };
  }

  const path = `/servicios/${service.slug}`;

  return {
    title: `${service.title} en Barranquilla | Lexiuridicus`,
    description: service.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${service.title} | Lexiuridicus`,
      description: service.description,
      url: path,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.title,
    areaServed: [
      {
        "@type": "City",
        name: "Barranquilla",
      },
      {
        "@type": "Country",
        name: "Colombia",
      },
    ],
    provider: {
      "@type": "LegalService",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/servicios/${service.slug}`,
  };

  return (
    <main className="site-shell">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <section className="method-hero">
        <div className="method-hero-copy">
          <span className="eyebrow">{service.eyebrow}</span>
          <h1>{service.title} para empresas en Barranquilla y Colombia.</h1>
          <p>{service.description}</p>
          <div className="hero-actions">
            <Link
              className="button"
              href={`/?servicio=${service.serviceParam}#consulta`}
            >
              {service.cta}
            </Link>
            <Link className="ghost-button" href="/metodo">
              Ver metodo
            </Link>
          </div>
        </div>

        <aside className="method-summary">
          <span className="status-pill">Diagnostico inicial</span>
          <h2>{service.question}</h2>
          <p>{service.intro}</p>
        </aside>
      </section>

      <section className="section method-review">
        <div>
          <span className="eyebrow">Que revisamos</span>
          <h2>Una revision enfocada en claridad, riesgo y accion.</h2>
          <p>
            El servicio parte de la informacion real de la empresa para ubicar
            lo que debe ordenarse primero y evitar decisiones a ciegas.
          </p>
        </div>

        <div className="review-list">
          {service.review.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="section method-outcome">
        <div className="section-heading">
          <span className="eyebrow">Resultado esperado</span>
          <h2>Al final tendras una ruta mas clara para avanzar.</h2>
        </div>

        <div className="stats-grid">
          {service.outcomes.map((outcome) => (
            <div className="stat" key={outcome}>
              <strong>{outcome}</strong>
              <p>Un insumo practico para priorizar decisiones corporativas.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas comunes antes de solicitar el diagnostico</h2>
        </div>

        <div className="faq-grid">
          {service.faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section final-cta">
        <div>
          <span className="eyebrow">Siguiente paso</span>
          <h2>Convierte esta inquietud en una decision mejor informada.</h2>
          <p>
            Te ayudamos a revisar el frente critico y a definir que conviene
            ordenar primero.
          </p>
        </div>
        <Link
          className="button final-cta-button"
          href={`/?servicio=${service.serviceParam}#consulta`}
        >
          Solicitar diagnostico
        </Link>
      </section>
    </main>
  );
}
