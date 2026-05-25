import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lexiuridicus | Derecho corporativo para empresas",
  description:
    "Diagnostico y asesoria en tradicion de acciones, imagen empresarial y gobierno corporativo para empresas.",
  openGraph: {
    title: "Lexiuridicus | Derecho corporativo para empresas",
    description:
      "Orden juridico corporativo para empresas que buscan claridad ante socios, administradores e inversionistas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
