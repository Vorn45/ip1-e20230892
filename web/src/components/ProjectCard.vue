<script setup lang="ts">
import { computed } from 'vue';
import type { Project } from '../types';

const props = defineProps<{
  project: Project;
}>();

const statusClass = computed(() => {
  switch (props.project.status) {
    case 'ACTIVE':
      return 'badge-active';
    case 'PLANNING':
      return 'badge-planning';
    case 'COMPLETED':
      return 'badge-completed';
    case 'ARCHIVED':
      return 'badge-archived';
    default:
      return 'badge-default';
  }
});

const isOverdue = computed(() => {
  if (props.project.status === 'COMPLETED') return false;
  return new Date(props.project.deadline) < new Date();
});
</script>

<template>
  <div class="project-card">
    <div class="card-header">
      <span class="project-id">#{{ project.id }}</span>
      <span :class="['badge', statusClass]">{{ project.status }}</span>
    </div>

    <h3 class="card-title">
      <router-link :to="`/projects/${project.id}`" class="title-link">
        {{ project.title }}
      </router-link>
    </h3>

    <p class="card-desc">{{ project.description }}</p>

    <div class="card-meta">
      <div class="meta-item">
        <span class="meta-label">Deadline:</span>
        <span :class="['meta-value', isOverdue ? 'text-danger' : '']">
          {{ project.deadline }} {{ isOverdue ? '(Overdue)' : '' }}
        </span>
      </div>
    </div>

    <div class="card-footer">
      <router-link :to="`/projects/${project.id}`" class="btn btn-sm btn-outline">
        View Project Details →
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
  border-color: #cbd5e1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.project-id {
  font-size: 0.8rem;
  font-weight: 700;
  color: #94a3b8;
}

.card-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.35;
}

.title-link {
  color: #0f172a;
  text-decoration: none;
  transition: color 0.15s ease;
}

.title-link:hover {
  color: #2563eb;
}

.card-desc {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 1.25rem;
  flex-grow: 1;
}

.card-meta {
  border-top: 1px solid #f1f5f9;
  padding-top: 0.75rem;
  margin-bottom: 1rem;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
}

.meta-label {
  color: #64748b;
}

.meta-value {
  color: #1e293b;
  font-weight: 600;
}

.text-danger {
  color: #dc2626 !important;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
