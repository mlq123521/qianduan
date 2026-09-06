"use client";

import { useEffect, useState } from "react";
import type { Message } from "@/lib/db";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // 加载留言
  useEffect(() => {
    fetch("/api/guestbook")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(() => setError("加载留言失败，请稍后重试"));
  }, []);

  // 提交留言
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setLoading(true);
    setError("");
    setSent(false);

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "提交失败");
      setMessages((prev) => [data, ...prev]);
      setName("");
      setContent("");
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "提交失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  }

  function formatTime(dateStr: string | Date): string {
    const date = new Date(dateStr);
    return date.toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* 标题 */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📝 留言本
          </h1>
          <p className="text-gray-500">留下你的想法，和大家分享</p>
        </div>

        {/* 提交表单 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                姓名
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入你的姓名"
                maxLength={50}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition text-gray-900 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                留言内容
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="写下你想说的话..."
                rows={4}
                maxLength={500}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition text-gray-900 placeholder-gray-400 resize-none"
              />
              <p className="text-xs text-gray-400 mt-1 text-right">{content.length}/500</p>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-2">{error}</p>
            )}
            {sent && (
              <p className="text-sm text-green-600 bg-green-50 rounded-lg px-4 py-2">
                ✅ 留言提交成功！
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !name.trim() || !content.trim()}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium transition-colors"
            >
              {loading ? "提交中..." : "提交留言"}
            </button>
          </form>
        </div>

        {/* 留言列表 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-800">
              最新评论
            </h2>
            <span className="text-sm text-gray-400">
              共 {messages.length} 条
            </span>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <p className="text-4xl mb-3">💬</p>
              <p className="text-gray-500">还没有留言，来做第一个留言的人吧！</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">
                    {msg.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatTime(msg.created_at)}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
