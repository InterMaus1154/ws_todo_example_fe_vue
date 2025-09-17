<script setup lang="ts">
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <HeaderComponent />
    <main class="flex-1 p-4">
      <RouterView></RouterView>
    </main>
    <FooterComponent />
  </div>
</template>

<style scoped></style>
