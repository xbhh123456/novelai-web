import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/desktop/DeskTop.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      component: () => import('@/views/login/LoginIndex.vue'),
    },
    {
      path: '/back',
      component: () => import('@/views/backend/BackManage.vue'),
      meta: { requiresAuth: true },
    },
  ],
})


export default router
