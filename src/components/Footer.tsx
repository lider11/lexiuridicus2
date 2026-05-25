import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="brand-mark">
          <span>LX</span>
        </span>
        <div>
          <strong>Lexiuridicus</strong>
          <p>Derecho corporativo para empresas, socios e inversionistas.</p>
        </div>
      </div>

      <div className="footer-grid">
        <div>
          <h3>Contacto</h3>
          <p>Direccion: Calle 100 # 15-20, Bogota, Colombia</p>
          <p>Telefono: +57 300 000 0000</p>
          <p>Correo: contacto@lexiuridicus.com</p>
        </div>
        <div>
          <h3>Servicios</h3>
          <Link href="/#servicios">Tradicion de acciones</Link>
          <Link href="/#servicios">Imagen empresarial</Link>
          <Link href="/#servicios">Gobierno corporativo</Link>
        </div>
        <div>
          <h3>Redes sociales</h3>
          <div className="social-links">
            <a href="https://www.linkedin.com" rel="noreferrer" target="_blank" aria-label="LinkedIn">
              <span aria-hidden="true">in</span>
              LinkedIn
            </a>
            <a href="https://www.instagram.com" rel="noreferrer" target="_blank" aria-label="Instagram">
              <span aria-hidden="true">ig</span>
              Instagram
            </a>
            <a href="https://www.facebook.com" rel="noreferrer" target="_blank" aria-label="Facebook">
              <span aria-hidden="true">f</span>
              Facebook
            </a>
            <a href="https://www.pinterest.com" rel="noreferrer" target="_blank" aria-label="Pinterest">
              <span aria-hidden="true">p</span>
              Pinterest
            </a>
            <a href="https://www.tiktok.com" rel="noreferrer" target="_blank" aria-label="TikTok">
              <span aria-hidden="true">tt</span>
              TikTok
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Lexiuridicus. Todos los derechos reservados.</span>
        <Link href="/#consulta">Solicitar diagnostico</Link>
      </div>
    </footer>
  );
}
