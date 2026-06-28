"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

export function FloatingWhatsApp() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      className="floating-whatsapp"
      href={siteConfig.whatsappHref}
      aria-label="Hablar por WhatsApp con Lex Iuridicus"
    >
      WhatsApp
    </a>
  );
}
