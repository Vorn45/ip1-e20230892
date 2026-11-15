<script setup lang="ts">
import { onMounted } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import { useProjectStore } from '../stores/projectStore';
import LoadingState from '../components/LoadingState.vue';
import EmptyState from '../components/EmptyState.vue';
import ErrorState from '../components/ErrorState.vue';

const taskStore = useTaskStore();
const projectStore = useProjectStore();

onMounted(async () => {
  if (projectStore.projects.length === 0) {
    await projectStore.fetchProjects();
  }
  await taskStore.fetchExplorerTasks();
});

function handleSearchInput(e: Event) {
  const val = (e.target as HTMLInputElement).value;
  taskStore.fetchExplorerTasks({ search: val, page: 1 });
}

function handleStatusFilter(e: Event) {
  const val = (e.target as HTMLSelectElement).value;
  taskStore.fetchExplorerTasks({ status: val as any, page: 1 });
}

function handlePriorityFilter(e: Event) {
  const val = (e.target as HTMLSelectElement).value;
  taskStore.fetchExplorerTasks({ priority: val as any, page: 1 });
}

function handleProjectFilter(e: Event) {
  const val = (e.target as HTMLSelectElement).value;
  taskStore.fetchExplorerTasks({
    projectId: val === 'ALL' ? 'ALL' : Number(val),
    page: 1
  });
}

function getProjectName(projectId: number): string {
  const found = projectStore.projects.find((p) => p.id === projectId);
  return found ? found.title : `Project #${projectId}`;
}

function getPriorityClass(p: string) {
  switch (p) {
    case 'HIGH':
      return 'badge-high';
    case 'MEDIUM':
      return 'badge-med';
    default:
      return 'badge-low';
  }
}

function getStatusClass(s: string) {
  switch (s) {
    case 'TODO':
      return 'badge-todo';
    case 'IN_PROGRESS':
      return 'badge-prog';
    case 'IN_REVIEW':
      return 'badge-rev';
    case 'DONE':
      return 'badge-done';
    default:
      return 'badge-default';
  }
}
</script>

