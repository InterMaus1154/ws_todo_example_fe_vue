<script setup>
import { ref, watch } from 'vue';
import { useAuth } from '@/stores/auth.js';
import { api } from '@/api/api.js';
import router from '@/router/index.js';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useData } from '@/stores/data.js';

const auth = useAuth();
const data = useData();
const isLoading = ref(false);

const loadData = async () => {
  isLoading.value = true;
  // if there is a saved token in localstorage, validate on page load
  // as token might be expired
  // then if valid, load all todos and categories
  try {
    const response = await api.get('/validate-token');
    if (response.status === 200) {
      auth.setUser(response.data.user);

      const categories = await api.get('/categories');
      data.setCategories(categories.data.categories);

      const todos = await api.get('/todos');
      data.setTodos(todos.data.todos);

      const importance = await api.get('/todo-importance');
      data.setImportance(importance.data.importance);
    }
  } catch (e) {
    if (e.response) {
      if (e.response.status === 401) {
        auth.logout();
        router.push('/login');
      }
    }
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => auth.token,
  () => {
    if (auth.token) loadData();
  },
  { immediate: true },
);
</script>

<template>
  <LoadingSpinner v-if="isLoading" />
  <RouterView v-else></RouterView>
</template>
