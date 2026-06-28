import Link from "next/link";

type BrandLogoProps = {
  href?: string;
};

function BrandContent() {
  return (
    <>
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-pillar">I</span>
      </span>
      <span className="brand-copy">
        <strong>LEX IURIDICUS</strong>
        <small>Inteligencia juridica para empresas</small>
      </span>
    </>
  );
}

export function BrandLogo({ href = "/" }: BrandLogoProps) {
  if (!href) {
    return (
      <span className="brand">
        <BrandContent />
      </span>
    );
  }

  return (
    <Link className="brand" href={href}>
      <BrandContent />
    </Link>
  );
}
