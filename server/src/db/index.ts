import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema.js';

const pool = new Pool({
  host: 'localhost', port: 5432,
  user: 'postgres', password: '123456',
  database: 'qianduan',
});

export const db = drizzle(pool, { schema });

export async function close() {
  await pool.end();
}
