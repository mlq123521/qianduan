<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Event } from '../api/events'

const props = defineProps<{ event: Event | null }>()
const emit = defineEmits<{
  (e: 'save', data: Partial<Event>): void
  (e: 'close'): void
}>()

const form = ref({
  title: '',
  description: '',
  date: new Date().toISOString().slice(0, 10),
  type: 'other' as Event['type'],
  tags: '',
})

onMounted(() => {
  if (props.event) {
    form.value = {
      title: props.event.title,
      description: props.event.description ?? '',
      date: props.event.date.slice(0, 10),
      type: props.event.type,
      tags: props.event.tags?.join(', ') ?? '',
    }
  }
})

function handleSubmit() {
  if (!form.value.title.trim()) {
    alert('标题不能为空')
    return
  }
  emit('save', {
    ...form.value,
    date: form.value.date,
    tags: form.value.tags.split(',').map(t => t.trim()).filter(Boolean),
  })
}
</script>

<template>
  <div class="dialog-overlay" @click.self="emit('close')">
    <div class="dialog">
      <h2>{{ event ? '编辑事件' : '新增事件' }}</h2>
      <div class="form">
        <label>标题 <input v-model="form.title" placeholder="事件标题" /></label>
        <label>描述 <textarea v-model="form.description" rows="3" placeholder="事件描述"></textarea></label>
        <label>日期 <input v-model="form.date" type="date" /></label>
        <label>
          类型
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
        <button class="btn-cancel" @click="emit('close')">取消</button>
        <button class="btn-submit" @click="handleSubmit">保存</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 200;
}
.dialog {
  background: var(--bg-card);
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 480px;
}
h2 { margin-bottom: 16px; }
.form { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
label { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: var(--text-muted); }
input, textarea, select {
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
  font-size: 14px;
}
.actions { display: flex; gap: 8px; justify-content: flex-end; }
.btn-cancel { padding: 8px 16px; border: 1px solid var(--border); border-radius: 6px; background: transparent; cursor: pointer; color: var(--text); }
.btn-submit { padding: 8px 16px; border: none; border-radius: 6px; background: var(--primary); color: #fff; cursor: pointer; }
</style>
