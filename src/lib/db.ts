import { Client } from "pg";

const client = new Client(process.env.DATABASE_URL!);

export type Message = {
  id: number;
  name: string;
  content: string;
  created_at: Date;
};

export async function initDb() {
  await client.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS guestbook (
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(100) NOT NULL,
      content     TEXT NOT NULL,
      created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function getMessages(): Promise<Message[]> {
  const result = await client.query(
    "SELECT id, name, content, created_at FROM guestbook ORDER BY created_at DESC LIMIT 50"
  );
  return result.rows as Message[];
}

export async function addMessage(name: string, content: string): Promise<Message> {
  const result = await client.query(
    "INSERT INTO guestbook (name, content) VALUES ($1, $2) RETURNING id, name, content, created_at",
    [name, content]
  );
  return result.rows[0] as Message;
}