<template>
  <div class="page-container">
    <div class="header-section">
      <div>
        <h1 class="page-title">Cross-Project Task Explorer</h1>
        <p class="page-subtitle">
          Search, filter, and paginate tasks across all team projects (Stretch Feature).
        </p>
      </div>
    </div>

    <!-- Filters Bar -->
    <div class="filter-card">
      <div class="filter-grid">
        <!-- Search Keyword -->
        <div class="filter-item search-item">
          <label class="filter-label">Search Keyword</label>
          <input
            :value="taskStore.filterOptions.search"
            type="text"
            placeholder="Search tasks by title or details..."
            class="form-control"
            @input="handleSearchInput"
          />
        </div>

        <!-- Project Filter -->
        <div class="filter-item">
          <label class="filter-label">Project</label>
          <select
            :value="taskStore.filterOptions.projectId"
            class="form-control"
            @change="handleProjectFilter"
          >
            <option value="ALL">All Projects</option>
            <option
              v-for="p in projectStore.projects"
              :key="p.id"
              :value="p.id"
            >
              {{ p.title }}
            </option>
          </select>
        </div>

        <!-- Status Filter -->
        <div class="filter-item">
          <label class="filter-label">Status</label>
          <select
            :value="taskStore.filterOptions.status"
            class="form-control"
            @change="handleStatusFilter"
          >
            <option value="ALL">All Statuses</option>
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="IN_REVIEW">In Review</option>
            <option value="DONE">Done</option>
          </select>
        </div>

        <!-- Priority Filter -->
        <div class="filter-item">
          <label class="filter-label">Priority</label>
          <select
            :value="taskStore.filterOptions.priority"
            class="form-control"
            @change="handlePriorityFilter"
          >
            <option value="ALL">All Priorities</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        <!-- Reset Button -->
        <div class="filter-item reset-col">
          <button
            type="button"
            class="btn btn-outline reset-btn"
            @click="taskStore.resetFilters()"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <ErrorState
      v-if="taskStore.error"
      :message="taskStore.error"
      :retryable="true"
      @retry="taskStore.fetchExplorerTasks()"
    />

    <!-- Loading State -->
    <LoadingState
      v-else-if="taskStore.isLoading"
      message="Fetching tasks..."
      :card-count="3"
    />

    <!-- Empty State -->
    <EmptyState
      v-else-if="taskStore.paginatedTasks.data.length === 0"
      title="No tasks match your filters"
      description="Try clearing your search keyword or relaxing status and priority filters."
      action-text="Reset All Filters"
      @action="taskStore.resetFilters()"
    />

    <!-- Table of Tasks -->
    <div v-else class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Task Title</th>
            <th>Project</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="task in taskStore.paginatedTasks.data"
            :key="task.id"
            class="table-row"
            @click="$router.push(`/projects/${task.projectId}`)"
          >
            <td class="code-cell">#{{ task.id }}</td>
            <td class="title-cell">
              <span class="task-title-link">{{ task.title }}</span>
            </td>
            <td class="project-cell">{{ getProjectName(task.projectId) }}</td>
            <td>
              <span :class="['badge', getStatusClass(task.status)]">
                {{ task.status.replace('_', ' ') }}
              </span>
            </td>
            <td>
              <span :class="['badge', getPriorityClass(task.priority)]">
                {{ task.priority }}
              </span>
            </td>
            <td class="date-cell">{{ task.dueDate }}</td>
            <td class="assignee-cell">User #{{ task.assigneeId }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination Controls (Stretch Feature) -->
      <div class="pagination-footer">
        <span class="pagination-summary">
          Showing page {{ taskStore.paginatedTasks.page }} of
          {{ taskStore.paginatedTasks.totalPages }}
          ({{ taskStore.paginatedTasks.totalCount }} total tasks)
        </span>

        <div class="pagination-buttons">
          <button
            type="button"
            class="btn btn-sm btn-outline"
            :disabled="taskStore.paginatedTasks.page <= 1"
            @click="taskStore.setPage(taskStore.paginatedTasks.page - 1)"
          >
            « Previous
          </button>

          <button
            v-for="p in taskStore.paginatedTasks.totalPages"
            :key="p"
            type="button"
            :class="[
              'btn btn-sm page-num-btn',
              p === taskStore.paginatedTasks.page ? 'btn-primary' : 'btn-outline'
            ]"
            @click="taskStore.setPage(p)"
          >
            {{ p }}
          </button>

          <button
            type="button"
            class="btn btn-sm btn-outline"
            :disabled="taskStore.paginatedTasks.page >= taskStore.paginatedTasks.totalPages"
            @click="taskStore.setPage(taskStore.paginatedTasks.page + 1)"
          >
            Next »
          </button>
        </div>
      </div>
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
  margin-bottom: 1.5rem;
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

.filter-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.filter-grid {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1fr auto;
  gap: 1rem;
  align-items: flex-end;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.filter-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
}

.reset-col {
  justify-content: flex-end;
}

.reset-btn {
  height: 2.5rem;
  white-space: nowrap;
}

.table-container {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  overflow: hidden;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.data-table th {
  background: #f8fafc;
  padding: 0.85rem 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  border-bottom: 1px solid #e2e8f0;
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.875rem;
}

.table-row {
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.table-row:hover {
  background-color: #f8fafc;
}

.code-cell {
  font-weight: 700;
  color: #94a3b8;
}

.title-cell {
  font-weight: 600;
  color: #0f172a;
}

.task-title-link {
  color: #0f172a;
  text-decoration: none;
}

.task-title-link:hover {
  color: #2563eb;
}

.project-cell {
  color: #475569;
}

.date-cell {
  color: #64748b;
  white-space: nowrap;
}

.assignee-cell {
  color: #64748b;
}

.pagination-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
}

.pagination-summary {
  font-size: 0.875rem;
  color: #64748b;
}

.pagination-buttons {
  display: flex;
  gap: 0.35rem;
}

.page-num-btn {
  min-width: 2.25rem;
}

@media (max-width: 900px) {
  .filter-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
