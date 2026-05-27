"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminTabs } from "@/components/admin/AdminTabs";
import type { AdminTab } from "@/components/admin/admin.types";
import type {
  BlogComment,
  BlogPost,
  Client,
  ClientStatus,
  CommentStatus,
} from "@/types";

const statusOptions: { label: string; value: ClientStatus | "todos" }[] = [
  { label: "Todos", value: "todos" },
  { label: "Nuevo", value: "nuevo" },
  { label: "Contactado", value: "contactado" },
  { label: "En proceso", value: "en_proceso" },
  { label: "Cerrado", value: "cerrado" },
];

export function AdminDashboard() {
  const [adminToken, setAdminToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [draftNotes, setDraftNotes] = useState<Record<number, string>>({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("clientes");
  const [statusFilter, setStatusFilter] = useState<ClientStatus | "todos">(
    "todos",
  );
  const [search, setSearch] = useState("");

  const adminHeaders = {
    "Content-Type": "application/json",
    "x-admin-token": adminToken,
  };

  async function loadData() {
    if (!adminToken) {
      return;
    }

    setError("");
    try {
      const [clientsResponse, postsResponse, commentsResponse] =
        await Promise.all([
          fetch("/api/clients", { headers: { "x-admin-token": adminToken } }),
          fetch("/api/posts?drafts=true", {
            headers: { "x-admin-token": adminToken },
          }),
          fetch("/api/comments", { headers: { "x-admin-token": adminToken } }),
        ]);

      if (
        [clientsResponse, postsResponse, commentsResponse].some(
          (response) => response.status === 401,
        )
      ) {
        window.localStorage.removeItem("lexiuridicus_admin_token");
        setAdminToken("");
        setTokenInput("");
        setClients([]);
        setPosts([]);
        setComments([]);
        setError(
          "Token invalido o vencido. Ingresa nuevamente el token de administrador.",
        );
        return;
      }

      if (!clientsResponse.ok || !postsResponse.ok || !commentsResponse.ok) {
        throw new Error("No se pudo leer la informacion.");
      }

      const clientsPayload = await clientsResponse.json();
      const postsPayload = await postsResponse.json();
      const commentsPayload = await commentsResponse.json();
      setClients(clientsPayload.clients);
      setDraftNotes(
        Object.fromEntries(
          clientsPayload.clients.map((client: Client) => [
            client.id,
            client.internal_notes || "",
          ]),
        ),
      );
      setPosts(postsPayload.posts);
      setComments(commentsPayload.comments);
    } catch {
      setError(
        "No se pudo cargar el panel. Verifica MySQL o el token de administrador.",
      );
    }
  }

  useEffect(() => {
    const storedToken =
      window.localStorage.getItem("lexiuridicus_admin_token") || "";
    setAdminToken(storedToken);
    setTokenInput(storedToken);
  }, []);

  useEffect(() => {
    if (adminToken) {
      loadData();
    }
  }, [adminToken]);

  function loginAdmin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextToken = tokenInput.trim();
    window.localStorage.setItem("lexiuridicus_admin_token", nextToken);
    setAdminToken(nextToken);
  }

  function logoutAdmin() {
    window.localStorage.removeItem("lexiuridicus_admin_token");
    setAdminToken("");
    setTokenInput("");
    setClients([]);
    setPosts([]);
    setComments([]);
  }

  async function createPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: adminHeaders,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const payload = await response.json();
      setError(payload.error || "No se pudo crear el articulo.");
      return;
    }

    form.reset();
    setMessage("Articulo creado correctamente.");
    await loadData();
  }

  async function updatePostStatus(
    id: number,
    status: "borrador" | "publicado",
  ) {
    setMessage("");
    setError("");

    const response = await fetch("/api/posts", {
      method: "PATCH",
      headers: adminHeaders,
      body: JSON.stringify({ id, status }),
    });

    if (!response.ok) {
      setError("No se pudo actualizar el articulo.");
      return;
    }

    setPosts((current) =>
      current.map((post) => (post.id === id ? { ...post, status } : post)),
    );
    setMessage(
      status === "publicado"
        ? "Articulo publicado."
        : "Articulo enviado a borrador.",
    );
  }

  async function deletePost(id: number, title: string) {
    const confirmed = window.confirm(
      `Eliminar el articulo "${title}"? Esta accion no se puede deshacer.`,
    );

    if (!confirmed) {
      return;
    }

    setMessage("");
    setError("");

    const response = await fetch(`/api/posts?id=${id}`, {
      method: "DELETE",
      headers: { "x-admin-token": adminToken },
    });

    if (!response.ok) {
      setError("No se pudo eliminar el articulo.");
      return;
    }

    setPosts((current) => current.filter((post) => post.id !== id));
    setMessage("Articulo eliminado.");
  }

  async function updateCommentStatus(id: number, status: CommentStatus) {
    setMessage("");
    setError("");

    const response = await fetch("/api/comments", {
      method: "PATCH",
      headers: adminHeaders,
      body: JSON.stringify({ id, status }),
    });

    if (!response.ok) {
      setError("No se pudo actualizar el comentario.");
      return;
    }

    setComments((current) =>
      current.map((comment) =>
        comment.id === id ? { ...comment, status } : comment,
      ),
    );
    setMessage(
      status === "aprobado"
        ? "Comentario aprobado."
        : "Comentario actualizado.",
    );
  }

  async function deleteComment(id: number) {
    const confirmed = window.confirm(
      "Eliminar este comentario? Esta accion no se puede deshacer.",
    );

    if (!confirmed) {
      return;
    }

    setMessage("");
    setError("");

    const response = await fetch(`/api/comments?id=${id}`, {
      method: "DELETE",
      headers: { "x-admin-token": adminToken },
    });

    if (!response.ok) {
      setError("No se pudo eliminar el comentario.");
      return;
    }

    setComments((current) => current.filter((comment) => comment.id !== id));
    setMessage("Comentario eliminado.");
  }

  async function updateClientStatus(id: number, status: ClientStatus) {
    setMessage("");
    setError("");

    const response = await fetch("/api/clients", {
      method: "PATCH",
      headers: adminHeaders,
      body: JSON.stringify({ id, status }),
    });

    if (!response.ok) {
      setError("No se pudo actualizar el estado del cliente.");
      return;
    }

    setClients((current) =>
      current.map((client) =>
        client.id === id ? { ...client, status } : client,
      ),
    );
    setMessage("Estado del cliente actualizado.");
  }

  async function saveInternalNotes(id: number) {
    setMessage("");
    setError("");

    const response = await fetch("/api/clients", {
      method: "PATCH",
      headers: adminHeaders,
      body: JSON.stringify({ id, internal_notes: draftNotes[id] || "" }),
    });

    if (!response.ok) {
      setError("No se pudieron guardar las notas internas.");
      return;
    }

    setClients((current) =>
      current.map((client) =>
        client.id === id
          ? { ...client, internal_notes: draftNotes[id] || null }
          : client,
      ),
    );
    setMessage("Notas internas guardadas.");
  }

  async function deleteClient(id: number, name: string) {
    const confirmed = window.confirm(
      `Eliminar la solicitud de ${name}? Esta accion no se puede deshacer.`,
    );

    if (!confirmed) {
      return;
    }

    setMessage("");
    setError("");

    const response = await fetch(`/api/clients?id=${id}`, {
      method: "DELETE",
      headers: { "x-admin-token": adminToken },
    });

    if (!response.ok) {
      setError("No se pudo eliminar el cliente.");
      return;
    }

    setClients((current) => current.filter((client) => client.id !== id));
    setDraftNotes((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
    setMessage("Solicitud eliminada.");
  }

  function exportClients() {
    const headers = [
      "Nombre",
      "Empresa",
      "Cargo",
      "Email",
      "Telefono",
      "Servicio",
      "Objetivo",
      "Socios",
      "Prioridad",
      "Estado",
      "Notas cliente",
      "Notas internas",
      "Fecha",
    ];
    const rows = filteredClients.map((client) => [
      client.full_name,
      client.company,
      client.role,
      client.email,
      client.phone,
      client.legal_need,
      client.business_goal,
      client.shareholder_context || "",
      client.urgency,
      client.status,
      client.notes || "",
      client.internal_notes || "",
      new Date(client.created_at).toLocaleDateString("es-CO"),
    ]);
    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "clientes-lexiuridicus.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  const filteredClients = clients.filter((client) => {
    const matchesStatus =
      statusFilter === "todos" || client.status === statusFilter;
    const normalizedSearch = search.trim().toLowerCase();
    const matchesSearch =
      !normalizedSearch ||
      [
        client.full_name,
        client.email,
        client.phone,
        client.legal_need,
        client.notes || "",
      ]
        .concat([
          client.company,
          client.role,
          client.business_goal,
          client.shareholder_context || "",
        ])
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);

    return matchesStatus && matchesSearch;
  });

  const clientStats = {
    total: clients.length,
    nuevos: clients.filter((client) => client.status === "nuevo").length,
    contactados: clients.filter((client) => client.status === "contactado")
      .length,
    enProceso: clients.filter((client) => client.status === "en_proceso")
      .length,
    cerrados: clients.filter((client) => client.status === "cerrado").length,
    altaPrioridad: clients.filter((client) => client.urgency === "alta").length,
  };

  const commentStats = {
    total: comments.length,
    pendientes: comments.filter((comment) => comment.status === "pendiente")
      .length,
    aprobados: comments.filter((comment) => comment.status === "aprobado")
      .length,
    rechazados: comments.filter((comment) => comment.status === "rechazado")
      .length,
  };

  return (
    <div className="admin-workspace">
      {!adminToken ? (
        <AdminLogin
          tokenInput={tokenInput}
          onTokenInputChange={setTokenInput}
          onSubmit={loginAdmin}
        />
      ) : null}

      {adminToken ? (
        <>
          <AdminTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onLogout={logoutAdmin}
          />

          {error ? <div className="error">{error}</div> : null}
          {message ? <div className="message">{message}</div> : null}

          {activeTab === "clientes" ? (
            <section className="admin-panel stack">
              <div className="admin-stats" aria-label="Resumen de solicitudes">
                <button onClick={() => setStatusFilter("todos")} type="button">
                  <span>Total</span>
                  <strong>{clientStats.total}</strong>
                </button>
                <button onClick={() => setStatusFilter("nuevo")} type="button">
                  <span>Nuevos</span>
                  <strong>{clientStats.nuevos}</strong>
                </button>
                <button
                  onClick={() => setStatusFilter("contactado")}
                  type="button"
                >
                  <span>Contactados</span>
                  <strong>{clientStats.contactados}</strong>
                </button>
                <button
                  onClick={() => setStatusFilter("en_proceso")}
                  type="button"
                >
                  <span>En proceso</span>
                  <strong>{clientStats.enProceso}</strong>
                </button>
                <button
                  onClick={() => setStatusFilter("cerrado")}
                  type="button"
                >
                  <span>Cerrados</span>
                  <strong>{clientStats.cerrados}</strong>
                </button>
                <div className="priority-stat">
                  <span>Alta prioridad</span>
                  <strong>{clientStats.altaPrioridad}</strong>
                </div>
              </div>
              <div className="panel-header">
                <div>
                  <span className="eyebrow">Clientes</span>
                  <h2>Solicitudes recibidas</h2>
                </div>
                <div className="panel-actions">
                  <span className="status-pill">
                    {filteredClients.length} visibles
                  </span>
                  <button
                    className="ghost-button compact-button"
                    onClick={exportClients}
                    type="button"
                  >
                    Exportar CSV
                  </button>
                </div>
              </div>
              <div className="filters">
                <label>
                  Buscar
                  <input
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Nombre, empresa, correo, telefono o caso"
                    value={search}
                  />
                </label>
                <label>
                  Estado
                  <select
                    onChange={(event) =>
                      setStatusFilter(
                        event.target.value as ClientStatus | "todos",
                      )
                    }
                    value={statusFilter}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="stack">
                {filteredClients.length ? (
                  filteredClients.map((client) => (
                    <article className="client-row" key={client.id}>
                      <div className="client-heading">
                        <div>
                          <strong>{client.full_name}</strong>
                          <span className="meta">
                            {client.company} | {client.role}
                          </span>
                          <span className="meta">
                            {client.email} | {client.phone}
                          </span>
                        </div>
                        <select
                          aria-label={`Estado de ${client.full_name}`}
                          onChange={(event) =>
                            updateClientStatus(
                              client.id,
                              event.target.value as ClientStatus,
                            )
                          }
                          value={client.status}
                        >
                          <option value="nuevo">Nuevo</option>
                          <option value="contactado">Contactado</option>
                          <option value="en_proceso">En proceso</option>
                          <option value="cerrado">Cerrado</option>
                        </select>
                      </div>
                      <div className="client-tags">
                        <span className="status-pill">{client.legal_need}</span>
                        <span className="status-pill">
                          {client.business_goal}
                        </span>
                        {client.shareholder_context ? (
                          <span className="status-pill">
                            {client.shareholder_context}
                          </span>
                        ) : null}
                        <span
                          className={`status-pill urgency-${client.urgency}`}
                        >
                          Urgencia {client.urgency}
                        </span>
                      </div>
                      {client.notes ? (
                        <p>{client.notes}</p>
                      ) : (
                        <p>Sin notas adicionales.</p>
                      )}
                      <label className="internal-notes">
                        Notas internas
                        <textarea
                          onChange={(event) =>
                            setDraftNotes((current) => ({
                              ...current,
                              [client.id]: event.target.value,
                            }))
                          }
                          placeholder="Seguimiento, llamada, documentos solicitados..."
                          value={draftNotes[client.id] || ""}
                        />
                      </label>
                      <div className="client-actions">
                        <button
                          className="ghost-button compact-button"
                          onClick={() => saveInternalNotes(client.id)}
                          type="button"
                        >
                          Guardar notas
                        </button>
                        <button
                          className="danger-button compact-button"
                          onClick={() =>
                            deleteClient(client.id, client.full_name)
                          }
                          type="button"
                        >
                          Eliminar
                        </button>
                      </div>
                      <span className="meta">
                        Ingreso:{" "}
                        {new Date(client.created_at).toLocaleDateString(
                          "es-CO",
                        )}
                      </span>
                    </article>
                  ))
                ) : (
                  <p>No hay clientes que coincidan con los filtros.</p>
                )}
              </div>
            </section>
          ) : activeTab === "blog" ? (
            <section className="admin-layout">
              <div className="admin-panel stack">
                <div>
                  <span className="eyebrow">Blog</span>
                  <h2>Nuevo articulo</h2>
                </div>
                <form className="form-grid" onSubmit={createPost}>
                  <label>
                    Titulo
                    <input
                      name="title"
                      required
                      placeholder="Titulo del articulo"
                    />
                  </label>
                  <label>
                    Categoria
                    <select name="category" defaultValue="Gobierno corporativo">
                      <option value="Gobierno corporativo">
                        Gobierno corporativo
                      </option>
                      <option value="Tradicion de acciones">
                        Tradicion de acciones
                      </option>
                      <option value="Imagen empresarial">
                        Imagen empresarial
                      </option>
                    </select>
                  </label>
                  <label>
                    Resumen
                    <textarea
                      name="excerpt"
                      required
                      placeholder="Resumen para el listado del blog"
                    />
                  </label>
                  <label>
                    Contenido
                    <textarea
                      name="content"
                      required
                      placeholder="Contenido principal"
                    />
                  </label>
                  <label>
                    Autor
                    <input name="author" placeholder="Equipo Lexiuridicus" />
                  </label>
                  <label>
                    Estado
                    <select name="status" defaultValue="borrador">
                      <option value="borrador">Borrador</option>
                      <option value="publicado">Publicado</option>
                    </select>
                  </label>
                  <button className="button" type="submit">
                    Guardar articulo
                  </button>
                </form>
              </div>

              <div className="admin-panel stack">
                <h3>Articulos</h3>
                {posts.length ? (
                  posts.map((post) => (
                    <article className="post-card" key={post.id}>
                      <div className="client-heading">
                        <div className="client-tags">
                          <span className="status-pill">{post.category}</span>
                          <span className="status-pill">{post.status}</span>
                        </div>
                        <span className="meta">{post.author}</span>
                      </div>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <div className="client-actions">
                        <button
                          className="ghost-button compact-button"
                          onClick={() =>
                            updatePostStatus(
                              post.id,
                              post.status === "publicado"
                                ? "borrador"
                                : "publicado",
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
                          onClick={() => deletePost(post.id, post.title)}
                          type="button"
                        >
                          Eliminar
                        </button>
                      </div>
                    </article>
                  ))
                ) : (
                  <p>No hay articulos creados todavia.</p>
                )}
              </div>
            </section>
          ) : (
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
              <div className="panel-header">
                <div>
                  <span className="eyebrow">Moderacion</span>
                  <h2>Comentarios del blog</h2>
                </div>
              </div>
              <div className="stack">
                {comments.length ? (
                  comments.map((comment) => (
                    <article className="client-row" key={comment.id}>
                      <div className="client-heading">
                        <div>
                          <strong>{comment.author_name}</strong>
                          <span className="meta">
                            {comment.author_email} |{" "}
                            {new Date(comment.created_at).toLocaleDateString(
                              "es-CO",
                            )}
                          </span>
                        </div>
                        <span className="status-pill">{comment.status}</span>
                      </div>
                      <span className="meta">
                        Articulo: {comment.post_title}
                      </span>
                      <p>{comment.comment}</p>
                      <div className="client-actions">
                        <button
                          className="ghost-button compact-button"
                          onClick={() =>
                            updateCommentStatus(comment.id, "aprobado")
                          }
                          type="button"
                        >
                          Aprobar
                        </button>
                        <button
                          className="ghost-button compact-button"
                          onClick={() =>
                            updateCommentStatus(comment.id, "rechazado")
                          }
                          type="button"
                        >
                          Rechazar
                        </button>
                        <button
                          className="danger-button compact-button"
                          onClick={() => deleteComment(comment.id)}
                          type="button"
                        >
                          Eliminar
                        </button>
                      </div>
                    </article>
                  ))
                ) : (
                  <p>No hay comentarios para moderar todavia.</p>
                )}
              </div>
            </section>
          )}
        </>
      ) : null}
    </div>
  );
}
