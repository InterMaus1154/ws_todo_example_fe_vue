<script setup>
import { reactive, ref } from 'vue';
import { api } from '@/api/api.js';
import { useData } from '@/stores/data.js';

const props = defineProps({
  closeMethod: Function,
  todo: Object
});

const isSuccess = ref(false);
const errors = ref([]);

const form = reactive({
  categoryId: props.todo.categoryId,
  todoTitle: props.todo.todoTitle,
  todoDescription: props.todo.todoDescription,
  todoImportance: props.todo.todoImportance,
  todoDueDate: props.todo.todoDueDate,
});

const data = useData();

const submit = async () => {
  try {
    const response = await api.put(`/todos/${props.todo.todoId}`, {
      categoryId: form.categoryId,
      todoTitle: form.todoTitle,
      todoDescription: form.todoDescription,
      todoImportance: form.todoImportance,
      todoDueDate: form.todoDueDate,
    });

    if (response.status === 200) {
      isSuccess.value = true;
      data.updateTodoById(props.todo.todoId, response.data.todo);

      // reset form fields
      Object.keys(form).forEach((key) => (form[key] = ''));
      props.closeMethod();
    }
  } catch (e) {
    if (e.response) {
      if(e.response.data.errors){
        errors.value = [...e.response.data.errors];
      }
    } else {
      alert('Network error');
      console.log(e);
    }
  }
};
</script>

<template>
  <div class="fixed inset-0 min-h-screen bg-white/60 flex justify-center items-center">
    <div class="p-6 rounded-sm shadow-sm border-gray-400 bg-white relative flex flex-col gap-4">
      <button
        class="font-bold text-sky-500 text-xl absolute right-1 top-1 cursor-pointer"
        @click="closeMethod"
      >
        X
      </button>
      <h1 class="text-base text-sky-500 text-center">Update Todo</h1>
      <p v-if="isSuccess" class="text-green-500 text-center">Todo updated</p>
      <!--errors-->
      <ul v-if="errors.length > 0" class="self-center text-red-500 font-bold">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
      <form v-on:submit.prevent="submit" class="flex flex-col gap-4 items-center">
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-1">
            <label for="title" class="pl-1 text-sm"
            >Title <span class="text-red-500">*</span></label
            >
            <input
              v-model="form.todoTitle"
              type="text"
              class="border border-gray-300 rounded-sm pl-1 py-1 focus:outline-sky-400 focus:outline-1 focus:ring-0"
              id="title"
              placeholder="Todo Item Title"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="description" class="pl-1 text-sm">Description</label>
            <input
              v-model="form.todoDescription"
              type="text"
              class="border border-gray-300 rounded-sm pl-1 py-1 focus:outline-sky-400 focus:outline-1 focus:ring-0"
              id="description"
              placeholder="Description (optional)"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="due_date" class="pl-1 text-sm"
            >Due Date <span class="text-red-500">*</span></label
            >
            <input
              v-model="form.todoDueDate"
              type="date"
              class="border border-gray-300 rounded-sm pl-1 py-1 focus:outline-sky-400 focus:outline-1 focus:ring-0"
              id="due_date"
              placeholder="Due Date"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="category" class="pl-1 text-sm"
            >Category <span class="text-red-500">*</span></label
            >
            <select id="category" v-model="form.categoryId" class="border border-gray-300 rounded-sm pl-1 py-1 focus:outline-sky-400 focus:outline-1 focus:ring-0">
              <option value="" selected="">--Select--</option>
              <option v-for="category in data.categories" :key="category.categoryId" :value="category.categoryId">{{category.categoryName}}</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label for="importance" class="pl-1 text-sm"
            >Importance <span class="text-red-500">*</span></label
            >
            <select id="importance" v-model="form.todoImportance" class="border border-gray-300 rounded-sm pl-1 py-1 focus:outline-sky-400 focus:outline-1 focus:ring-0">
              <option value="" selected="">--Select--</option>
              <option v-for="([key, value]) in Object.entries(data.importance)" :key="key" :value="value">{{key}}</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          class="px-2 py-1 rounded-sm bg-sky-500 hover:bg-sky-400 cursor-pointer text-white font-bold"
        >
          Update
        </button>
      </form>
    </div>
  </div>
</template>
