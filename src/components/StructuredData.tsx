import { siteConfig } from "@/lib/site";

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
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
    sameAs: [
      "https://www.linkedin.com",
      "https://www.instagram.com",
      "https://www.facebook.com",
      "https://www.pinterest.com",
      "https://www.tiktok.com",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
