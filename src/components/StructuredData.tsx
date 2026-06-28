import { siteConfig } from "@/lib/site";

export function StructuredData() {
  const telephones = [siteConfig.phone, ...siteConfig.additionalPhones].filter(
    Boolean,
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        description: siteConfig.description,
        ...(siteConfig.email ? { email: siteConfig.email } : {}),
        ...(telephones.length ? { telephone: telephones } : {}),
        ...(siteConfig.sameAs.length ? { sameAs: siteConfig.sameAs } : {}),
      },
      {
        "@type": "LegalService",
        "@id": `${siteConfig.url}/#legalservice`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        description: siteConfig.description,
        parentOrganization: {
          "@id": `${siteConfig.url}/#organization`,
        },
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
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
