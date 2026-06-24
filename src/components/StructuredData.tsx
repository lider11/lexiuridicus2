import { siteConfig } from "@/lib/site";

export function StructuredData() {
  const telephones = [siteConfig.phone, ...siteConfig.additionalPhones].filter(
    Boolean,
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(telephones.length ? { telephone: telephones } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      addressCountry: siteConfig.address.addressCountry,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Barranquilla",
      },
      {
        "@type": "AdministrativeArea",
        name: "Atlantico",
      },
      {
        "@type": "Country",
        name: "Colombia",
      },
    ],
    knowsAbout: siteConfig.services,
    serviceType: siteConfig.services,
    ...(siteConfig.sameAs.length ? { sameAs: siteConfig.sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
