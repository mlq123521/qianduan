# qianduan

前端项目 - 事件时间轴功能

## 技术栈
- 前端：Vue 3 + TypeScript + Vite
- 后端：Node.js + Express + TypeScript
- 数据库：PostgreSQL

## 快速开始

### 1. 启动后端
```bash
cd server
npm install
npx tsx src/db/init.ts  # 初始化数据库
npx tsx src/index.ts    # 启动服务 (http://localhost:3000)
```

### 2. 启动前端
```bash
cd client
npm install
npm run dev            # 开发服务器 (http://localhost:5173)
```

### 3. 访问
打开浏览器访问 http://localhost:5173

## 功能
- 竖向时间轴展示事件
- 按类型筛选（功能/Bug修复/文档/其他）
- 按日期范围筛选
- 关键词搜索
- 新增/编辑/删除事件

## API
- `GET /api/events` - 获取事件列表
- `POST /api/events` - 新增事件
- `PUT /api/events/:id` - 更新事件
- `DELETE /api/events/:id` - 删除事件
