# 留言本

基于 Next.js 16 + PostgreSQL 的留言本应用。

## 本地运行

```bash
pnpm install
pnpm dev
# 访问 http://localhost:3000
```

## 数据库配置

创建 `.env.local`：

```
DATABASE_URL="postgresql://postgres:密码@127.0.0.1:5432/数据库名"
```

## 部署到 Vercel

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 添加环境变量 `DATABASE_URL`（Neon/Supabase 连接串）
