import { Pool } from 'pg';

async function main() {
  const defaultPool = new Pool({
    host: 'localhost', port: 5432,
    user: 'postgres', password: '123456',
    database: 'postgres',
  });

  try {
    const check = await defaultPool.query(
      "SELECT 1 FROM pg_database WHERE datname = 'qianduan'"
    );
    if (check.rows.length === 0) {
      console.log('创建数据库 qianduan...');
      await defaultPool.query('CREATE DATABASE qianduan');
      console.log('数据库创建成功');
    } else {
      console.log('数据库已存在');
    }
  } finally {
    await defaultPool.end();
  }

  const pool = new Pool({
    host: 'localhost', port: 5432,
    user: 'postgres', password: '123456',
    database: 'qianduan',
  });

  try {
    await pool.query(`
      DO $$ BEGIN
        CREATE TYPE event_type AS ENUM ('feature', 'bugfix', 'doc', 'other');
      EXCEPTION WHEN duplicate_object THEN null;
      END $$;
    `);
    console.log('枚举类型创建成功');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date TIMESTAMP NOT NULL,
        type event_type NOT NULL DEFAULT 'other',
        tags JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    console.log('表结构创建成功');

    // 插入示例数据
    const count = await pool.query('SELECT COUNT(*) FROM events');
    if (parseInt(count.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO events (title, description, date, type, tags) VALUES
        ('项目启动', 'qianduan 项目初始化', '2026-01-01', 'feature', '["初始化"]'),
        ('添加时间轴功能', '实现竖向时间轴展示', '2026-11-03', 'feature', '["timeline"]'),
        ('修复登录问题', '修复 SSH 认证问题', '2026-11-03', 'bugfix', '["auth"]'),
        ('更新 README', '补充使用文档', '2026-11-03', 'doc', '["docs"]');
      `);
      console.log('示例数据插入成功');
    }

    console.log('✅ 数据库初始化完成');
  } finally {
    await pool.end();
  }
}

main().catch(console.error);
