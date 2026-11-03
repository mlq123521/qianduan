<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Event, EventFilter } from '../api/events'
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../api/events'
import FilterBar from '../components/FilterBar.vue'
import AddEventDialog from '../components/AddEventDialog.vue'

const events = ref<Event[]>([])
const loading = ref(false)
const showAddDialog = ref(false)
const editingEvent = ref<Event | null>(null)
const isAdmin = ref(false)

async function load(filter?: EventFilter) {
  loading.value = true
  try {
    events.value = await fetchEvents(filter)
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
      <h1>事件时间轴</h1>
      <button v-if="isAdmin" class="btn-add" @click="() => { editingEvent = null; showAddDialog = true; }">+ 新增</button>
      <button class="btn-admin" @click="isAdmin = !isAdmin">{{ isAdmin ? '退出管理' : '管理' }}</button>
    </header>

    <FilterBar @filter="load" />

    <div class="timeline">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="!events.length" class="empty">暂无事件</div>
      <div v-for="event in events" :key="event.id" class="item">
        <div class="date">{{ new Date(event.date).toLocaleDateString('zh-CN') }}</div>
        <div class="line"></div>
        <div class="dot" :class="event.type"></div>
        <div class="card">
          <span class="tag" :class="event.type">{{ event.type }}</span>
          <h3>{{ event.title }}</h3>
          <p v-if="event.description">{{ event.description }}</p>
          <div v-if="event.tags?.length" class="tags">
            <span v-for="t in event.tags" :key="t">{{ t }}</span>
          </div>
          <div v-if="isAdmin" class="actions">
            <button class="edit" @click="() => { editingEvent = event; showAddDialog = true; }">编辑</button>
            <button class="del" @click="handleDelete(event.id)">删除</button>
          </div>
        </div>
      </div>
    </div>

    <AddEventDialog
      v-if="showAddDialog"
      :event="editingEvent"
      @save="handleSave"
      @close="showAddDialog = false"
    />
  </div>
</template>

<style scoped>
.page { max-width: 800px; margin: 0 auto; padding: 20px; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
h1 { font-size: 24px; }
.btn-add { padding: 8px 20px; background: #3b82f6; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
.btn-admin { padding: 6px 14px; background: #f3f4f6; border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer; font-size: 13px; margin-left: 8px; }

.timeline { position: relative; padding-left: 100px; }

.item { position: relative; margin-bottom: 30px; }

.date {
  position: absolute;
  left: -100px;
  width: 90px;
  text-align: right;
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
  padding-top: 12px;
}

.line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: -30px;
  width: 2px;
  background: #e2e8f0;
}
.item:last-child .line { bottom: 0; }

.dot {
  position: absolute;
  left: -6px;
  top: 14px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid;
}
.dot.feature { border-color: #3b82f6; }
.dot.bugfix { border-color: #ef4444; }
.dot.doc { border-color: #22c55e; }
.dot.other { border-color: #6b7280; }

.card {
  margin-left: 20px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 14px;
}
.tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 6px;
}
.tag.feature { background: #eff6ff; color: #3b82f6; }
.tag.bugfix { background: #fef2f2; color: #ef4444; }
.tag.doc { background: #f0fdf4; color: #22c55e; }
.tag.other { background: #f3f4f6; color: #6b7280; }
h3 { font-size: 15px; margin: 0 0 6px 0; }
p { font-size: 14px; color: #64748b; margin: 0 0 8px 0; }
.tags { display: flex; gap: 4px; margin-bottom: 8px; }
.tags span { background: #f1f5f9; padding: 1px 6px; border-radius: 3px; font-size: 11px; color: #64748b; }
.actions { display: flex; gap: 8px; margin-top: 8px; padding-top: 8px; border-top: 1px solid #f1f5f9; }
.edit { padding: 4px 10px; border: 1px solid #e2e8f0; border-radius: 4px; background: #fff; cursor: pointer; font-size: 12px; }
.del { padding: 4px 10px; border: 1px solid #e2e8f0; border-radius: 4px; background: #fff; cursor: pointer; font-size: 12px; color: #ef4444; }

.loading, .empty { text-align: center; color: #94a3b8; padding: 40px; }
</style>
