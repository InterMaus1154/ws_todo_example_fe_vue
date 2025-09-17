<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { onMounted, ref } from 'vue';
import { useAuth } from '@/stores/auth.js';
import { api } from '@/api/api.js';
import router from '@/router/index.js';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const auth = useAuth();
const isLoading = ref(true);

onMounted(async () => {
  if (auth.token) {
    try {
      await api.get('/validate-token');
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
  <div class="flex flex-col min-h-screen">
    <HeaderComponent />
    <main class="flex-1 p-4">
      <template v-if="isLoading">
        <LoadingSpinner />
      </template>
      <RouterView v-else></RouterView>
    </main>
    <FooterComponent />
  </div>
</template>
