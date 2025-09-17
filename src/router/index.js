import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CategoriesView from '@/views/CategoriesView.vue';
import { useAuth } from '@/stores/auth.js';
import LoginView from '@/views/LoginView.vue';

const router = createRouter({
  linkActiveClass: 'text-sky-500',
  linkExactActiveClass: 'text-sky-500',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: LoginView,
    },
    {
      path: '/',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/categories',
      component: CategoriesView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from) => {
  const auth = useAuth();
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return '/login';
  }
});

export default router;
