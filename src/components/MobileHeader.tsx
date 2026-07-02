"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { servicePages } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="mobile-topbar" data-open={isOpen}>
      <div className="mobile-topbar-row">
        <BrandLogo />
        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          className="mobile-menu-toggle"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          <span className="sr-only">
            {isOpen ? "Cerrar menu principal" : "Abrir menu principal"}
          </span>
          <span aria-hidden="true">{isOpen ? "Cerrar" : "Menu"}</span>
        </button>
      </div>

      <nav
        className="mobile-nav"
        hidden={!isOpen}
        id="mobile-navigation"
        aria-label="Principal movil"
      >
        <Link href="/#servicios" onClick={closeMenu}>
          Servicios
        </Link>
        <div className="mobile-service-links" aria-label="Servicios principales">
          {servicePages.map((service) => (
            <Link
              href={`/servicios/${service.slug}`}
              key={service.slug}
              onClick={closeMenu}
            >
              {service.title}
            </Link>
          ))}
        </div>
        <Link href="/metodo" onClick={closeMenu}>
          Metodo
        </Link>
        <Link href="/para-quien-es" onClick={closeMenu}>
          Para quien es
        </Link>
        <Link href="/sobre-lex-iuridicus" onClick={closeMenu}>
          Sobre
        </Link>
        <Link href="/blog" onClick={closeMenu}>
          Blog
        </Link>
        <Link className="mobile-admin-link" href="/admin" onClick={closeMenu}>
          Admin
        </Link>
        <Link className="mobile-primary-link" href="/#consulta" onClick={closeMenu}>
          Solicitar diagnostico
        </Link>
        <a className="mobile-whatsapp-link" href={siteConfig.whatsappHref} onClick={closeMenu}>
          WhatsApp
        </a>
      </nav>
    </header>
  );
}
