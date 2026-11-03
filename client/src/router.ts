import { createRouter, createWebHistory } from 'vue-router'
import TimelinePage from './views/TimelinePage.vue'
import AdminPage from './views/AdminPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: TimelinePage },
    { path: '/admin', component: AdminPage },
  ],
})

export default router
