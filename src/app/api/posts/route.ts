import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { allowedPostCategories } from "@/lib/constants";
import { slugify } from "@/lib/validators";
import type { BlogPost } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeDrafts = searchParams.get("drafts") === "true";

  if (includeDrafts && !isAdminRequest(request)) {
    return unauthorized();
  }

  const where = includeDrafts ? "" : "WHERE status = 'publicado'";

  const posts = await query<BlogPost[]>(
    `SELECT id, title, slug, category, excerpt, content, author, status, published_at, created_at
     FROM blog_posts
     ${where}
     ORDER BY COALESCE(published_at, created_at) DESC`,
  );

  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  const body = await request.json();
  const title = String(body.title || "").trim();
  const rawCategory = String(body.category || "Gobierno corporativo").trim();
  const category = allowedPostCategories.includes(
    rawCategory as (typeof allowedPostCategories)[number],
  )
    ? rawCategory
    : "Gobierno corporativo";
  const excerpt = String(body.excerpt || "").trim();
  const content = String(body.content || "").trim();
  const author = String(body.author || "Lexiuridicus").trim();
  const status = body.status === "publicado" ? "publicado" : "borrador";
  const slug = slugify(String(body.slug || title));

  if (!title || !excerpt || !content || !slug) {
    return NextResponse.json(
      { error: "Titulo, resumen y contenido son obligatorios." },
      { status: 400 },
    );
  }

  await query(
    `INSERT INTO blog_posts (title, slug, category, excerpt, content, author, status, published_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, IF(? = 'publicado', NOW(), NULL))`,
    [title, slug, category, excerpt, content, author, status, status],
  );

  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  const body = await request.json();
  const id = Number(body.id);
  const status =
    body.status === "publicado"
      ? "publicado"
      : body.status === "borrador"
        ? "borrador"
        : "";

  if (!id || !status) {
    return NextResponse.json(
      { error: "Articulo o estado invalido." },
      { status: 400 },
    );
  }

  await query(
    `UPDATE blog_posts
     SET status = ?, published_at = CASE WHEN ? = 'publicado' AND published_at IS NULL THEN NOW() ELSE published_at END
     WHERE id = ?`,
    [status, status, id],
  );

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));

  if (!id) {
    return NextResponse.json({ error: "Articulo invalido." }, { status: 400 });
  }

  await query("DELETE FROM blog_posts WHERE id = ?", [id]);

  return NextResponse.json({ ok: true });
}
