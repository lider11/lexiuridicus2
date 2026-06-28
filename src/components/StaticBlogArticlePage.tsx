import Link from "next/link";
import { Header } from "@/components/Header";
import type { StaticBlogArticle } from "@/lib/blog-static";

export function StaticBlogArticlePage({
  article,
}: {
  article: StaticBlogArticle;
}) {
  return (
    <main className="site-shell">
      <Header />
      <section className="article-hero">
        <div>
          <span className="eyebrow">{article.category}</span>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
        </div>
      </section>

      <article className="article">
        <div className="article-meta">
          <span>Lex Iuridicus</span>
          <span>Biblioteca juridica empresarial</span>
          <span>{article.category}</span>
        </div>

        {article.sections.map((section) => (
          <section key={section.heading} className="article-section-block">
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </article>

      <section className="section final-cta">
        <div>
          <span className="eyebrow">CTA juridico</span>
          <h2>Convierte esta lectura en una decision empresarial concreta.</h2>
          <p>
            Solicita una valoracion inicial para entender como este riesgo puede
            afectar a tu empresa.
          </p>
        </div>
        <Link className="button final-cta-button" href={article.serviceHref}>
          {article.serviceLabel}
        </Link>
      </section>
    </main>
  );
}
