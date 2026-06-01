import type { FormEvent } from "react";
import type { BlogPost } from "@/types";

type BlogPanelProps = {
  posts: BlogPost[];
  onCreatePost: (event: FormEvent<HTMLFormElement>) => void;
  onUpdatePostStatus: (id: number, status: "borrador" | "publicado") => void;
  onDeletePost: (id: number, title: string) => void;
};

export function BlogPanel({
  posts,
  onCreatePost,
  onUpdatePostStatus,
  onDeletePost,
}: BlogPanelProps) {
  return (
    <section className="admin-panel stack">
      <div>
        <span className="eyebrow">Blog</span>
        <h2>Nuevo articulo</h2>
      </div>

      <form className="form-grid" onSubmit={onCreatePost}>
        <label>
          Titulo
          <input name="title" required placeholder="Titulo del articulo" />
        </label>

        <label>
          Categoria
          <select name="category" defaultValue="Gobierno corporativo">
            <option value="Gobierno corporativo">Gobierno corporativo</option>
            <option value="Tradicion de acciones">Tradicion de acciones</option>
            <option value="Imagen empresarial">Imagen empresarial</option>
          </select>
        </label>

        <label>
          Resumen
          <textarea name="excerpt" required placeholder="Resumen corto" />
        </label>

        <label>
          Contenido
          <textarea
            name="content"
            required
            placeholder="Contenido del articulo"
          />
        </label>

        <label>
          Autor
          <input name="author" placeholder="Lexiuridicus" />
        </label>

        <label>
          Estado
          <select name="status" defaultValue="borrador">
            <option value="borrador">Borrador</option>
            <option value="publicado">Publicado</option>
          </select>
        </label>

        <button className="button" type="submit">
          Crear articulo
        </button>
      </form>

      <div className="stack">
        {posts.length ? (
          posts.map((post) => (
            <article className="client-row" key={post.id}>
              <div className="client-heading">
                <div>
                  <strong>{post.title}</strong>
                  <span className="meta">
                    {post.category} | {post.status}
                  </span>
                </div>

                <div className="panel-actions">
                  <button
                    className="ghost-button compact-button"
                    onClick={() =>
                      onUpdatePostStatus(
                        post.id,
                        post.status === "publicado" ? "borrador" : "publicado",
                      )
                    }
                    type="button"
                  >
                    {post.status === "publicado"
                      ? "Pasar a borrador"
                      : "Publicar"}
                  </button>

                  <button
                    className="danger-button compact-button"
                    onClick={() => onDeletePost(post.id, post.title)}
                    type="button"
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              <p>{post.excerpt}</p>
            </article>
          ))
        ) : (
          <p>No hay articulos creados todavia.</p>
        )}
      </div>
    </section>
  );
}
