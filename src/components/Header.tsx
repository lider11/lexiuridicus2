import Link from "next/link";

export function Header() {
  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <span className="brand-mark">
          <span>LX</span>
        </span>
        <span className="brand-copy">
          <strong>lexiuridicus</strong>
          <small>Seriedad, claridad, decisiones</small>
        </span>
      </Link>
      <nav className="nav" aria-label="Principal">
        <div className="nav-service-group">
          <Link className="nav-service-root" href="/#servicios">
            Servicios
          </Link>
          <div className="nav-service-menu" aria-label="Servicios principales">
            <Link href="/servicios/tradicion-de-acciones">
              Tradicion de acciones
            </Link>
            <Link href="/servicios/imagen-empresarial">
              Imagen empresarial
            </Link>
            <Link href="/servicios/gobierno-corporativo">
              Gobierno corporativo
            </Link>
          </div>
        </div>
        <Link href="/metodo">Metodo</Link>
        <Link href="/para-quien-es">Para quien es</Link>
        <Link href="/blog">Blog</Link>
        <span className="nav-divider" aria-hidden="true" />
        <Link className="nav-admin" href="/admin">
          Admin
        </Link>
        <Link className="nav-cta" href="/#consulta">
          Solicitar diagnostico
        </Link>
      </nav>
    </header>
  );
}
