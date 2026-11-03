import { Pool } from 'pg';

async function main() {
  const pool = new Pool({
    host: 'localhost', port: 5432, user: 'postgres', password: '123456', database: 'qianduan'
  });

  await pool.query('DELETE FROM events');
  await pool.query(`
    INSERT INTO events (title, description, date, type, tags) VALUES
    ('项目启动', 'qianduan 项目初始化，搭建基础架构', '2026-01-15', 'feature', '["初始化"]'),
    ('完成需求文档', '梳理时间轴功能需求', '2026-03-01', 'doc', '["需求"]'),
    ('前端开发', 'Vue 3 + TypeScript 实现时间轴组件', '2026-06-10', 'feature', '["前端"]'),
    ('修复登录问题', '解决 SSH 认证失败问题', '2026-08-20', 'bugfix', '["auth"]'),
    ('添加 GitHub Actions', '配置 CI/CD 自动化流程', '2026-10-01', 'feature', '["devops"]'),
    ('时间轴功能上线', '竖向时间轴正式发布', '2026-11-03', 'feature', '["timeline"]');
  `);

  const result = await pool.query('SELECT id, title, date, type FROM events ORDER BY date');
  console.log(JSON.stringify(result.rows, null, 2));
  await pool.end();
}

main().catch(console.error);
