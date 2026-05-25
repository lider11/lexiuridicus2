"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/types";

const categories = [
  "Todos",
  "Tradicion de acciones",
  "Imagen empresarial",
  "Gobierno corporativo",
];

function readingMinutes(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

export function BlogFilterGrid({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredPosts = useMemo(
    () =>
      posts.filter(
        (post) =>
          activeCategory === "Todos" || post.category === activeCategory,
      ),
    [activeCategory, posts],
  );

  return (
    <div className="blog-browser">
      <div
        className="category-filter"
        aria-label="Filtrar articulos por categoria"
      >
        {categories.map((category) => (
          <button
            aria-pressed={activeCategory === category}
            key={category}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
      <div className="blog-grid">
        {filteredPosts.length ? (
          filteredPosts.map((post) => (
            <article className="post-card blog-card" key={post.id}>
              <div className="blog-card-top">
                <span className="status-pill">{post.category}</span>
              </div>
              <div className="article-meta compact-meta">
                <span>{post.author}</span>
                <span>
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString("es-CO")
                    : "Sin fecha"}
                </span>
                <span>{readingMinutes(post.content)} min de lectura</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className="blog-card-footer">
                <Link
                  className="ghost-button compact-button"
                  href={`/blog/${post.slug}`}
                >
                  Leer articulo
                </Link>
              </div>
            </article>
          ))
        ) : (
          <article className="post-card">
            <h2>No hay articulos en esta categoria</h2>
            <p>Pronto publicaremos mas contenido para este tema.</p>
          </article>
        )}
      </div>
    </div>
  );
}
