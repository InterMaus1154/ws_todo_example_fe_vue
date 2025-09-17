import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CategoriesView from '@/views/categories/CategoriesView.vue';
import { useAuth } from '@/stores/auth.js';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LayoutView from '@/views/LayoutView.vue';

const protectedRoutes = [
  {
    path: '/',
    component: LayoutView,
    meta: {requiresAuth: true},
    children: [
      {
        path: '/',
        component: HomeView,
      },
      {
        path: '/categories',
        component: CategoriesView,
      }
    ]
  }
];

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
      path: '/register',
      component: RegisterView
    },
    ...protectedRoutes
  ],
});

router.beforeEach((to, from) => {
  const auth = useAuth();
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return '/login';
  }
});

export default router;
