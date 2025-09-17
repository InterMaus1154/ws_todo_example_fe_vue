import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useData = defineStore('user_data', () => {
  const todos = ref([]);
  const categories = ref([]);
  const importance = ref([]);

  const setTodos = (newTodos) => {
    todos.value = newTodos;
  };

  const setCategories = (newCategories) => {
    categories.value = newCategories;
  };

  const setImportance = (newImportance) => {
    importance.value = newImportance;
  };

  const addTodo = (todo) => {
    todos.value.push(todo);
  };

  const removeTodoById = (todoId) => {
    todos.value = todos.value.filter((todo) => todo.todoId !== todoId);
  };

  const updateTodoById = (todoId, newTodo) => {
    const index = todos.value.findIndex((todo) => todo.todoId === todoId);
    todos.value[index] = newTodo;
  };

  const addCategory = (category) => {
    categories.value.push(category);
  };

  const removeCategoryById = (categoryId) => {
    categories.value = categories.value.filter((cat) => cat !== categoryId);
  };

  const updateCategoryById = (categoryId, newCategoryName) => {
    const index = categories.value.findIndex((cat) => cat.categoryId === categoryId);
    categories.value[index].categoryName = newCategoryName;
  };

  return {
    todos,
    categories,
    importance,
    addCategory,
    addTodo,
    removeCategoryById,
    updateCategoryById,
    removeTodoById,
    updateTodoById,
    setImportance,
    setCategories,
    setTodos
  };
});
