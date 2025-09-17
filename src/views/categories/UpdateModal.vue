<script setup>
import { ref } from 'vue';
import { api } from '@/api/api.js';
import { useData } from '@/stores/data.js';

const props = defineProps({
  closeMethod: Function,
  category: Object
});

const name = ref(props.category.categoryName);
const isSuccess = ref(false);

const data = useData();

const submit = async () => {
  if (name.value.trim().length === 0) return;

  try {
    const response = await api.put(`/categories/${props.category.categoryId}`, {
      categoryName: name.value,
    });

    if (response.status === 200) {
      isSuccess.value = true;
      const index = data.categories.findIndex(cat => cat.categoryId === props.category.categoryId);
      data.categories[index].categoryName = name.value;
    }
  } catch (e) {
    if (e.response) {
      alert(e.response.message);
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
      <h1 class="text-base text-sky-500 text-center">Update category</h1>
      <p v-if="isSuccess" class="text-green-500 text-center">Category updated</p>
      <form v-on:submit.prevent="submit" class="flex flex-col gap-4 items-center">
        <div class="flex flex-col gap-1">
          <label for="name" class="pl-1 text-sm">Name</label>
          <input
            v-model="name"
            type="text"
            class="border border-gray-300 rounded-sm pl-1 py-1 focus:outline-sky-400 focus:outline-1 focus:ring-0"
            name="name"
            id="name"
            placeholder="Category Name"
          />
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

<style scoped></style>
