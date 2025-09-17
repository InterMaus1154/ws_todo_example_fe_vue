<script setup>
import { onMounted, ref } from 'vue';
import { useAuth } from '@/stores/auth.js';
import { api } from '@/api/api.js';
import router from '@/router/index.js';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const auth = useAuth();
const isLoading = ref(true);

onMounted(async () => {
  // if there is a saved token in localstorage, validate on page load
  // as token might be expired
  if (auth.token) {
    try {
      await api.get('/validate-token');
      // server returns 204, no need to check it
    } catch (e) {
      if (e.response) {
        if (e.response.status === 401) {
          auth.logout();
          router.push("/login");
        }
      }
    }
  }
  isLoading.value = false;

});
</script>

<template>
<!--    <LoadingSpinner v-if="isLoading"/>-->
    <RouterView></RouterView>
</template>
