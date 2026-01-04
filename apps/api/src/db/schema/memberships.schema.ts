import { pgTable, uuid, boolean, text, unique } from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { organizations } from './organizations.schema';

export const memberships = pgTable(
  'memberships',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),

    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizations.id),

    role: text('role').notNull(),
    isActive: boolean('is_active').default(true).notNull(),
  },
  (t) => ({
    uniqueMembership: unique().on(t.userId, t.organizationId),
  }),
);
