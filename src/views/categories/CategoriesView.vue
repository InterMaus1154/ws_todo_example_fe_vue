<script setup>
import { ref } from 'vue';
import CreateModal from '@/views/categories/CreateModal.vue';

const isModalOpen = ref(false);

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <div class="grid grid-cols-[1fr_auto_1fr]">
    <div></div>
    <h1 class="text-sky-500 font-bold text-xl text-center">My Categories</h1>
    <button
      @click="isModalOpen = true"
      class="justify-self-end w-8 h-8 cursor-pointer text-2xl font-bold text-sky-500 border-2 border-sky-500 rounded-full flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors"
    >
      +
    </button>
  </div>
  <CreateModal v-if="isModalOpen" :close-method="closeModal"/>
</template>

<style scoped></style>
