import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { MobileHeader } from "@/components/MobileHeader";
import { servicePages } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export function Header() {
  return (
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
  );
}
