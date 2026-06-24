export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://lexiuridicos.site";

export const siteConfig = {
  name: "Lexiuridicus",
  legalName: "Lexiuridicus",
  url: siteUrl,
  description:
    "Derecho corporativo en Barranquilla y Colombia para empresas, socios e inversionistas. Diagnostico en tradicion de acciones, imagen empresarial y gobierno corporativo.",
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
    "Tradicion de acciones",
    "Imagen empresarial",
    "Gobierno corporativo",
  ],
  sameAs: [],
};
