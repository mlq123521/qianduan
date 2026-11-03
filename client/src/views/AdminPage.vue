<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Event } from '../api/events'
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../api/events'

const events = ref<Event[]>([])
const loading = ref(false)
const showAddDialog = ref(false)
const editingEvent = ref<Event | null>(null)

async function load() {
  loading.value = true
  try {
    events.value = await fetchEvents()
  } catch {
    alert('加载失败')
  } finally {
    loading.value = false
  }
}

async function handleDelete(id: number) {
  if (!confirm('确定删除？')) return
  await deleteEvent(id)
  load()
}

async function handleSave(data: Partial<Event>) {
  if (editingEvent.value) {
    await updateEvent(editingEvent.value.id, data)
  } else {
    await createEvent(data)
  }
  showAddDialog.value = false
  editingEvent.value = null
  load()
}

onMounted(() => load())
</script>

<template>
  <div class="page">
    <header class="header">
      <h1>事件管理</h1>
      <button class="btn-add" @click="() => { editingEvent = null; showAddDialog = true; }">+ 新增事件</button>
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
            <button class="edit" @click="() => { editingEvent = event; showAddDialog = true; }">编辑</button>
            <button class="del" @click="handleDelete(event.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <AddEventDialog
      v-if="showAddDialog"
      :event="editingEvent"
      @save="handleSave"
      @close="showAddDialog = false"
    />
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
</style>
