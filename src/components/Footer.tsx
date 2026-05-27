import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="brand-mark">
          <span>LX</span>
        </span>
        <div>
          <strong>lexiuridicus</strong>
          <p>Seriedad, claridad y decisiones para empresas en crecimiento.</p>
        </div>
      </div>

      <div className="footer-grid">
        <div>
          <h3>Contacto</h3>
          <p>
            Direccion: Calle 77B No 57- 103 local 1 Barranquilla, Atlantico,
            Colombia
          </p>
          <p>Telefono: +57 3012370047</p>
          <p>Correo: contacto@lexiuridicus.com</p>
        </div>
        <div>
          <h3>Servicios</h3>
          <Link href="/servicios/tradicion-de-acciones">
            Tradicion de acciones
          </Link>
          <Link href="/servicios/imagen-empresarial">Imagen empresarial</Link>
          <Link href="/servicios/gobierno-corporativo">
            Gobierno corporativo
          </Link>
        </div>
        <div>
          <h3>Redes sociales</h3>
          <div className="social-links">
            <span className="social-placeholder" aria-label="LinkedIn">
              <span aria-hidden="true">in</span>
              LinkedIn
            </span>
            <span className="social-placeholder" aria-label="Instagram">
              <span aria-hidden="true">ig</span>
              Instagram
            </span>
            <span className="social-placeholder" aria-label="Facebook">
              <span aria-hidden="true">f</span>
              Facebook
            </span>
            <span className="social-placeholder" aria-label="Pinterest">
              <span aria-hidden="true">p</span>
              Pinterest
            </span>
            <span className="social-placeholder" aria-label="TikTok">
              <span aria-hidden="true">tt</span>
              TikTok
            </span>
          </div>
          <p className="footer-note">Perfiles oficiales en preparacion.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>(c) 2026 Lexiuridicus. Todos los derechos reservados.</span>
        <Link href="/#consulta">Solicitar diagnostico</Link>
      </div>
    </footer>
  );
}
