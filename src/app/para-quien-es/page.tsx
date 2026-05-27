import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Para quien es Lexiuridicus | Empresas, socios e inversionistas",
  description:
    "Lexiuridicus acompana a empresas con socios, administradores e inversionistas que necesitan ordenar acciones, decisiones e imagen corporativa.",
  alternates: {
    canonical: "/para-quien-es",
  },
  openGraph: {
    title: "Para quien es Lexiuridicus",
    description:
      "Identifica si tu empresa necesita diagnostico en tradicion de acciones, imagen empresarial o gobierno corporativo.",
    url: "/para-quien-es",
    type: "website",
  },
};

const audiences = [
  {
    title: "Empresas con socios o accionistas",
    text: "Cuando la propiedad, las transferencias o los acuerdos entre socios necesitan mayor trazabilidad y soporte.",
  },
  {
    title: "Gerentes y administradores",
    text: "Cuando las decisiones internas requieren reglas claras, actas completas y responsabilidades mejor definidas.",
  },
  {
    title: "Fundadores en crecimiento",
    text: "Cuando la empresa empieza a negociar con aliados, compradores o inversionistas y necesita proyectar orden.",
  },
  {
    title: "Inversionistas y aliados",
    text: "Cuando se necesita revisar si la empresa tiene claridad documental, societaria y de gobierno antes de avanzar.",
  },
];

const signals = [
  "Existen transferencias de acciones que no estan suficientemente documentadas.",
  "Los socios toman decisiones importantes de manera informal.",
  "La empresa quiere presentarse ante inversionistas o aliados estrategicos.",
  "Hay dudas sobre titularidad, actas, roles o reglas de administracion.",
  "El crecimiento exige mayor orden antes de negociar o recibir capital.",
  "La informacion corporativa no transmite la confianza que la empresa necesita.",
];

const services = [
  {
    title: "Tradicion de acciones",
    text: "Para empresas que necesitan claridad sobre propiedad, movimientos accionarios y soportes de titularidad.",
    href: "/?servicio=Tradicion%20de%20acciones#consulta",
  },
  {
    title: "Imagen empresarial",
    text: "Para empresas que quieren comunicar orden y preparacion ante terceros, aliados o inversionistas.",
    href: "/?servicio=Imagen%20empresarial#consulta",
  },
  {
    title: "Gobierno corporativo",
    text: "Para empresas que necesitan reglas de decision, roles internos y procesos mejor documentados.",
    href: "/?servicio=Gobierno%20corporativo#consulta",
  },
];

export default function ParaQuienEsPage() {
  return (
    <main className="site-shell">
      <Header />

      <section className="audience-hero">
        <div className="audience-hero-copy">
          <span className="eyebrow">Para quien es</span>
          <h1>
            Para empresas que necesitan ordenar su estructura antes de crecer.
          </h1>
          <p>
            Lexiuridicus esta pensado para empresas, socios, administradores e
            inversionistas que necesitan claridad sobre propiedad accionaria,
            gobierno corporativo e imagen empresarial.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/#consulta">
              Solicitar diagnostico empresarial
            </Link>
            <Link className="ghost-button" href="/metodo">
              Ver metodo
            </Link>
          </div>
        </div>

        <aside className="audience-card">
          <span className="status-pill">Senal principal</span>
          <h2>Si la empresa crece, el orden juridico deja de ser opcional.</h2>
          <p>
            Cuando hay socios, inversionistas o decisiones sensibles, la
            confianza depende de tener soportes claros y reglas verificables.
          </p>
        </aside>
      </section>

      <section className="section audience-fit">
        <div className="section-heading">
          <span className="eyebrow">Perfiles principales</span>
          <h2>Lexiuridicus es especialmente util para estos casos</h2>
          <p>
            El servicio se enfoca en empresas que ya tienen o estan por tener
            conversaciones importantes sobre propiedad, decisiones o confianza
            corporativa.
          </p>
        </div>

        <div className="audience-fit-grid">
          {audiences.map((audience) => (
            <article key={audience.title}>
              <h3>{audience.title}</h3>
              <p>{audience.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section audience-signals">
        <div>
          <span className="eyebrow">Cuando pedir ayuda</span>
          <h2>Senales de que conviene hacer un diagnostico.</h2>
          <p>
            No necesitas esperar a que exista un conflicto. Muchas empresas
            pueden ordenar sus riesgos antes de negociar, crecer o formalizar
            nuevas decisiones.
          </p>
        </div>

        <div className="signal-list">
          {signals.map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
        </div>
      </section>

      <section className="section audience-services">
        <div className="section-heading">
          <span className="eyebrow">Ruta recomendada</span>
          <h2>Elige el frente que mejor describe tu situacion</h2>
        </div>

        <div className="feature-grid">
          {services.map((service) => (
            <article className="feature" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <Link className="service-cta" href={service.href}>
                <span>Solicitar revision</span>
                <strong aria-hidden="true">+</strong>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section final-cta">
        <div>
          <span className="eyebrow">Siguiente paso</span>
          <h2>
            Si te reconoces en uno de estos casos, empecemos por diagnosticar.
          </h2>
          <p>
            Te orientamos sobre que servicio conviene priorizar segun la
            situacion actual de la empresa.
          </p>
        </div>
        <Link className="button final-cta-button" href="/#consulta">
          Solicitar diagnostico
        </Link>
      </section>
    </main>
  );
}
