import { query } from "@/lib/db";
import type { AuthContext } from "@/lib/auth";

type AuditEvent = {
  action: string;
  entityType: string;
  entityId?: number | string | null;
  metadata?: Record<string, unknown>;
};

export async function appendAuditEvent(
  request: Request,
  actor: AuthContext,
  event: AuditEvent,
) {
  const correlationId =
    request.headers.get("x-correlation-id") || crypto.randomUUID();

  await query(
    `INSERT INTO audit_events
       (organization_id, actor_user_id, session_id, action, entity_type, entity_id,
        correlation_id, ip_address, user_agent, metadata_json)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      actor.organizationId,
      actor.userId,
      actor.sessionId,
      event.action,
      event.entityType,
      event.entityId ? String(event.entityId) : null,
      correlationId,
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
      request.headers.get("user-agent"),
      event.metadata ? JSON.stringify(event.metadata) : null,
    ],
  );
}
