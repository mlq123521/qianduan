<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <nav class="nav">
    <div class="logo" @click="router.push('/')">时间轴</div>
    <div class="links">
      <button class="link" :class="{ active: router.currentRoute.value.path === '/' }" @click="router.push('/')">主页</button>
      <button class="link" :class="{ active: router.currentRoute.value.path === '/admin' }" @click="router.push('/admin')">管理</button>
    </div>
  </nav>
  <RouterView />
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 10;
}
.logo { font-size: 18px; font-weight: 700; cursor: pointer; color: #3b82f6; }
.links { display: flex; gap: 8px; }
.link {
  padding: 6px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  color: #64748b;
}
.link.active {
  background: #3b82f6;
  color: #fff;
  border-color: #3b82f6;
}
</style>
