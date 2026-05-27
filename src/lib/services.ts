export type ServicePage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  question: string;
  intro: string;
  review: string[];
  outcomes: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
  cta: string;
  serviceParam: string;
};

export const servicePages: ServicePage[] = [
  {
    slug: "tradicion-de-acciones",
    title: "Tradicion de acciones",
    eyebrow: "Propiedad accionaria",
    description:
      "Servicio para ordenar la trazabilidad de acciones, soportes de titularidad y movimientos societarios en empresas de Barranquilla y Colombia.",
    question: "Esta claro quien posee que en tu empresa?",
    intro:
      "Revisamos la historia accionaria de la sociedad para identificar vacios, inconsistencias y soportes que conviene organizar antes de negociar, recibir inversion o resolver diferencias entre socios.",
    review: [
      "Libro de accionistas y registros disponibles",
      "Transferencias, cesiones o movimientos accionarios",
      "Actas, contratos y documentos de soporte",
      "Riesgos de titularidad o trazabilidad",
    ],
    outcomes: [
      "Mapa inicial de propiedad accionaria",
      "Identificacion de soportes faltantes",
      "Prioridades para ordenar la documentacion",
    ],
    faq: [
      {
        question: "Cuando conviene revisar la tradicion de acciones?",
        answer:
          "Antes de vender participaciones, recibir inversion, formalizar acuerdos entre socios o corregir registros incompletos.",
      },
      {
        question: "El diagnostico reemplaza una auditoria legal completa?",
        answer:
          "No. Es una revision inicial para ubicar riesgos y definir que documentos o acciones requieren mayor profundidad.",
      },
    ],
    cta: "Quiero revisar mis acciones",
    serviceParam: "Tradicion%20de%20acciones",
  },
  {
    slug: "imagen-empresarial",
    title: "Imagen empresarial",
    eyebrow: "Confianza ante terceros",
    description:
      "Servicio para mejorar la presentacion juridica y corporativa de empresas ante inversionistas, aliados, compradores o entidades financieras.",
    question: "Tu empresa se ve preparada ante terceros?",
    intro:
      "Ayudamos a que la empresa proyecte orden, coherencia y preparacion. Revisamos que la informacion corporativa cuente una historia clara y confiable para conversaciones relevantes.",
    review: [
      "Narrativa corporativa y documentos de soporte",
      "Riesgos visibles para terceros",
      "Consistencia entre informacion juridica y comercial",
      "Preparacion para inversionistas, aliados o compradores",
    ],
    outcomes: [
      "Mensajes corporativos mas claros",
      "Lista de soportes que conviene organizar",
      "Mejor preparacion para conversaciones estrategicas",
    ],
    faq: [
      {
        question: "La imagen empresarial es solo diseno o marca?",
        answer:
          "No. Aqui la imagen se entiende como confianza corporativa: informacion consistente, soportes claros y una presentacion ordenada ante terceros.",
      },
      {
        question: "Sirve si estoy buscando inversion?",
        answer:
          "Si. Es especialmente util antes de hablar con inversionistas, aliados, compradores o bancos.",
      },
    ],
    cta: "Mejorar imagen empresarial",
    serviceParam: "Imagen%20empresarial",
  },
  {
    slug: "gobierno-corporativo",
    title: "Gobierno corporativo",
    eyebrow: "Decisiones internas",
    description:
      "Servicio para ordenar roles, reglas, organos de decision y documentacion interna en empresas en crecimiento.",
    question: "Las decisiones dependen de acuerdos informales?",
    intro:
      "Revisamos como decide la empresa, quienes intervienen, que reglas existen y que soportes documentan las decisiones relevantes. El objetivo es reducir incertidumbre y mejorar continuidad.",
    review: [
      "Roles de socios, administradores y organos",
      "Actas, decisiones y reglas internas",
      "Procesos de aprobacion y responsabilidades",
      "Riesgos por informalidad o falta de trazabilidad",
    ],
    outcomes: [
      "Claridad sobre reglas de decision",
      "Prioridades para documentar procesos internos",
      "Mejor continuidad frente a crecimiento o conflictos",
    ],
    faq: [
      {
        question: "Solo aplica para empresas grandes?",
        answer:
          "No. Las empresas pequenas y medianas tambien necesitan reglas claras cuando hay socios, administradores, inversionistas o decisiones sensibles.",
      },
      {
        question: "Que pasa si no tenemos actas completas?",
        answer:
          "El diagnostico ayuda a identificar vacios y a priorizar que informacion debe reconstruirse u organizarse primero.",
      },
    ],
    cta: "Ordenar decisiones internas",
    serviceParam: "Gobierno%20corporativo",
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((service) => service.slug === slug) ?? null;
}
