import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').defaultRandom().primaryKey(),

  organizationId: uuid('organization_id').notNull(),
  actorUserId: uuid('actor_user_id').notNull(),

  resource: text('resource').notNull(),
  action: text('action').notNull(),
  resourceId: uuid('resource_id'),

  metadata: text('metadata'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});
