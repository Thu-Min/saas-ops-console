import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema/**.schema.ts',
  out: './drizzle-artifacts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    schema: 'public',
  },
});
