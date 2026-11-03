<script setup lang="ts">
import type { Event } from '../api/events'

defineProps<{ event: Event; index: number }>()
defineEmits<{
  (e: 'expand', event: Event): void
  (e: 'delete', id: number): void
  (e: 'edit', event: Event): void
}>()

const typeColor: Record<string, string> = {
  feature: 'var(--feature)',
  bugfix: 'var(--bugfix)',
  doc: 'var(--doc)',
  other: 'var(--other)',
}
</script>

<template>
  <div class="timeline-item" :class="{ left: index % 2 === 0, right: index % 2 !== 0 }">
    <div class="dot" :style="{ background: typeColor[event.type] }"></div>
    <div class="card" @click="$emit('expand', event)">
      <div class="card-header">
        <span class="type-badge" :style="{ background: typeColor[event.type] + '22', color: typeColor[event.type] }">{{ event.type }}</span>
        <span class="date">{{ new Date(event.date).toLocaleDateString('zh-CN') }}</span>
      </div>
      <h3 class="title">{{ event.title }}</h3>
      <div v-if="event.tags?.length" class="tags">
        <span v-for="tag in event.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <div class="actions" @click.stop>
        <button class="btn-edit" @click="$emit('edit', event)">编辑</button>
        <button class="btn-delete" @click="$emit('delete', event.id)">删除</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  position: relative;
}
.timeline-item.left { flex-direction: row; }
.timeline-item.right { flex-direction: row-reverse; }
.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  margin: 6px 16px;
  box-shadow: 0 0 0 4px var(--bg);
}
.card {
  flex: 1;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 14px 16px;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
}
.card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.type-badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}
.date { color: var(--text-muted); font-size: 13px; }
.title { font-size: 15px; margin-bottom: 6px; }
.tags { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 8px; }
.tag {
  background: var(--bg);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 11px;
  color: var(--text-muted);
}
.actions { display: flex; gap: 8px; margin-top: 8px; }
.btn-edit {
  padding: 4px 10px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: var(--text-muted);
}
.btn-delete {
  padding: 4px 10px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: var(--bugfix);
}
</style>
