import { Pool } from 'pg';

async function main() {
  const pool = new Pool({
    host: 'localhost', port: 5432, user: 'postgres', password: '123456', database: 'qianduan'
  });

  const result = await pool.query('SELECT id, title, date, type FROM events ORDER BY date DESC');
  console.log(JSON.stringify(result.rows, null, 2));
  await pool.end();
}

main().catch(console.error);
