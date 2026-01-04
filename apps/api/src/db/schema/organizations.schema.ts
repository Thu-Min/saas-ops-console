import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
});
