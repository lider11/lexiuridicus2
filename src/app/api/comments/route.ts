import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { allowedCommentStatuses } from "@/lib/constants";
import type { BlogComment, CommentStatus } from "@/types";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  const comments = await query<BlogComment[]>(
    `SELECT c.id, c.post_id, p.title AS post_title, p.slug AS post_slug, c.author_name, c.author_email,
       c.comment, c.status, c.created_at
     FROM blog_comments c
     INNER JOIN blog_posts p ON p.id = c.post_id
     ORDER BY c.created_at DESC`,
  );

  return NextResponse.json({ comments });
}

export async function PATCH(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  const body = await request.json();
  const id = Number(body.id);
  const status = String(body.status || "") as CommentStatus;

  if (!id || !allowedCommentStatuses.includes(status)) {
    return NextResponse.json(
      { error: "Comentario o estado invalido." },
      { status: 400 },
    );
  }

  await query("UPDATE blog_comments SET status = ? WHERE id = ?", [status, id]);

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));

  if (!id) {
    return NextResponse.json(
      { error: "Comentario invalido." },
      { status: 400 },
    );
  }

  await query("DELETE FROM blog_comments WHERE id = ?", [id]);

  return NextResponse.json({ ok: true });
}
