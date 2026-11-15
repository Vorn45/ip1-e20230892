<script setup lang="ts">
import { onMounted } from 'vue';
import { useProjectStore } from '../stores/projectStore';
import ProjectCard from '../components/ProjectCard.vue';
import LoadingState from '../components/LoadingState.vue';
import EmptyState from '../components/EmptyState.vue';
import ErrorState from '../components/ErrorState.vue';

const projectStore = useProjectStore();

onMounted(() => {
  projectStore.fetchProjects();
});

function handleResetFilters() {
  projectStore.searchQuery = '';
  projectStore.statusFilter = 'ALL';
}
</script>

<template>
  <div class="page-container">
    <!-- Header Banner -->
    <div class="header-section">
      <div>
        <h1 class="page-title">Projects Dashboard</h1>
        <p class="page-subtitle">
          Manage team workspaces, deliverables, and sprint timelines.
        </p>
      </div>

      <router-link to="/projects/new" class="btn btn-primary">
        + Create New Project
      </router-link>
    </div>

    <!-- Quick Metrics Bar -->
    <div class="metrics-grid">
      <div class="metric-card">
        <span class="metric-label">Total Projects</span>
        <span class="metric-value">{{ projectStore.totalProjects }}</span>
      </div>
      <div class="metric-card">
        <span class="metric-label">Active Sprints</span>
        <span class="metric-value text-success">{{ projectStore.activeCount }}</span>
      </div>
      <div class="metric-card">
        <span class="metric-label">In Planning</span>
        <span class="metric-value text-info">{{ projectStore.planningCount }}</span>
      </div>
      <div class="metric-card">
        <span class="metric-label">Completed</span>
        <span class="metric-value text-muted">{{ projectStore.completedCount }}</span>
      </div>
    </div>

    <!-- Search & Filter Controls -->
    <div class="filter-bar">
      <div class="search-box">
        <input
          v-model="projectStore.searchQuery"
          type="text"
          placeholder="Search projects by title or description..."
          class="form-control"
        />
      </div>

      <div class="select-box">
        <select v-model="projectStore.statusFilter" class="form-control">
          <option value="ALL">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="PLANNING">Planning</option>
          <option value="COMPLETED">Completed</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>
    </div>

    <!-- Error State -->
    <ErrorState
      v-if="projectStore.error"
      :message="projectStore.error"
      :retryable="true"
      @retry="projectStore.fetchProjects()"
    />

    <!-- Loading State -->
    <LoadingState
      v-else-if="projectStore.isLoading"
      message="Loading projects from mock API..."
      :card-count="4"
    />

    <!-- Empty State -->
    <EmptyState
      v-else-if="projectStore.filteredProjects.length === 0"
      title="No projects found"
      :description="
        projectStore.searchQuery || projectStore.statusFilter !== 'ALL'
          ? 'No projects match your current search and filter criteria.'
          : 'You haven\'t created any projects yet. Get started by creating your first project.'
      "
      :action-text="
        projectStore.searchQuery || projectStore.statusFilter !== 'ALL'
          ? 'Reset Filters'
          : '+ Create New Project'
      "
      @action="
        projectStore.searchQuery || projectStore.statusFilter !== 'ALL'
          ? handleResetFilters()
          : $router.push('/projects/new')
      "
    />

    <!-- Projects Grid -->
    <div v-else class="projects-grid">
      <ProjectCard
        v-for="project in projectStore.filteredProjects"
        :key="project.id"
        :project="project"
      />
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.75rem;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #0f172a;
}

.page-subtitle {
  font-size: 0.95rem;
  color: #64748b;
  margin-top: 0.25rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.metric-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.metric-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-value {
  font-size: 1.75rem;
  font-weight: 800;
  color: #0f172a;
}

.text-success {
  color: #16a34a !important;
}

.text-info {
  color: #0284c7 !important;
}

.filter-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.search-box {
  flex: 1;
}

.select-box {
  width: 200px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
}
</style>
