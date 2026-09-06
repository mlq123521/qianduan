import { NextResponse } from "next/server";
import { initDb, getMessages, addMessage } from "@/lib/db";

// 确保表存在
await initDb();

// GET - 获取留言列表
export async function GET() {
  const messages = await getMessages();
  return NextResponse.json(messages);
}

// POST - 添加留言
export async function POST(request: Request) {
  const body = await request.json();
  const { name, content } = body;

  if (!name?.trim() || !content?.trim()) {
    return NextResponse.json(
      { error: "姓名和留言内容不能为空" },
      { status: 400 }
    );
  }

  const message = await addMessage(name.trim(), content.trim());
  return NextResponse.json(message, { status: 201 });
}
