"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminTabs } from "@/components/admin/AdminTabs";
import type {
  AdminTab,
  ClientStatusFilter,
} from "@/components/admin/admin.types";
import type {
  BlogComment,
  BlogPost,
  Client,
  ClientStatus,
  CommentStatus,
} from "@/types";
import { ClientPanel } from "@/components/admin/ClientPanel";
import { BlogPanel } from "@/components/admin/BlogPanel";
import { CommentPanel } from "@/components/admin/CommentPanel";

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
  const [statusFilter, setStatusFilter] = useState<ClientStatusFilter>("todos");
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
            <ClientPanel
              clients={filteredClients}
              clientStats={clientStats}
              draftNotes={draftNotes}
              search={search}
              statusFilter={statusFilter}
              onSearchChange={setSearch}
              onStatusFilterChange={setStatusFilter}
              onExportClients={exportClients}
              onClientStatusChange={updateClientStatus}
              onDraftNoteChange={(id, value) =>
                setDraftNotes((current) => ({ ...current, [id]: value }))
              }
              onSaveInternalNotes={saveInternalNotes}
              onDeleteClient={deleteClient}
            />
          ) : activeTab === "blog" ? (
            <BlogPanel
              posts={posts}
              onCreatePost={createPost}
              onUpdatePostStatus={updatePostStatus}
              onDeletePost={deletePost}
            />
          ) : (
            <CommentPanel
              comments={comments}
              commentStats={commentStats}
              onUpdateCommentStatus={updateCommentStatus}
              onDeleteComment={deleteComment}
            />
          )}
        </>
      ) : null}
    </div>
  );
}
