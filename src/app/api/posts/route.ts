import { query } from "@/lib/db";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import {
  badRequest,
  created,
  ok,
  serverError,
  validationError,
} from "@/lib/api-response";
import {
  CreatePostSchema,
  DeletePostSchema,
  UpdatePostStatusSchema,
} from "@/lib/validators/post.schema";
import type { BlogPost } from "@/types";

export async function GET(request: Request) {
  try {
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

    return ok({ posts });
  } catch (error) {
    return serverError("POSTS_GET_ERROR", error);
  }
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  try {
    const body = await request.json();
    const post = CreatePostSchema.parse(body);

    if (!post.slug) {
      return badRequest("Slug inválido.");
    }

    await query(
      `INSERT INTO blog_posts (title, slug, category, excerpt, content, author, status, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, IF(? = 'publicado', NOW(), NULL))`,
      [
        post.title,
        post.slug,
        post.category,
        post.excerpt,
        post.content,
        post.author,
        post.status,
        post.status,
      ],
    );

    return created();
  } catch (error) {
    return validationError(error) || serverError("POST_CREATE_ERROR", error);
  }
}

export async function PATCH(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  try {
    const body = await request.json();
    const payload = UpdatePostStatusSchema.parse(body);

    await query(
      `UPDATE blog_posts
       SET status = ?, published_at = CASE WHEN ? = 'publicado' AND published_at IS NULL THEN NOW() ELSE published_at END
       WHERE id = ?`,
      [payload.status, payload.status, payload.id],
    );

    return ok();
  } catch (error) {
    return validationError(error) || serverError("POST_UPDATE_ERROR", error);
  }
}

export async function DELETE(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  try {
    const { searchParams } = new URL(request.url);
    const payload = DeletePostSchema.parse({ id: searchParams.get("id") });

    await query("DELETE FROM blog_posts WHERE id = ?", [payload.id]);

    return ok();
  } catch (error) {
    return validationError(error) || serverError("POST_DELETE_ERROR", error);
  }
}
