<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string;
    cardCount?: number;
  }>(),
  {
    message: 'Loading data...',
    cardCount: 3
  }
);
</script>

<template>
  <div class="loading-container">
    <div class="spinner-row">
      <div class="spinner"></div>
      <span class="loading-text">{{ message }}</span>
    </div>

    <div class="skeleton-grid">
      <div v-for="n in cardCount" :key="n" class="skeleton-card">
        <div class="skeleton-line line-title"></div>
        <div class="skeleton-line line-desc"></div>
        <div class="skeleton-line line-short"></div>
        <div class="skeleton-bar"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-container {
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.spinner-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 500;
}

.spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 2.5px solid #cbd5e1;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
}

.skeleton-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.skeleton-line {
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 0.25rem;
}

.line-title {
  height: 1.25rem;
  width: 70%;
}

.line-desc {
  height: 0.85rem;
  width: 95%;
}

.line-short {
  height: 0.85rem;
  width: 50%;
}

.skeleton-bar {
  height: 0.5rem;
  width: 100%;
  background: #e2e8f0;
  border-radius: 0.25rem;
  margin-top: 0.5rem;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
