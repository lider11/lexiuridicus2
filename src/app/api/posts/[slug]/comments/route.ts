import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { isRateLimited, requestIp } from "@/lib/rateLimit";
import type { BlogComment, BlogPost } from "@/types";

type Params = {
  params: Promise<{ slug: string }>;
};

async function findPost(slug: string) {
  const posts = await query<BlogPost[]>(
    "SELECT id, title, slug, category, excerpt, content, author, status, published_at, created_at FROM blog_posts WHERE slug = ? LIMIT 1",
    [slug]
  );
  return posts[0] ?? null;
}

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const post = await findPost(slug);

  if (!post) {
    return NextResponse.json({ error: "Articulo no encontrado." }, { status: 404 });
  }

  const comments = await query<BlogComment[]>(
    `SELECT id, post_id, author_name, author_email, comment, status, created_at
     FROM blog_comments
     WHERE post_id = ? AND status = 'aprobado'
     ORDER BY created_at DESC`,
    [post.id]
  );

  return NextResponse.json({ comments });
}

export async function POST(request: Request, { params }: Params) {
  if (isRateLimited(`comment:${requestIp(request)}`, 5, 60_000)) {
    return NextResponse.json({ error: "Demasiados comentarios. Intenta de nuevo en un minuto." }, { status: 429 });
  }

  const { slug } = await params;
  const post = await findPost(slug);

  if (!post) {
    return NextResponse.json({ error: "Articulo no encontrado." }, { status: 404 });
  }

  const body = await request.json();
  const authorName = String(body.author_name || "").trim();
  const authorEmail = String(body.author_email || "").trim();
  const comment = String(body.comment || "").trim();

  if (!authorName || !authorEmail || !comment) {
    return NextResponse.json({ error: "Nombre, correo y comentario son obligatorios." }, { status: 400 });
  }

  if (authorName.length > 140 || authorEmail.length > 180 || comment.length > 1500) {
    return NextResponse.json({ error: "El comentario supera la longitud permitida." }, { status: 400 });
  }

  await query(
    "INSERT INTO blog_comments (post_id, author_name, author_email, comment, status) VALUES (?, ?, ?, ?, 'pendiente')",
    [post.id, authorName, authorEmail, comment]
  );

  return NextResponse.json({ ok: true, message: "Comentario recibido y pendiente de revision." }, { status: 201 });
}
