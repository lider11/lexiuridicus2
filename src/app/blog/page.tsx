import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { BlogFilterGrid } from "@/components/BlogFilterGrid";
import { query } from "@/lib/db";
import type { BlogPost } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog Lexiuridicus | Biblioteca empresarial",
  description:
    "Guias sobre tradicion de acciones, imagen empresarial y gobierno corporativo para empresarios y sociedades.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog Lexiuridicus | Biblioteca empresarial",
    description:
      "Contenido practico para ordenar sociedades, acciones y confianza corporativa.",
    url: "/blog",
    type: "website",
  },
};

async function getPosts() {
  try {
    return await query<BlogPost[]>(
      `SELECT id, title, slug, category, excerpt, content, author, status, published_at, created_at
       FROM blog_posts
       WHERE status = 'publicado'
       ORDER BY COALESCE(published_at, created_at) DESC`,
    );
  } catch {
    return [];
  }
}

const coreTopics = [
  {
    category: "Tradicion de acciones",
    excerpt:
      "Lecturas para entender titularidad, trazabilidad y riesgos en la propiedad accionaria.",
    href: "/blog/por-que-la-tradicion-de-acciones-importa-en-una-sociedad",
  },
  {
    category: "Imagen empresarial",
    excerpt:
      "Guias para presentar la empresa con mayor claridad ante inversionistas, aliados o compradores.",
    href: "/blog/como-preparar-la-empresa-para-inversionistas",
  },
  {
    category: "Gobierno corporativo",
    excerpt:
      "Contenido sobre reglas, roles y decisiones internas para empresas en crecimiento.",
    href: "/blog/gobierno-corporativo-para-empresas-en-crecimiento",
  },
];

export default async function BlogPage() {
  const posts = await getPosts();
  const featuredPost = posts[0];
  const remainingPosts = featuredPost ? posts.slice(1) : posts;

  return (
    <main className="site-shell">
      <Header />
      <section className="blog-hero">
        <div className="blog-hero-copy">
          <span className="eyebrow">Biblioteca empresarial</span>
          <h1>
            Lecturas para ordenar tu empresa antes de una decision importante.
          </h1>
          <p>
            Guias practicas sobre acciones, imagen empresarial y gobierno
            corporativo para empresarios que quieren anticipar riesgos, preparar
            conversaciones y proyectar confianza.
          </p>
          <div
            className="service-pills blog-category-pills"
            aria-label="Categorias del blog"
          >
            {coreTopics.map((topic) => (
              <Link key={topic.category} href={topic.href}>
                {topic.category}
              </Link>
            ))}
          </div>
          <div className="hero-actions">
            <Link className="button" href="/#consulta">
              Solicitar diagnostico
            </Link>
            <Link className="ghost-button" href="#articulos">
              Ver articulos
            </Link>
          </div>
        </div>
        {featuredPost ? (
          <article className="featured-post">
            <span className="status-pill">{featuredPost.category}</span>
            <h2>{featuredPost.title}</h2>
            <p>{featuredPost.excerpt}</p>
            <Link className="ghost-button" href={`/blog/${featuredPost.slug}`}>
              Leer destacado
            </Link>
          </article>
        ) : null}
      </section>
      <section className="section topics-section">
        <div className="section-heading">
          <span className="eyebrow">Temas principales</span>
          <h2>Tres rutas para entender mejor tu empresa</h2>
        </div>
        <div className="topic-grid">
          {coreTopics.map((topic) => (
            <article key={topic.category}>
              <strong>{topic.category}</strong>
              <p>{topic.excerpt}</p>
              <Link className="related-link" href={topic.href}>
                Leer articulo
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="section" id="articulos">
        <div className="section-heading">
          <span className="eyebrow">Articulos recientes</span>
          <h2>Contenido para decisiones societarias mejor informadas</h2>
        </div>
        <BlogFilterGrid posts={posts} />
      </section>
      <section className="section final-cta">
        <div>
          <span className="eyebrow">De la lectura a la accion</span>
          <h2>
            Si identificaste un riesgo en tu empresa, conviene diagnosticarlo
            antes de que crezca.
          </h2>
          <p>
            Podemos ayudarte a priorizar acciones, imagen empresarial o gobierno
            corporativo segun tu situacion.
          </p>
        </div>
        <Link className="button final-cta-button" href="/#consulta">
          Solicitar diagnostico
        </Link>
      </section>
    </main>
  );
}
