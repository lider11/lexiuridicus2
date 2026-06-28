export type StaticBlogArticle = {
  slug: string;
  title: string;
  seoTitle: string;
  excerpt: string;
  category: string;
  serviceHref: string;
  serviceLabel: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
};

export const staticBlogArticles: StaticBlogArticle[] = [
  {
    slug: "gobierno-corporativo",
    title: "Por que una empresa necesita gobierno corporativo?",
    seoTitle: "Por que una empresa necesita gobierno corporativo?",
    excerpt:
      "El gobierno corporativo ayuda a definir reglas, roles y decisiones para reducir conflictos y mejorar continuidad empresarial.",
    category: "Gobierno corporativo",
    serviceHref: "/servicios/gobierno-corporativo",
    serviceLabel: "Servicio de gobierno corporativo",
    sections: [
      {
        heading: "Reglas antes del conflicto",
        body: "Una empresa necesita gobierno corporativo porque el crecimiento aumenta la complejidad de las decisiones. Cuando no hay reglas claras, cada decision sensible depende de interpretaciones, acuerdos informales o relaciones personales.",
      },
      {
        heading: "Roles y responsabilidades",
        body: "Definir quien decide, como se aprueba, que debe documentarse y que responsabilidades tiene cada organo ayuda a proteger a socios, administradores e inversionistas.",
      },
      {
        heading: "Confianza para terceros",
        body: "Una empresa con gobierno corporativo proyecta mayor seriedad ante bancos, aliados, compradores e inversionistas porque puede explicar como se toman sus decisiones.",
      },
    ],
  },
  {
    slug: "contratos-comerciales",
    title: "Errores comunes en contratos comerciales",
    seoTitle: "Errores comunes en contratos comerciales",
    excerpt:
      "Los contratos comerciales deben reflejar la operacion real, proteger pagos y anticipar incumplimientos.",
    category: "Contratos comerciales",
    serviceHref: "/servicios/contratos-comerciales",
    serviceLabel: "Servicio de contratos comerciales",
    sections: [
      {
        heading: "Usar formatos genericos",
        body: "Un contrato generico puede omitir responsabilidades, plazos, garantias o condiciones propias del negocio. La forma importa, pero el riesgo suele estar en lo que el documento no dice.",
      },
      {
        heading: "No prever el incumplimiento",
        body: "Muchos contratos describen la relacion cuando todo marcha bien, pero no explican que ocurre si no hay pago, si hay retrasos o si una parte quiere terminar anticipadamente.",
      },
      {
        heading: "Falta de soportes",
        body: "Un contrato fuerte tambien necesita anexos, ordenes, aprobaciones, comunicaciones y evidencia de ejecucion. Sin soportes, reclamar puede ser mas dificil.",
      },
    ],
  },
  {
    slug: "derecho-societario",
    title: "Como prevenir conflictos entre socios",
    seoTitle: "Como prevenir conflictos entre socios",
    excerpt:
      "La prevencion de conflictos societarios empieza con reglas claras, actas completas y acuerdos verificables.",
    category: "Derecho societario",
    serviceHref: "/servicios/derecho-societario",
    serviceLabel: "Servicio de derecho societario",
    sections: [
      {
        heading: "Documentar antes de discutir",
        body: "Los conflictos entre socios suelen escalar cuando las decisiones importantes quedaron en conversaciones informales. Actas, estatutos y acuerdos claros reducen el margen de interpretacion.",
      },
      {
        heading: "Definir reglas de entrada y salida",
        body: "La empresa debe tener reglas sobre venta de participaciones, ingreso de nuevos socios, mayorias, roles y solucion de desacuerdos.",
      },
      {
        heading: "Separar familia, propiedad y administracion",
        body: "En empresas familiares o sociedades cerradas, separar roles ayuda a evitar que diferencias personales bloqueen decisiones empresariales.",
      },
    ],
  },
  {
    slug: "recuperacion-cartera",
    title: "Claves para recuperar cartera empresarial",
    seoTitle: "Claves para recuperar cartera empresarial",
    excerpt:
      "Recuperar cartera requiere soportes claros, priorizacion de casos y una estrategia juridica proporcional.",
    category: "Recuperacion de cartera",
    serviceHref: "/servicios/recuperacion-de-cartera",
    serviceLabel: "Servicio de recuperacion de cartera",
    sections: [
      {
        heading: "Organizar documentos",
        body: "Antes de reclamar, conviene reunir contratos, facturas, ordenes, comunicaciones y evidencia de entrega o prestacion del servicio.",
      },
      {
        heading: "Priorizar por viabilidad",
        body: "No toda cartera se recupera con la misma estrategia. Monto, antiguedad, soportes y perfil del deudor ayudan a definir prioridades.",
      },
      {
        heading: "Escalar gradualmente",
        body: "Una ruta puede empezar con gestion documentada, seguir con requerimiento formal y, si es necesario, avanzar hacia acciones juridicas.",
      },
    ],
  },
];

export function getStaticBlogArticle(slug: string) {
  return staticBlogArticles.find((article) => article.slug === slug) ?? null;
}
