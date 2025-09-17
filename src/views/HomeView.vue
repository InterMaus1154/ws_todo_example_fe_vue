<script setup>
import { ref } from 'vue';
import { api } from '@/api/api.js';
import { useData } from '@/stores/data.js';
import CreateModal from '@/views/todos/CreateModal.vue';
import TodoCard from '@/components/TodoCard.vue';


const isCreateModalOpen = ref(false);
const isUpdateModalOpen = ref(false);

const closeCreateModal = () => {
  isCreateModalOpen.value = false;
};

const closeUpdateModal = () => {
  isUpdateModalOpen.value = false;
};

const data = useData();

</script>

<template>
  <!--  <LoadingSpinner v-if="isLoading" />-->
  <div class="grid grid-cols-[1fr_auto_1fr]">
    <div></div>
    <h1 class="text-sky-500 font-bold text-xl text-center mb-4">My Todos</h1>
    <button
      @click="isCreateModalOpen = true"
      class="justify-self-end w-8 h-8 cursor-pointer text-2xl font-bold text-sky-500 border-2 border-sky-500 rounded-full flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors"
    >
      +
    </button>
  </div>
  <div class="grid grid-cols-4 gap-4" v-if="data.todos.length > 0">
    <TodoCard v-for="todo in data.todos" :key="todo.todoId" :todo="todo"/>
  </div>
  <div class="flex flex-col gap-2 mt-4" v-else>
    <p class="text-gray-400 text-center text-2xl">Nothing to do here:(</p>
    <button class="text-sky-500 hover:text-sky-400 cursor-pointer" @click="isCreateModalOpen = true">Let's get started!</button>
  </div>
  <CreateModal v-if="isCreateModalOpen" :close-method="closeCreateModal"/>
</template>

<style scoped></style>
