<script setup>
import { onMounted } from 'vue';
import { api } from '@/api/api.js';

onMounted(async () => {
  try {
    const response = await api.get('/todos');
    console.log(response.data);
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <h1 class="font-bold text-xl">This is home</h1>
</template>

<style scoped></style>
