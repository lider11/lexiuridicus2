import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { BlogPost } from "@/types";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const posts = await query<BlogPost[]>(
    `SELECT id, title, slug, excerpt, content, author, status, published_at, created_at
     FROM blog_posts
     WHERE slug = ? AND status = 'publicado'
     LIMIT 1`,
    [slug],
  );

  if (!posts.length) {
    return NextResponse.json(
      { error: "Articulo no encontrado." },
      { status: 404 },
    );
  }

  return NextResponse.json({ post: posts[0] });
}
