import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

type DbConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

export const createDb = (config: DbConfig) => {
  const pool = new Pool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
  });

  return drizzle(pool, { schema });
};

export type DbClient = ReturnType<typeof createDb>;
