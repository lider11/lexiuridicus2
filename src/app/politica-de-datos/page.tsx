import { Header } from "@/components/Header";

export default function PoliticaDeDatosPage() {
  return (
    <main className="site-shell">
      <Header />

      <section className="section legal-page">
        <div className="section-heading">
          <span className="eyebrow">Protección de datos personales</span>
          <h1>Política de tratamiento de datos personales</h1>
          <p>
            Esta política informa cómo Lexiuridicus recolecta, usa, conserva y
            protege los datos personales suministrados a través de sus
            formularios digitales.
          </p>
        </div>

        <article className="legal-content">
          <h2>1. Responsable del tratamiento</h2>
          <p>
            Lexiuridicus será responsable del tratamiento de los datos
            personales suministrados por usuarios, clientes potenciales y
            contactos empresariales.
          </p>

          <h2>2. Datos recolectados</h2>
          <p>
            Podremos recolectar nombre, correo electrónico, teléfono, empresa,
            cargo, necesidad jurídica, información societaria básica y
            observaciones suministradas voluntariamente por el titular.
          </p>

          <h2>3. Finalidades</h2>
          <p>
            Los datos serán tratados para analizar solicitudes de servicios
            jurídicos, contactar al solicitante, realizar diagnósticos
            iniciales, gestionar relaciones comerciales y conservar trazabilidad
            administrativa de las consultas recibidas.
          </p>

          <h2>4. Derechos del titular</h2>
          <p>
            El titular podrá conocer, actualizar, rectificar, solicitar
            supresión de sus datos y revocar la autorización, conforme a la
            legislación colombiana aplicable.
          </p>

          <h2>5. Seguridad de la información</h2>
          <p>
            Se adoptan medidas técnicas y administrativas razonables para
            proteger la información contra acceso no autorizado, pérdida,
            alteración o uso indebido.
          </p>

          <h2>6. Conservación</h2>
          <p>
            Los datos se conservarán durante el tiempo necesario para cumplir
            las finalidades informadas, atender obligaciones legales o resolver
            solicitudes del titular.
          </p>

          <h2>7. Canal de contacto</h2>
          <p>
            Las consultas o solicitudes sobre datos personales podrán enviarse
            al canal de contacto informado por Lexiuridicus en sus medios
            oficiales.
          </p>
        </article>
      </section>
    </main>
  );
}
