import type { Metadata } from "next";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { Chatbot } from "@/components/Chatbot";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { StructuredData } from "@/components/StructuredData";
import { siteConfig } from "@/lib/site";
import "./globals.css";
import "./mobile-header.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Lex Iuridicus | Abogado empresarial y corporativo en Colombia",
    template: "%s | Lex Iuridicus",
  },
  description:
    "Diagnostico juridico empresarial para tradicion de acciones, imagen empresarial y gobierno corporativo en Colombia.",
  keywords: [
    "tradicion de acciones Colombia",
    "imagen empresarial",
    "gobierno corporativo",
    "socios e inversionistas",
    "diagnostico juridico empresarial",
    "empresa familiar",
    "conflictos societarios",
    "orden societario",
    "preparacion para inversionistas",
    "firma juridica corporativa Barranquilla",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Lex Iuridicus | Inteligencia juridica para empresas",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lex Iuridicus | Abogado empresarial en Colombia",
    description: siteConfig.description,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CO">
      <body>
        <AnalyticsScripts />
        <StructuredData />
        {children}
        <Footer />
        <FloatingWhatsApp />
        <Chatbot />
      </body>
    </html>
  );
}
