<script setup>
import { api } from '@/api/api.js';
import { useData } from '@/stores/data.js';
import {ref} from 'vue';

const props = defineProps({
  todo: Object,
});

const data = useData();

const importance = ref(Object.keys(data.importance).find(k => data.importance[k] === props.todo.todoImportance));

const deleteTodo = async () => {
  try {
    if (window.confirm('Are you sure to delete this todo?')) {
      await api.delete(`/todos/${props.todo.todoId}`);
      data.removeTodoById(props.todo.todoId);
    }
  } catch (e) {
    if (e.response) {
      if (e.response.status === 404) {
        alert("Todo doesn't exist anymore!");
        data.removeTodoById(props.todo.todoId);
      } else if (e.response.status === 403) {
        alert('Unauthorized!');
      } else if (e.response.status === 500) {
        alert('Unhandled server error');
      }
    } else {
      alert('Network error');
      console.log(e);
    }
  }
};

const toggleTodoStatus = async () => {
  try {
    const response = await api.patch(`/todos/${props.todo.todoId}`);
    if (response.status === 200) {
      data.updateTodoById(props.todo.todoId, response.data.todo);
    }
  } catch (e) {
    if (e.response) {
      if (e.response.status === 404) {
        alert("Todo doesn't exist anymore!");
        data.removeTodoById(props.todo.todoId);
      } else if (e.response.status === 403) {
        alert('Unauthorized!');
      } else if (e.response.status === 500) {
        alert('Unhandled server error');
      }
    } else {
      alert('Network error');
      console.log(e);
    }
  }
};
</script>

<template>
  <div
    class="p-4 flex flex-col gap-2 border border-gray-200 shadow-sm rounded-sm hover:shadow-md hover:scale-105 transition-all duration-300"
  >
    <div class="grid grid-cols-[1fr_auto_1fr] gap-2">
      <div class="flex gap-1">
        <span class="text-gray-400">{{ props.todo.todoDueDate }}</span>
        <span v-if="props.todo.overdue" class="text-red-500 font-bold">!</span>
      </div>
      <p
        class="text-center text-gray-600"
        :class="{ 'line-through decoration-2 decoration-green-500': props.todo.todoCompleted }"
      >
        {{ props.todo.todoTitle }}
      </p>
      <div class="justify-self-end flex gap-2 text-sm">
        <button class="text-sky-500 hover:text-sky-400 cursor-pointer" @click="toggleTodoStatus">
          <template v-if="!props.todo.todoCompleted">Do</template>
          <template v-else>Undo</template>
        </button>
        <button class="text-sky-500 hover:text-sky-400 cursor-pointer">Edit</button>
        <button class="text-sky-500 hover:text-sky-400 cursor-pointer" @click="deleteTodo">
          Delete
        </button>
      </div>
    </div>
    <div class="flex justify-between gap-2">
      <p class="font-bold text-gray-600">{{importance === "None" ? "-" : importance}}</p>
      <p class="font-bold text-gray-600">{{props.todo.categoryName}}</p>
    </div>
    <p>{{props.todo.todoDescription}}</p>
  </div>
</template>
