"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { MobileHeader } from "@/components/MobileHeader";
import { servicePages } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
<<<<<<< Updated upstream
    <>
      <header className="topbar">
        <BrandLogo />
        <nav className="nav" aria-label="Principal">
          <div className="nav-service-group">
            <Link className="nav-service-root" href="/#servicios">
              Servicios
            </Link>
            <div className="nav-service-menu" aria-label="Servicios principales">
              {servicePages.slice(0, 6).map((service) => (
                <Link key={service.slug} href={`/servicios/${service.slug}`}>
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/metodo">Metodo</Link>
          <Link href="/para-quien-es">Para quien es</Link>
          <Link href="/sobre-lex-iuridicus">Sobre</Link>
          <Link href="/blog">Blog</Link>
          <span className="nav-divider" aria-hidden="true" />
          <Link className="nav-admin" href="/admin">
            Admin
          </Link>
          <Link className="nav-cta" href="/#consulta">
            Solicitar diagnostico
          </Link>
          <a className="nav-whatsapp" href={siteConfig.whatsappHref}>
            WhatsApp
          </a>
        </nav>
      </header>
      <MobileHeader />
    </>
=======
    <header className="topbar">
      <BrandLogo />
      <div className="mobile-header-actions">
        <Link className="mobile-cta" href="/#consulta" onClick={closeMenu}>
          Diagnostico
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span aria-hidden="true" />
          <span className="sr-only">Abrir menu principal</span>
        </button>
      </div>
      <nav
        className="nav"
        id="primary-navigation"
        aria-label="Principal"
        data-open={isMenuOpen}
      >
        <div className="nav-service-group">
          <Link className="nav-service-root" href="/#servicios" onClick={closeMenu}>
            Servicios
          </Link>
          <div className="nav-service-menu" aria-label="Servicios principales">
            {servicePages.slice(0, 6).map((service) => (
              <Link
                key={service.slug}
                href={`/servicios/${service.slug}`}
                onClick={closeMenu}
              >
                {service.title}
              </Link>
            ))}
          </div>
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
        <span className="nav-divider" aria-hidden="true" />
        <Link className="nav-admin" href="/admin" onClick={closeMenu}>
          Admin
        </Link>
        <Link className="nav-cta" href="/#consulta" onClick={closeMenu}>
          Solicitar diagnostico
        </Link>
        <a className="nav-whatsapp" href={siteConfig.whatsappHref} onClick={closeMenu}>
          WhatsApp
        </a>
      </nav>
    </header>
>>>>>>> Stashed changes
  );
}
