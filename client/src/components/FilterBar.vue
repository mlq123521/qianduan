<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'filter', value: { type?: string; startDate?: string; endDate?: string; search?: string }): void
}>()

const type = ref('')
const startDate = ref('')
const endDate = ref('')
const search = ref('')

function apply() {
  emit('filter', { type: type.value || undefined, startDate: startDate.value || undefined, endDate: endDate.value || undefined, search: search.value || undefined })
}

function reset() {
  type.value = ''
  startDate.value = ''
  endDate.value = ''
  search.value = ''
  emit('filter', {})
}
</script>

<template>
  <div class="filter-bar">
    <input v-model="search" type="text" placeholder="搜索标题..." class="filter-input" @input="apply" />
    <select v-model="type" class="filter-select" @change="apply">
      <option value="">所有类型</option>
      <option value="feature">功能</option>
      <option value="bugfix">Bug修复</option>
      <option value="doc">文档</option>
      <option value="other">其他</option>
    </select>
    <input v-model="startDate" type="date" class="filter-input" @change="apply" />
    <input v-model="endDate" type="date" class="filter-input" @change="apply" />
    <button class="btn-reset" @click="reset">重置</button>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  gap: 8px;
  padding: 16px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
}
.filter-input, .filter-select {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
  font-size: 14px;
}
.btn-reset {
  padding: 6px 16px;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
</style>
