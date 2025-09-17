<script setup>
import { onMounted, ref } from 'vue';
import { api } from '@/api/api.js';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const isLoading = ref(true);

onMounted(async () => {
  try {
    const response = await api.get('/todos');
    console.log(response.data);
  } catch (e) {
    console.log(e);
  }
  isLoading.value = false;
});
</script>

<template>
<!--  <LoadingSpinner v-if="isLoading" />-->
  <div class="grid grid-cols-[1fr_auto_1fr]">
    <div></div>
    <h1 class="text-sky-500 font-bold text-xl text-center">My Todos</h1>
    <button
      class="justify-self-end w-8 h-8 cursor-pointer text-2xl font-bold text-sky-500 border-2 border-sky-500 rounded-full flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors"
    >
      +
    </button>
  </div>
</template>

<style scoped></style>
