<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
  title?: string;
  message: string;
  retryable?: boolean;
}>();

const emit = defineEmits<{
  (e: 'retry'): void;
}>();
</script>

<template>
  <div class="error-banner">
    <Icon icon="mdi:alert-circle-outline" width="24" height="24" class="error-icon" />
    <div class="error-content">
      <h4 class="error-title">{{ title || 'An error occurred' }}</h4>
      <p class="error-message">{{ message }}</p>
    </div>
    <button
      v-if="retryable"
      type="button"
      class="btn btn-sm btn-retry"
      @click="emit('retry')"
    >
      Retry
    </button>
  </div>
</template>

<style scoped>
.error-banner {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-left: 4px solid #ef4444;
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
}

.error-icon {
  font-size: 1.5rem;
  color: #dc2626;
}

.error-content {
  flex: 1;
}

.error-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #991b1b;
  margin-bottom: 0.2rem;
}

.error-message {
  font-size: 0.85rem;
  color: #b91c1c;
}

.btn-retry {
  background-color: #ffffff;
  border: 1px solid #fca5a5;
  color: #b91c1c;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.15s ease;
}

.btn-retry:hover {
  background-color: #fee2e2;
}
</style>
