<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Event } from '../api/events'
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../api/events'

const events = ref<Event[]>([])
const loading = ref(false)
const showForm = ref(false)
const editingEvent = ref<Event | null>(null)

const form = ref({ title: '', description: '', date: '', type: 'other' as Event['type'], tags: '' })

async function load() {
  loading.value = true
  try {
    events.value = await fetchEvents()
    // 反转使最新的在上面
    events.value.reverse()
  } catch {
    alert('加载失败')
  } finally {
    loading.value = false
  }
}

function openAdd() {
  editingEvent.value = null
  form.value = { title: '', description: '', date: new Date().toISOString().slice(0, 10), type: 'other', tags: '' }
  showForm.value = true
}

function openEdit(event: Event) {
  editingEvent.value = event
  form.value = {
    title: event.title,
    description: event.description ?? '',
    date: event.date.slice(0, 10),
    type: event.type,
    tags: event.tags?.join(', ') ?? '',
  }
  showForm.value = true
}

async function save() {
  if (!form.value.title.trim()) {
    alert('标题不能为空')
    return
  }
  const data = { ...form.value, tags: form.value.tags.split(',').map(t => t.trim()).filter(Boolean) }
  if (editingEvent.value) {
    await updateEvent(editingEvent.value.id, data)
  } else {
    await createEvent(data)
  }
  showForm.value = false
  load()
}

async function handleDelete(id: number) {
  if (!confirm('确定删除？')) return
  await deleteEvent(id)
  load()
}

onMounted(() => load())
</script>

<template>
  <div class="page">
    <header class="header">
      <h1>事件管理</h1>
      <button class="btn-add" @click="openAdd">+ 新增事件</button>
    </header>

    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="!events.length" class="empty">暂无事件</div>
    <table v-else class="table">
      <thead>
        <tr>
          <th>日期</th>
          <th>类型</th>
          <th>标题</th>
          <th>描述</th>
          <th>标签</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.id">
          <td>{{ new Date(event.date).toLocaleDateString('zh-CN') }}</td>
          <td><span class="tag" :class="event.type">{{ event.type }}</span></td>
          <td>{{ event.title }}</td>
          <td class="desc">{{ event.description }}</td>
          <td>{{ event.tags?.join(', ') }}</td>
          <td class="actions">
            <button class="edit" @click="openEdit(event)">编辑</button>
            <button class="del" @click="handleDelete(event.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 弹窗 -->
    <div v-if="showForm" class="overlay" @click.self="showForm = false">
      <div class="dialog">
        <h2>{{ editingEvent ? '编辑事件' : '新增事件' }}</h2>
        <div class="form">
          <label>标题 <input v-model="form.title" placeholder="事件标题" /></label>
          <label>描述 <textarea v-model="form.description" rows="3" placeholder="事件描述"></textarea></label>
          <label>日期 <input v-model="form.date" type="date" /></label>
          <label>类型
            <select v-model="form.type">
              <option value="feature">功能</option>
              <option value="bugfix">Bug修复</option>
              <option value="doc">文档</option>
              <option value="other">其他</option>
            </select>
          </label>
          <label>标签（逗号分隔）<input v-model="form.tags" placeholder="前端, Vue" /></label>
        </div>
        <div class="actions">
          <button class="cancel" @click="showForm = false">取消</button>
          <button class="submit" @click="save">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { max-width: 1000px; margin: 0 auto; padding: 20px; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
h1 { font-size: 24px; }
.btn-add { padding: 8px 20px; background: #3b82f6; color: #fff; border: none; border-radius: 6px; cursor: pointer; }

.table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; }
th, td { padding: 12px 14px; text-align: left; border-bottom: 1px solid #e2e8f0; }
thead { background: #f8fafc; }
th { font-size: 13px; color: #64748b; font-weight: 600; }
td { font-size: 14px; }
.desc { color: #64748b; max-width: 200px; }
.tag { padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
.tag.feature { background: #eff6ff; color: #3b82f6; }
.tag.bugfix { background: #fef2f2; color: #ef4444; }
.tag.doc { background: #f0fdf4; color: #22c55e; }
.tag.other { background: #f3f4f6; color: #6b7280; }
.actions { display: flex; gap: 6px; }
.edit { padding: 4px 10px; border: 1px solid #e2e8f0; border-radius: 4px; background: #fff; cursor: pointer; font-size: 12px; }
.del { padding: 4px 10px; border: 1px solid #e2e8f0; border-radius: 4px; background: #fff; cursor: pointer; font-size: 12px; color: #ef4444; }

.loading, .empty { text-align: center; color: #94a3b8; padding: 40px; }

/* 弹窗 */
.overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 200;
}
.dialog {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 480px;
}
h2 { margin-bottom: 16px; }
.form { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
label { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: #64748b; }
input, textarea, select {
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #f8fafc;
  color: #1e293b;
  font-size: 14px;
}
.actions { display: flex; gap: 8px; justify-content: flex-end; }
.cancel { padding: 8px 16px; border: 1px solid #e2e8f0; border-radius: 6px; background: #fff; cursor: pointer; }
.submit { padding: 8px 16px; border: none; border-radius: 6px; background: #3b82f6; color: #fff; cursor: pointer; }
</style>
