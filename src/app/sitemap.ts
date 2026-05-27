import type { MetadataRoute } from "next";
import { query } from "@/lib/db";
import { servicePages } from "@/lib/services";
import { siteConfig } from "@/lib/site";

type PublishedPost = {
  slug: string;
  published_at: string | null;
  created_at: string;
};

async function getPublishedPosts() {
  try {
    return await query<PublishedPost[]>(
      `SELECT slug, published_at, created_at
       FROM blog_posts
       WHERE status = 'publicado'
       ORDER BY COALESCE(published_at, created_at) DESC`,
    );
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages = [
    {
      path: "/",
      priority: 1,
    },
    {
      path: "/metodo",
      priority: 0.85,
    },
    {
      path: "/para-quien-es",
      priority: 0.85,
    },
    {
      path: "/blog",
      priority: 0.75,
    },
    {
      path: "/politica-de-datos",
      priority: 0.35,
    },
  ];
  const serviceEntries = servicePages.map((service) => ({
    url: `${siteConfig.url}/servicios/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));
  const posts = await getPublishedPosts();
  const postEntries = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.published_at ?? post.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...pages.map((page) => ({
      url: `${siteConfig.url}${page.path}`,
      lastModified: now,
      changeFrequency:
        page.path === "/blog" ? ("weekly" as const) : ("monthly" as const),
      priority: page.priority,
    })),
    ...serviceEntries,
    ...postEntries,
  ];
}
