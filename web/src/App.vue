<script setup lang="ts">
import { onMounted } from 'vue';
import HeaderBar from './components/HeaderBar.vue';
import { useUserStore } from './stores/userStore';

const userStore = useUserStore();

onMounted(() => {
  userStore.loadUsers();
});
</script>

<template>
  <div class="app-layout">
    <HeaderBar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
}

.main-content {
  flex: 1;
}
</style>
