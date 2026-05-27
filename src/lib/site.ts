export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://lexiuridicos.site";

export const siteConfig = {
  name: "Lexiuridicus",
  legalName: "Lexiuridicus",
  url: siteUrl,
  description:
    "Derecho corporativo en Barranquilla y Colombia para empresas, socios e inversionistas. Diagnostico en tradicion de acciones, imagen empresarial y gobierno corporativo.",
  email: "contacto@lexiuridicus.com",
  phone: "+57 300 000 0000",
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
};
