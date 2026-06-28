import Link from "next/link";
import { servicePages } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="brand-mark">
          <span>LX</span>
        </span>
        <div>
          <strong>Lex Iuridicus</strong>
          <p>
            Inteligencia juridica para empresas que crecen con seriedad,
            claridad y mejores decisiones.
          </p>
        </div>
      </div>

      <div className="footer-grid legal-footer-grid">
        <div>
          <h3>Contacto</h3>
          <p>Barranquilla, Atlantico, Colombia</p>
          <p>Telefono: {siteConfig.phone}</p>
          <p>Correo: {siteConfig.email}</p>
          <a href={siteConfig.whatsappHref}>Hablar por WhatsApp</a>
        </div>

        <div>
          <h3>Servicios juridicos</h3>
          {servicePages.slice(0, 6).map((service) => (
            <Link key={service.slug} href={`/servicios/${service.slug}`}>
              {service.title}
            </Link>
          ))}
        </div>

        <div>
          <h3>Firma</h3>
          <Link href="/sobre-lex-iuridicus">Sobre Lex Iuridicus</Link>
          <Link href="/metodo">Metodo de trabajo</Link>
          <Link href="/para-quien-es">Para quien es</Link>
          <Link href="/blog">Biblioteca juridica</Link>
          <Link href="/#checklist">Checklist juridico para empresas</Link>
        </div>

        <div>
          <h3>Legal</h3>
          <Link href="/politica-de-datos">Politica de privacidad</Link>
          <Link href="/politica-de-datos">Tratamiento de datos personales</Link>
          <Link href="/#consulta">Solicitar diagnostico juridico</Link>
          <p className="footer-note">
            La informacion del sitio es general y no constituye asesoria
            juridica ni crea relacion abogado-cliente.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>(c) 2026 Lex Iuridicus. Todos los derechos reservados.</span>
        <span>Barranquilla, Colombia</span>
      </div>
    </footer>
  );
}
