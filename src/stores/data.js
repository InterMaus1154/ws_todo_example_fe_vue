import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useData = defineStore('user_data', () => {
  const todos = ref([]);
  const categories = ref([]);
  return { todos, categories };
});
