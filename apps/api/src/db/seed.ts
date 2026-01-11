import 'dotenv/config';
import { db } from './index';
import { users } from './schema/users.schema';
import { organizations } from './schema/organizations.schema';
import { memberships } from './schema/memberships.schema';
import { projects } from './schema/projects.schema';

async function seed() {
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
