<script setup>
import { api } from '@/api/api.js';
import { useData } from '@/stores/data.js';

const props = defineProps({
  todo: Object,
});

const data = useData();

const deleteTodo = async () => {
  try{
    await api.delete(`/todos/${props.todo.todoId}`);
  }catch (e){
    if(e.response){
      if(e.response.status === 404){
        alert("Todo doesn't exist anymore!");
        data.removeTodoById(props.todo.todoId);
      }else if(e.response.status === 403){
        alert("Unauthorized!");
      }
    }else{
      alert("Network error");
      console.log(e);
    }
  }
};
</script>

<template>
  <div
    class="p-4 border border-gray-200 shadow-sm rounded-sm hover:shadow-md hover:scale-105 transition-all duration-300"
  >
    <div class="grid grid-cols-[1fr_auto_1fr] gap-2">
      <div class="flex gap-1">
        <span class="text-gray-400">{{ props.todo.todoDueDate }}</span>
        <span v-if="props.todo.overdue" class="text-red-500 font-bold">!</span>
      </div>
      <p class="text-center text-gray-600">{{ props.todo.todoTitle }}</p>
      <div class="justify-self-end flex gap-2 text-sm">
        <button class="text-sky-500 hover:text-sky-400 cursor-pointer">Edit</button>
        <button class="text-sky-500 hover:text-sky-400 cursor-pointer" @click="deleteTodo">Delete</button>
      </div>
    </div>
  </div>
</template>
