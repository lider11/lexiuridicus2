"use client";

import { FormEvent, useEffect, useState } from "react";
import type { BlogComment } from "@/types";

export function CommentSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function loadComments() {
    const response = await fetch(`/api/posts/${slug}/comments`);

    if (!response.ok) {
      return;
    }

    const payload = await response.json();
    setComments(payload.comments);
  }

  useEffect(() => {
    loadComments();
  }, [slug]);

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSending(true);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const response = await fetch(`/api/posts/${slug}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setIsSending(false);

    if (!response.ok) {
      const payload = await response.json();
      setError(payload.error || "No se pudo enviar el comentario.");
      return;
    }

    form.reset();
    setMessage("Comentario recibido. Lo revisaremos antes de publicarlo.");
  }

  return (
    <section className="comments-section">
      <div className="comments-heading">
        <span className="eyebrow">Conversacion</span>
        <h2>Comentarios</h2>
        <p>
          Comparte una pregunta o reflexion sobre este tema. Los comentarios se
          publican despues de revision.
        </p>
      </div>

      <div className="comments-layout">
        <div className="comments-list">
          {comments.length ? (
            comments.map((comment) => (
              <article className="comment-card" key={comment.id}>
                <div className="client-heading">
                  <strong>{comment.author_name}</strong>
                  <span className="meta">
                    {new Date(comment.created_at).toLocaleDateString("es-CO")}
                  </span>
                </div>
                <p>{comment.comment}</p>
              </article>
            ))
          ) : (
            <article className="comment-card">
              <strong>Aun no hay comentarios publicados.</strong>
              <p>Se el primero en abrir la conversacion sobre este articulo.</p>
            </article>
          )}
        </div>

        <form className="comment-form" onSubmit={submitComment}>
          <label>
            Nombre
            <input name="author_name" required placeholder="Tu nombre" />
          </label>
          <label>
            Correo
            <input
              name="author_email"
              required
              type="email"
              placeholder="tu@correo.com"
            />
          </label>
          <label>
            Comentario
            <textarea
              name="comment"
              required
              placeholder="Escribe tu comentario o pregunta"
            />
          </label>
          <button className="button" disabled={isSending} type="submit">
            {isSending ? "Enviando..." : "Enviar comentario"}
          </button>
          {message ? <div className="message">{message}</div> : null}
          {error ? <div className="error">{error}</div> : null}
        </form>
      </div>
    </section>
  );
}
