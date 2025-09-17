<script setup>
import { ref } from 'vue';
import CreateModal from '@/views/categories/CreateModal.vue';
import { api } from '@/api/api.js';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useData } from '@/stores/data.js';
import UpdateModal from '@/views/categories/UpdateModal.vue';

const isCreateModalOpen = ref(false);
const isUpdateModalOpen = ref(false);

const closeCreateModal = () => {
  isCreateModalOpen.value = false;
};

const closeUpdateModal = () => {
  isUpdateModalOpen.value = false;
};

const selectedCategory = ref();

const data = useData();

const deleteCategory = async (categoryId) => {
  if (window.confirm('Are you sure to delete this category?')) {
    try {
      const response = await api.delete(`/categories/${categoryId}`);
      if (response.status === 204) {
        data.removeCategoryById(categoryId);
      }
    } catch (e) {
      if (e.response) {
        if (e.response.status === 403) {
          alert('Unauthorized!');
        }
        if(e.response.status === 404){
          alert("The category no longer exists!");
          data.categories = data.categories.filter((cat) => cat.categoryId !== categoryId);
        }
      } else {
        alert('Network error');
        console.log(e);
      }
    }
  }
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-[1fr_auto_1fr]">
      <div></div>
      <h1 class="text-sky-500 font-bold text-xl text-center">My Categories</h1>
      <button
        @click="isCreateModalOpen = true"
        class="justify-self-end w-8 h-8 cursor-pointer text-2xl font-bold text-sky-500 border-2 border-sky-500 rounded-full flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors"
      >
        +
      </button>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div
        class="p-4 border border-gray-200 shadow-sm rounded-sm hover:shadow-md hover:scale-105 transition-all duration-300"
        v-for="category in data.categories"
        :key="category.categoryId"
      >
        <p class="text-center text-gray-600">{{ category.categoryName }}</p>
        <div class="flex gap-2">
          <button class="text-sky-500 hover:text-sky-400 cursor-pointer" @click="deleteCategory(category.categoryId)">
            Delete
          </button>
          <button class="text-sky-500 hover:text-sky-400 cursor-pointer" @click="selectedCategory = category; isUpdateModalOpen = true">Edit</button>
        </div>
      </div>
    </div>
  </div>
  <CreateModal v-if="isCreateModalOpen" :close-method="closeCreateModal" />
  <UpdateModal v-if="isUpdateModalOpen" :close-method="closeUpdateModal" :category="selectedCategory"/>
</template>

<style scoped></style>
