import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { CommentSection } from "@/components/CommentSection";
import { query } from "@/lib/db";
import type { BlogPost } from "@/types";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string) {
  try {
    const posts = await query<BlogPost[]>(
      `SELECT id, title, slug, category, excerpt, content, author, status, published_at, created_at
       FROM blog_posts
       WHERE slug = ? AND status = 'publicado'
       LIMIT 1`,
      [slug],
    );
    return posts[0] ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Articulo no encontrado | Lexiuridicus",
    };
  }

  return {
    title: `${post.title} | Lexiuridicus`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.published_at || undefined,
      authors: [post.author],
    },
  };
}

function readingMinutes(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="site-shell">
      <Header />
      <section className="article-hero">
        <div>
          <span className="eyebrow">{post.category}</span>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </div>
      </section>
      <article className="article">
        <div className="article-meta">
          <span>{post.author}</span>
          <span>
            {post.published_at
              ? new Date(post.published_at).toLocaleDateString("es-CO")
              : "Sin fecha"}
          </span>
          <span>{readingMinutes(post.content)} min de lectura</span>
        </div>
        {post.content.split("\n").map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
      <CommentSection slug={post.slug} />
      <section className="section final-cta">
        <div>
          <span className="eyebrow">Diagnostico empresarial</span>
          <h2>Convierte esta lectura en una ruta de accion para tu empresa.</h2>
          <p>
            Revisemos si este tema aplica a tu estructura societaria, accionaria
            o de gobierno.
          </p>
        </div>
        <Link className="button final-cta-button" href="/#consulta">
          Solicitar diagnostico
        </Link>
      </section>
    </main>
  );
}
