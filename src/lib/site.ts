export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://lexiuridicus.site";

export const siteConfig = {
  name: "Lexiuridicus",
  legalName: "Lex Iuridicus",
  url: siteUrl,
  description:
    "Firma juridica corporativa en Colombia para empresas que necesitan asesoria societaria, contractual, comercial, de gobierno corporativo y prevencion de riesgos.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contacto@lexiuridicus.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+57 301 237 0047",
  additionalPhones: [
    process.env.NEXT_PUBLIC_CONTACT_PHONE_SECONDARY || "+57 300 839 3987",
  ].filter(Boolean),
  address: {
    streetAddress: "Barranquilla",
    addressLocality: "Barranquilla",
    addressRegion: "Atlantico",
    addressCountry: "CO",
  },
  services: [
    "Derecho corporativo",
    "Derecho societario",
    "Gobierno corporativo",
    "Contratos comerciales",
    "Recuperacion de cartera",
    "Litigios empresariales",
    "Compliance",
    "Proteccion patrimonial",
    "Protocolo de familia empresarial",
  ],
  sameAs: [],
  whatsappHref:
    process.env.NEXT_PUBLIC_WHATSAPP_URL ||
    "https://wa.me/573012370047?text=Hola%20Lex%20Iuridicus%2C%20quiero%20solicitar%20un%20diagnostico%20juridico.",
};
