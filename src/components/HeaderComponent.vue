<script setup>
  import { useAuth } from '@/stores/auth.js';

  const auth = useAuth();
</script>

<template>
  <header class="p-4 flex justify-between gap-4 items-center shadow-sm sticky top-0 left-0 right-0 flex-wrap">
    <h1 class="font-bold text-sky-500 text-xl">Basic Todo App
      <template v-if="auth.isLoggedIn">
         - {{auth.user?.username}}
      </template>
    </h1>
    <nav class="flex gap-4 items-center">
      <template v-if="auth.isLoggedIn">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/categories">Categories</RouterLink>
        <a @click="auth.logout()">Logout</a>
      </template>
      <template v-else>
        <RouterLink to="/login">Login</RouterLink>
      </template>
      <RouterLink to="/register">Register</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
@reference '../assets/app.css';
routerlink,a {
  cursor: pointer;
  position: relative;
  text-decoration: none;
}

routerlink::after, a::after{
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  @apply bg-sky-500;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 300ms ease;
}

routerlink:hover::after, a:hover::after{
  transform: scaleX(1);
}

</style>
