import { ZodError } from "zod";
import { query } from "@/lib/db";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { ok, serverError, validationError } from "@/lib/api-response";
import {
  DeleteCommentSchema,
  UpdateCommentStatusSchema,
} from "@/lib/validators/comment.schema";
import type { BlogComment } from "@/types";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  try {
    const comments = await query<BlogComment[]>(
      `SELECT c.id, c.post_id, p.title AS post_title, p.slug AS post_slug, c.author_name, c.author_email,
         c.comment, c.status, c.created_at
       FROM blog_comments c
       INNER JOIN blog_posts p ON p.id = c.post_id
       ORDER BY c.created_at DESC`,
    );

    return ok({ comments });
  } catch (error) {
    return serverError("COMMENTS_GET_ERROR", error);
  }
}

export async function PATCH(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  try {
    const body = await request.json();
    const payload = UpdateCommentStatusSchema.parse(body);

    await query("UPDATE blog_comments SET status = ? WHERE id = ?", [
      payload.status,
      payload.id,
    ]);

    return ok();
  } catch (error) {
    if (error instanceof ZodError) {
      return validationError(error);
    }

    return serverError("COMMENT_UPDATE_ERROR", error);
  }
}

export async function DELETE(request: Request) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  try {
    const { searchParams } = new URL(request.url);
    const payload = DeleteCommentSchema.parse({ id: searchParams.get("id") });

    await query("DELETE FROM blog_comments WHERE id = ?", [payload.id]);

    return ok();
  } catch (error) {
    if (error instanceof ZodError) {
      return validationError(error);
    }

    return serverError("COMMENT_DELETE_ERROR", error);
  }
}
