export type ClientStatus = "nuevo" | "contactado" | "en_proceso" | "cerrado";
export type ClientUrgency = "baja" | "media" | "alta";
export type PostStatus = "borrador" | "publicado";
export type CommentStatus = "pendiente" | "aprobado" | "rechazado";

export type Client = {
  id: number;
  full_name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  legal_need: string;
  business_goal: string;
  shareholder_context: string | null;
  urgency: ClientUrgency;
  status: ClientStatus;
  privacy_accepted: number;
  notes: string | null;
  internal_notes: string | null;
  created_at: string;
};

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  status: PostStatus;
  published_at: string | null;
  created_at: string;
};

export type BlogComment = {
  id: number;
  post_id: number;
  post_title?: string;
  post_slug?: string;
  author_name: string;
  author_email: string;
  comment: string;
  status: CommentStatus;
  created_at: string;
};
