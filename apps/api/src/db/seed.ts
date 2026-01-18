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

  // Org A
  const [orgA] = await db
    .insert(organizations)
    .values({ name: 'Acme Corp' })
    .returning();

  // Org B
  const [orgB] = await db
    .insert(organizations)
    .values({ name: 'Beta Inc' })
    .returning();

  // Users
  const [owner] = await db
    .insert(users)
    .values({ email: 'owner@acme.com' })
    .returning();

  const [member] = await db
    .insert(users)
    .values({ email: 'member@acme.com' })
    .returning();

  // Memberships
  await db.insert(memberships).values([
    {
      userId: owner.id,
      organizationId: orgA.id,
      role: 'OWNER',
      isActive: true,
    },
    {
      userId: member.id,
      organizationId: orgA.id,
      role: 'MEMBER',
      isActive: true,
    },
  ]);

  // Projects
  await db.insert(projects).values([
    {
      name: 'Inventory System',
      organizationId: orgA.id,
    },
    {
      name: 'Booking Platform',
      organizationId: orgA.id,
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
