import type { Metadata } from "next";
import Script from "next/script";
import { Chatbot } from "@/components/Chatbot";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Lexiuridicus | Derecho corporativo para empresas",
  description:
    siteConfig.description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Lexiuridicus | Derecho corporativo para empresas",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "es_CO",
    type: "website",
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
        <StructuredData />
        {children}
        <Footer />
        <Chatbot />
        <Script src="/chatbot.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
