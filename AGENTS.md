# AGENTS.md

本文件给在 CI 或本地工作的 AI Agent 使用，说明仓库结构与硬性约束。

## 仓库结构

- `client/` — Vue 3 + TypeScript + Vite，独立的 npm 包
- `server/` — Express + TypeScript + Drizzle ORM + PostgreSQL，独立的 npm 包
- 根目录 `package.json` 只是占位，不要在这里安装依赖或添加业务代码
- 数据库脚本：`server/src/db/init.ts`（建库建表 + 示例数据）、`server/src/db/seed.ts`（重置示例数据）

## 常用命令

```bash
# 前端
cd client && npm ci && npm run build

# 后端
cd server && npm ci && npm run build

# 本地开发
cd server && npm run dev     # http://localhost:3000
cd client && npm run dev     # http://localhost:5173
```

## 硬性约束

- 不要提交 `node_modules/`、`dist/`、`.env`、`*.log`
- 数据库连接信息不要写进代码，从 `DATABASE_URL` 读取
- CI 环境没有 PostgreSQL：涉及数据库的改动只需保证 `tsc` 通过，不要伪造运行结果或声称已验证
- 相对导入必须带 `.js` 后缀（例如 `import { db } from './index.js'`），否则编译产物无法运行
- 日期排序使用 drizzle 的 `desc(events.date)`，不要给 `orderBy` 传 `'desc'` 字符串
- 修改接口时同步更新 `README.md` 的 API 列表
- 不引入新依赖，除非在 PR 描述里说明理由
- 一个 PR 只做一件事；提交前必须跑过对应子包的 `npm run build`

## 代码风格

- 统一 2 空格缩进、单引号
- `server/` 语句结尾带分号；`client/` 跟随现有文件，不带分号
- 后端文件名小写，路由放在 `server/src/routes/`，查询放在 `server/src/db/queries.ts`
- 前端组件用 `<script setup lang="ts">`，页面放在 `client/src/views/`，组件放在 `client/src/components/`

## PR 要求

- 标题用中文简述改动，正文列出：改了什么、为什么、跑过哪些命令
- 不要顺手重构无关代码，不要修改 `.github/workflows/` 下的其他工作流
