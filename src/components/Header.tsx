import Link from "next/link";

export function Header() {
  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <span className="brand-mark">
          <span>LX</span>
        </span>
        <span className="brand-copy">
          <strong>Lexiuridicus</strong>
          <small>Derecho corporativo para empresas</small>
        </span>
      </Link>
      <nav className="nav" aria-label="Principal">
        <Link href="/#servicios">Servicios</Link>
        <Link href="/#proceso">Metodo</Link>
        <Link href="/#para-quien">Para quien es</Link>
        <Link href="/blog">Blog</Link>
        <span className="nav-divider" aria-hidden="true" />
        <Link className="nav-admin" href="/admin">Admin</Link>
        <Link className="nav-cta" href="/#consulta">Solicitar diagnostico</Link>
      </nav>
    </header>
  );
}
