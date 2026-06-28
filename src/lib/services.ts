export type ServicePage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  question: string;
  problem: string;
  benefit: string;
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
    slug: "derecho-corporativo",
    title: "Derecho Corporativo",
    eyebrow: "Estrategia empresarial",
    description:
      "Asesoria juridica corporativa para ordenar la estructura legal, reducir riesgos y acompanar decisiones empresariales de alto impacto.",
    question: "La empresa esta creciendo sin una estructura juridica clara?",
    problem:
      "El crecimiento trae decisiones, socios, contratos y responsabilidades que pueden quedar dispersas.",
    benefit:
      "La empresa gana orden, trazabilidad y mejores criterios para tomar decisiones.",
    intro:
      "Acompanamos a empresas que necesitan una vision juridica integral para operar, crecer, negociar y prevenir contingencias.",
    review: [
      "Estructura societaria y documental",
      "Riesgos juridicos recurrentes",
      "Decisiones corporativas relevantes",
      "Contratos y procesos internos",
    ],
    outcomes: [
      "Mapa juridico inicial de la empresa",
      "Riesgos priorizados por impacto",
      "Ruta de accion corporativa",
    ],
    faq: [
      {
        question: "Sirve para empresas pequenas?",
        answer:
          "Si. Una empresa en crecimiento necesita orden juridico antes de que los riesgos se vuelvan costosos.",
      },
    ],
    cta: "Solicitar diagnostico corporativo",
    serviceParam: "Derecho%20corporativo",
  },
  {
    slug: "derecho-societario",
    title: "Derecho Societario",
    eyebrow: "Socios y estructura",
    description:
      "Acompanamiento en relaciones entre socios, estatutos, actas, decisiones, conflictos y estructura societaria.",
    question:
      "Los socios tienen reglas claras para decidir y resolver diferencias?",
    problem:
      "La informalidad societaria produce conflictos, bloqueos y dudas sobre derechos u obligaciones.",
    benefit:
      "Los socios cuentan con reglas verificables y mejor soporte para decisiones sensibles.",
    intro:
      "Revisamos estatutos, actas, acuerdos y dinamicas entre socios para fortalecer la seguridad juridica de la sociedad.",
    review: [
      "Estatutos y actas",
      "Relaciones entre socios",
      "Reglas de decision",
      "Conflictos o riesgos societarios",
    ],
    outcomes: [
      "Diagnostico societario",
      "Prioridades de regularizacion",
      "Recomendaciones para prevenir conflictos",
    ],
    faq: [
      {
        question: "Incluye conflictos entre socios?",
        answer:
          "Si. El diagnostico puede identificar riesgos y rutas para abordar diferencias societarias.",
      },
    ],
    cta: "Revisar estructura societaria",
    serviceParam: "Derecho%20societario",
  },
  {
    slug: "gobierno-corporativo",
    title: "Gobierno Corporativo",
    eyebrow: "Decisiones internas",
    description:
      "Servicio para ordenar roles, reglas, organos de decision y documentacion interna en empresas en crecimiento.",
    question: "Las decisiones dependen de acuerdos informales?",
    problem:
      "La falta de reglas y soportes afecta continuidad, confianza y control interno.",
    benefit:
      "La empresa mejora su capacidad de decidir, documentar y rendir cuentas.",
    intro:
      "Revisamos como decide la empresa, quienes intervienen, que reglas existen y que soportes documentan las decisiones relevantes.",
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
          "No. Las pequenas y medianas empresas tambien necesitan reglas claras cuando hay socios, inversionistas o decisiones sensibles.",
      },
    ],
    cta: "Ordenar decisiones internas",
    serviceParam: "Gobierno%20corporativo",
  },
  {
    slug: "contratos-comerciales",
    title: "Contratos Comerciales",
    eyebrow: "Negocios con soporte",
    description:
      "Revision, diseno y mejora de contratos comerciales para reducir ambiguedades, incumplimientos y riesgos operativos.",
    question: "Tus contratos protegen realmente la operacion?",
    problem:
      "Contratos genericos o incompletos dejan riesgos abiertos en pagos, entregas, responsabilidades y terminacion.",
    benefit:
      "La empresa negocia con reglas mas claras y reduce disputas evitables.",
    intro:
      "Acompanamos contratos con clientes, proveedores, aliados, distribuidores y prestadores de servicios.",
    review: [
      "Objeto, alcance y obligaciones",
      "Pagos, garantias e incumplimientos",
      "Terminacion y solucion de controversias",
      "Riesgos comerciales frecuentes",
    ],
    outcomes: [
      "Contratos mas claros",
      "Clausulas ajustadas al negocio",
      "Menor exposicion a disputas",
    ],
    faq: [
      {
        question: "Pueden revisar contratos existentes?",
        answer:
          "Si. Podemos revisar documentos actuales y proponer ajustes por prioridad de riesgo.",
      },
    ],
    cta: "Revisar contratos",
    serviceParam: "Contratos%20comerciales",
  },
  {
    slug: "recuperacion-de-cartera",
    title: "Recuperacion de Cartera",
    eyebrow: "Cartera comercial",
    description:
      "Estrategia juridica para recuperar cartera empresarial con enfoque preventivo, negociado y documentado.",
    question: "La cartera vencida esta afectando el flujo de caja?",
    problem:
      "La falta de soportes, seguimiento y estrategia reduce la probabilidad de recuperacion.",
    benefit:
      "La empresa mejora su capacidad de cobro y documenta el proceso de recuperacion.",
    intro:
      "Analizamos documentos, soportes y viabilidad de acciones para recuperar cartera comercial.",
    review: [
      "Facturas, contratos y soportes",
      "Comunicaciones con deudores",
      "Antiguedad y monto de cartera",
      "Ruta negociada o juridica",
    ],
    outcomes: [
      "Estrategia de recuperacion",
      "Prioridad por caso",
      "Soporte documental organizado",
    ],
    faq: [
      {
        question: "Siempre se demanda?",
        answer:
          "No. Primero se evalua la ruta mas eficiente: negociacion, requerimiento formal o accion juridica.",
      },
    ],
    cta: "Evaluar cartera",
    serviceParam: "Recuperacion%20de%20cartera",
  },
  {
    slug: "litigios-empresariales",
    title: "Litigios Empresariales",
    eyebrow: "Controversias",
    description:
      "Acompanamiento en disputas empresariales, societarias y contractuales con enfoque estrategico.",
    question: "La empresa enfrenta una disputa que requiere estrategia?",
    problem:
      "Una controversia mal gestionada puede escalar costos, afectar reputacion y distraer la operacion.",
    benefit:
      "La empresa entiende sus opciones, riesgos y costos antes de actuar.",
    intro:
      "Analizamos controversias para definir una estrategia juridica proporcional al impacto del conflicto.",
    review: [
      "Hechos y pruebas disponibles",
      "Riesgos economicos y reputacionales",
      "Opciones negociadas o judiciales",
      "Viabilidad de reclamaciones o defensa",
    ],
    outcomes: [
      "Lectura estrategica del conflicto",
      "Riesgos y escenarios",
      "Ruta de accion documentada",
    ],
    faq: [
      {
        question: "Pueden apoyar antes de demandar?",
        answer:
          "Si. La evaluacion previa ayuda a decidir si conviene negociar, requerir formalmente o litigar.",
      },
    ],
    cta: "Analizar controversia",
    serviceParam: "Litigios%20empresariales",
  },
  {
    slug: "compliance",
    title: "Compliance",
    eyebrow: "Prevencion y control",
    description:
      "Diseno y fortalecimiento de practicas internas para prevenir riesgos legales, regulatorios y reputacionales.",
    question:
      "La empresa tiene controles juridicos proporcionales a su riesgo?",
    problem:
      "La ausencia de controles aumenta exposicion en contratacion, datos, conflictos de interes y decisiones internas.",
    benefit:
      "La empresa mejora trazabilidad, cultura preventiva y capacidad de respuesta.",
    intro:
      "Acompanamos diagnosticos y medidas de cumplimiento adaptadas al tamano y actividad de la empresa.",
    review: [
      "Riesgos por actividad",
      "Politicas y controles existentes",
      "Responsables internos",
      "Trazabilidad documental",
    ],
    outcomes: [
      "Mapa de cumplimiento",
      "Controles recomendados",
      "Plan de implementacion gradual",
    ],
    faq: [
      {
        question: "Requiere un sistema complejo?",
        answer:
          "No necesariamente. El enfoque debe ser proporcional al tamano, actividad y riesgos reales de la empresa.",
      },
    ],
    cta: "Evaluar cumplimiento",
    serviceParam: "Compliance",
  },
  {
    slug: "proteccion-patrimonial",
    title: "Proteccion Patrimonial",
    eyebrow: "Riesgos y patrimonio",
    description:
      "Revision juridica para proteger activos empresariales y familiares frente a riesgos comerciales, societarios y sucesorales.",
    question:
      "El patrimonio esta separado y protegido frente a riesgos empresariales?",
    problem:
      "La mezcla entre patrimonio personal, familiar y empresarial puede aumentar exposicion.",
    benefit:
      "La empresa y sus socios identifican medidas para ordenar y proteger activos.",
    intro:
      "Analizamos estructura, titularidad y riesgos para proponer rutas de proteccion patrimonial razonables.",
    review: [
      "Activos relevantes",
      "Riesgos empresariales",
      "Separacion patrimonial",
      "Documentacion societaria y familiar",
    ],
    outcomes: [
      "Mapa de exposicion patrimonial",
      "Rutas de ordenamiento",
      "Prioridades de proteccion",
    ],
    faq: [
      {
        question: "Es solo para grandes patrimonios?",
        answer:
          "No. Cualquier empresario puede necesitar ordenar la relacion entre empresa, socios y patrimonio.",
      },
    ],
    cta: "Proteger patrimonio",
    serviceParam: "Proteccion%20patrimonial",
  },
  {
    slug: "protocolo-de-familia-empresarial",
    title: "Protocolo de Familia Empresarial",
    eyebrow: "Empresa familiar",
    description:
      "Diseno de reglas para armonizar familia, propiedad y empresa, anticipando sucesion, roles y decisiones sensibles.",
    question: "La empresa familiar tiene reglas para continuidad y sucesion?",
    problem:
      "La confianza familiar no siempre resuelve decisiones empresariales, sucesion o entrada de nuevas generaciones.",
    benefit:
      "La familia empresaria define reglas claras para proteger continuidad y relaciones.",
    intro:
      "Acompanamos conversaciones y documentos para ordenar roles, propiedad, sucesion y gobierno en empresas familiares.",
    review: [
      "Roles familiares y empresariales",
      "Reglas de ingreso y salida",
      "Sucesion y continuidad",
      "Conflictos previsibles",
    ],
    outcomes: [
      "Mapa de temas sensibles",
      "Reglas familiares-empresariales",
      "Ruta de protocolo",
    ],
    faq: [
      {
        question: "El protocolo evita todos los conflictos?",
        answer:
          "No, pero reduce ambiguedades y crea reglas para conversar y decidir mejor.",
      },
    ],
    cta: "Ordenar empresa familiar",
    serviceParam: "Protocolo%20de%20familia%20empresarial",
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((service) => service.slug === slug) ?? null;
}
