import type { Metadata } from "next";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { Chatbot } from "@/components/Chatbot";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { StructuredData } from "@/components/StructuredData";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Lex Iuridicus | Abogado empresarial y corporativo en Colombia",
    template: "%s | Lex Iuridicus",
  },
  description:
    "Asesoria juridica empresarial, derecho corporativo, derecho societario, contratos comerciales, gobierno corporativo y recuperacion de cartera en Colombia.",
  keywords: [
    "abogado empresarial Colombia",
    "abogado corporativo Barranquilla",
    "derecho societario Colombia",
    "gobierno corporativo",
    "contratos comerciales",
    "recuperacion de cartera",
    "litigios empresariales",
    "asesoria juridica empresarial",
    "firma juridica corporativa",
    "abogado comercial Colombia",
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
