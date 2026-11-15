<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
  title: string;
  description: string;
  actionText?: string;
}>();

const emit = defineEmits<{
  (e: 'action'): void;
}>();
</script>

<template>
  <div class="empty-card">
    <Icon icon="mdi:folder-outline" width="48" height="48" class="empty-icon" />
    <h3 class="empty-title">{{ title }}</h3>
    <p class="empty-desc">{{ description }}</p>
    <button
      v-if="actionText"
      type="button"
      class="btn btn-outline empty-action"
      @click="emit('action')"
    >
      {{ actionText }}
    </button>
  </div>
</template>

<style scoped>
.empty-card {
  background: #ffffff;
  border: 2px dashed #cbd5e1;
  border-radius: 0.75rem;
  padding: 3.5rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1.5rem 0;
}

.empty-icon {
  font-size: 2.75rem;
  margin-bottom: 0.75rem;
  opacity: 0.8;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.empty-desc {
  font-size: 0.95rem;
  color: #64748b;
  max-width: 450px;
  line-height: 1.5;
  margin-bottom: 1.25rem;
}

.empty-action {
  cursor: pointer;
}
</style>
