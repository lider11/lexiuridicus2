import type { BlogComment, CommentStatus } from "@/types";

type CommentStatsModel = {
  total: number;
  pendientes: number;
  aprobados: number;
  rechazados: number;
};

type CommentPanelProps = {
  comments: BlogComment[];
  commentStats: CommentStatsModel;
  onUpdateCommentStatus: (id: number, status: CommentStatus) => void;
  onDeleteComment: (id: number) => void;
};

export function CommentPanel({
  comments,
  commentStats,
  onUpdateCommentStatus,
  onDeleteComment,
}: CommentPanelProps) {
  return (
    <section className="admin-panel stack">
      <div
        className="admin-stats comments-stats"
        aria-label="Resumen de comentarios"
      >
        <div className="priority-stat">
          <span>Pendientes</span>
          <strong>{commentStats.pendientes}</strong>
        </div>

        <div className="priority-stat">
          <span>Aprobados</span>
          <strong>{commentStats.aprobados}</strong>
        </div>

        <div className="priority-stat">
          <span>Rechazados</span>
          <strong>{commentStats.rechazados}</strong>
        </div>

        <div className="priority-stat">
          <span>Total</span>
          <strong>{commentStats.total}</strong>
        </div>
      </div>

      <div>
        <span className="eyebrow">Comentarios</span>
        <h2>Moderacion de comentarios</h2>
      </div>

      <div className="stack">
        {comments.length ? (
          comments.map((comment) => (
            <article className="client-row" key={comment.id}>
              <div className="client-heading">
                <div>
                  <strong>{comment.author_name}</strong>
                  <span className="meta">
                    {comment.author_email} | {comment.status}
                  </span>
                  <span className="meta">Articulo: {comment.post_title}</span>
                </div>

                <select
                  aria-label={`Estado del comentario de ${comment.author_name}`}
                  onChange={(event) =>
                    onUpdateCommentStatus(
                      comment.id,
                      event.target.value as CommentStatus,
                    )
                  }
                  value={comment.status}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="aprobado">Aprobado</option>
                  <option value="rechazado">Rechazado</option>
                </select>
              </div>

              <p>{comment.comment}</p>

              <div className="panel-actions">
                <button
                  className="danger-button compact-button"
                  onClick={() => onDeleteComment(comment.id)}
                  type="button"
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))
        ) : (
          <p>No hay comentarios registrados.</p>
        )}
      </div>
    </section>
  );
}
