import 'dotenv/config';
import { createDb } from './index';
import { users } from './schema/users.schema';
import { organizations } from './schema/organizations.schema';
import { memberships } from './schema/memberships.schema';
import { projects } from './schema/projects.schema';

async function seed() {
  const port = Number(process.env.DB_PORT);
  const db = createDb({
    host: process.env.DB_HOST ?? 'localhost',
    port: Number.isNaN(port) ? 5432 : port,
    user: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? 'postgres',
  });

  const [org] = await db
    .insert(organizations)
    .values({
      name: 'Acme Corp',
    })
    .returning();

  const [user] = await db
    .insert(users)
    .values({
      email: 'admin@acme.com',
    })
    .returning();

  await db.insert(memberships).values({
    userId: user.id,
    organizationId: org.id,
    role: 'OWNER',
    isActive: true,
  });

  await db.insert(projects).values([
    {
      name: 'Inventory System',
      organizationId: org.id,
    },
    {
      name: 'Booking Platform',
      organizationId: org.id,
    },
  ]);

  console.log('Seed completed');
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
