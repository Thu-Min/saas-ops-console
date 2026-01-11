import { pgTable, uuid, boolean, text, unique } from 'drizzle-orm/pg-core';
import { organizations } from './organizations.schema';
import { index } from 'drizzle-orm/pg-core';

export const projects = pgTable(
  'projects',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizations.id),
  },
  (t) => ({
    orgIdx: index('projects_org_idx').on(t.organizationId),
  }),
);
