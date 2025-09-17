<script setup>
import { onMounted, ref } from 'vue';
import { api } from '@/api/api.js';
import { useAuth } from '@/stores/auth.js';
import router from '@/router/index.js';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const username = ref('');
const password = ref('');
const errors = ref([]);
const isLoading = ref(false);

const auth = useAuth();

const submit = async () => {
  isLoading.value = true;
  errors.value = [];
  try {
    const response = await api.post('auth/register', {
      username: username.value,
      password: password.value,
    });

    if (response.status === 201) {
      auth.token = response.data.token;
      auth.user = response.data.user;
    }
    router.push('/');
  } catch (e) {
    if (e.response) {
      if (e.response.data.errors) {
        errors.value = [...e.response.data.errors];
      }
      if (e.response.status === 401) {
        errors.value.push('Invalid credentials');
      }
    } else {
      errors.value.push(e.message);
    }
  }
  isLoading.value = false;
};
</script>

<template>
  <div class="flex flex-col gap-4 justify-center items-center min-h-screen">
    <LoadingSpinner v-if="isLoading"/>
    <h1 class="text-center text-2xl text-sky-500 font-bold">Register New User</h1>
    <!--errors-->
    <ul v-if="errors.length > 0" class="self-center text-red-500 font-bold">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
    <form v-on:submit.prevent="submit" class="flex flex-col gap-4 items-center">
      <div class="flex flex-col gap-1">
        <label for="username" class="pl-1">Username</label>
        <input
          v-model="username"
          type="text"
          class="border border-gray-300 rounded-sm pl-1 py-1 focus:outline-sky-400 focus:outline-1 focus:ring-0"
          name="username"
          id="username"
          placeholder="Username"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="password" class="pl-1">Password</label>
        <input
          v-model="password"
          type="password"
          class="border border-gray-300 rounded-sm pl-1 py-1 focus:outline-sky-400 focus:outline-1 focus:ring-0"
          name="password"
          id="password"
          placeholder="Password"
        />
      </div>
      <button
        type="submit"
        class="px-2 py-1 rounded-sm bg-sky-500 hover:bg-sky-400 cursor-pointer text-white font-bold"
      >
        Login
      </button>
    </form>
  </div>
</template>

<style scoped></style>
