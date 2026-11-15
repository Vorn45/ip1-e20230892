<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProjectStore } from '../stores/projectStore';
import { useTaskStore } from '../stores/taskStore';
import { useUserStore } from '../stores/userStore';
import type { Task, TaskStatus } from '../types';
import LoadingState from '../components/LoadingState.vue';
import EmptyState from '../components/EmptyState.vue';
import ErrorState from '../components/ErrorState.vue';

const route = useRoute();
const router = useRouter();

const projectStore = useProjectStore();
const taskStore = useTaskStore();
const userStore = useUserStore();

const activeTab = ref<string>('ALL');
const newCommentText = ref<string>('');
const actionMessage = ref<{ type: 'success' | 'error'; text: string } | null>(null);

const projectId = computed(() => Number(route.params.id));

async function loadData() {
  actionMessage.value = null;
  const id = projectId.value;
  if (isNaN(id)) {
    projectStore.error = 'Invalid project ID.';
    return;
  }
  await projectStore.fetchProjectById(id);
  if (projectStore.currentProject) {
    await taskStore.fetchTasksForProject(id);
    if (taskStore.projectTasks.length > 0) {
      taskStore.selectTask(taskStore.projectTasks[0]);
    } else {
      taskStore.selectTask(null);
    }
  }
}

onMounted(() => {
  loadData();
});

watch(
  () => route.params.id,
  () => {
    loadData();
  }
);

const filteredTasks = computed(() => {
  if (activeTab.value === 'ALL') {
    return taskStore.projectTasks;
  }
  return taskStore.projectTasks.filter((t) => t.status === activeTab.value);
});

async function handleStatusChange(task: Task, newStatus: TaskStatus) {
  actionMessage.value = null;
  const currentUser = userStore.currentUser;
  if (!currentUser) return;

  try {
    await taskStore.updateTaskStatus(
      task.id,
      newStatus,
      currentUser.id,
      currentUser.role
    );
    actionMessage.value = {
      type: 'success',
      text: `Task #${task.id} updated to ${newStatus}.`
    };
  } catch (err: unknown) {
    actionMessage.value = {
      type: 'error',
      text: err instanceof Error ? err.message : 'Status update failed.'
    };
  }
}

async function handlePostComment() {
  if (!newCommentText.value.trim() || !taskStore.currentTask) return;
  const currentUser = userStore.currentUser;
  if (!currentUser) return;

  try {
    await taskStore.addComment(
      taskStore.currentTask.id,
      currentUser.id,
      newCommentText.value.trim()
    );
    newCommentText.value = '';
  } catch (err: unknown) {
    actionMessage.value = {
      type: 'error',
      text: err instanceof Error ? err.message : 'Failed to post comment.'
    };
  }
}

async function handleDeleteProject() {
  if (!projectStore.currentProject) return;
  if (window.confirm('Are you sure you want to delete this project?')) {
    await projectStore.deleteProject(projectStore.currentProject.id);
    router.push('/projects');
  }
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
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <router-link to="/projects" class="breadcrumb-link">Projects</router-link>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-current">
        {{ projectStore.currentProject?.title || `Project #${$route.params.id}` }}
      </span>
    </div>

    <!-- Error State (e.g. Project 999 Not Found) -->
    <div v-if="projectStore.error">
      <ErrorState
        title="Project Not Found"
        :message="projectStore.error"
        :retryable="false"
      />
      <div class="actions-row">
        <router-link to="/projects" class="btn btn-outline">
          ← Back to All Projects
        </router-link>
      </div>
    </div>

    <!-- Loading State -->
    <LoadingState
      v-else-if="projectStore.isLoading"
      message="Loading project details and work items..."
      :card-count="2"
    />

    <!-- Project Content View -->
    <div v-else-if="projectStore.currentProject">
      <!-- Project Header Card -->
      <div class="project-header-card">
        <div class="header-top">
          <div>
            <div class="title-row">
              <h1 class="project-title">{{ projectStore.currentProject.title }}</h1>
              <span :class="['badge', `badge-${projectStore.currentProject.status.toLowerCase()}`]">
                {{ projectStore.currentProject.status }}
              </span>
            </div>
            <p class="project-desc">{{ projectStore.currentProject.description }}</p>
          </div>

          <div class="header-actions">
            <button
              type="button"
              class="btn btn-danger btn-sm"
              @click="handleDeleteProject"
            >
              Delete Project
            </button>
          </div>
        </div>

        <div class="header-meta-row">
          <div class="meta-item">
            <span class="meta-label">Deadline:</span>
            <span class="meta-val">{{ projectStore.currentProject.deadline }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Owner ID:</span>
            <span class="meta-val">#{{ projectStore.currentProject.ownerId }}</span>
          </div>
          <div class="meta-item progress-meta">
            <span class="meta-label">Progress:</span>
            <span class="meta-val">{{ taskStore.projectProgress }}% Completed</span>
            <div class="progress-bar-track">
              <div
                class="progress-bar-fill"
                :style="{ width: `${taskStore.projectProgress}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Feedback Banner -->
      <div
        v-if="actionMessage"
        :class="['alert-banner', actionMessage.type === 'success' ? 'alert-success' : 'alert-error']"
      >
        <span>{{ actionMessage.text }}</span>
        <button
          type="button"
          class="alert-close"
          @click="actionMessage = null"
        >
          ×
        </button>
      </div>

      <!-- Split Layout: Task Board & Task Inspector -->
      <div class="details-layout">
        <!-- Left: Tasks List -->
        <div class="tasks-column">
          <div class="column-header">
            <h2 class="section-title">Work Items ({{ taskStore.projectTasks.length }})</h2>

            <!-- Status Tabs -->
            <div class="tabs-bar">
              <button
                type="button"
                :class="['tab-btn', activeTab === 'ALL' ? 'tab-active' : '']"
                @click="activeTab = 'ALL'"
              >
                All ({{ taskStore.projectTasks.length }})
              </button>
              <button
                type="button"
                :class="['tab-btn', activeTab === 'TODO' ? 'tab-active' : '']"
                @click="activeTab = 'TODO'"
              >
                Todo ({{ taskStore.tasksByStatus.TODO.length }})
              </button>
              <button
                type="button"
                :class="['tab-btn', activeTab === 'IN_PROGRESS' ? 'tab-active' : '']"
                @click="activeTab = 'IN_PROGRESS'"
              >
                In Progress ({{ taskStore.tasksByStatus.IN_PROGRESS.length }})
              </button>
              <button
                type="button"
                :class="['tab-btn', activeTab === 'IN_REVIEW' ? 'tab-active' : '']"
                @click="activeTab = 'IN_REVIEW'"
              >
                In Review ({{ taskStore.tasksByStatus.IN_REVIEW.length }})
              </button>
              <button
                type="button"
                :class="['tab-btn', activeTab === 'DONE' ? 'tab-active' : '']"
                @click="activeTab = 'DONE'"
              >
                Done ({{ taskStore.tasksByStatus.DONE.length }})
              </button>
            </div>
          </div>

          <!-- Empty State for tab -->
          <EmptyState
            v-if="filteredTasks.length === 0"
            title="No tasks in this column"
            description="There are currently no tasks matching the selected filter state."
            action-text="Show All Tasks"
            @action="activeTab = 'ALL'"
          />

          <!-- Task Cards -->
          <div v-else class="tasks-list">
            <div
              v-for="task in filteredTasks"
              :key="task.id"
              :class="[
                'task-item-card',
                taskStore.currentTask?.id === task.id ? 'task-selected' : ''
              ]"
              @click="taskStore.selectTask(task)"
            >
              <div class="task-top">
                <span class="task-code">#{{ task.id }}</span>
                <div class="badge-group">
                  <span :class="['badge', getStatusClass(task.status)]">
                    {{ task.status.replace('_', ' ') }}
                  </span>
                  <span :class="['badge', getPriorityClass(task.priority)]">
                    {{ task.priority }}
                  </span>
                </div>
              </div>

              <h4 class="task-title">{{ task.title }}</h4>
              <p class="task-brief">{{ task.description }}</p>

              <div class="task-bottom">
                <span class="task-meta">Due: {{ task.dueDate }}</span>
                <span class="task-meta">Assignee: User #{{ task.assigneeId }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Task Inspector & Comments Drawer (Matches Balsamiq Wireframe Page 17-18) -->
        <div class="inspector-column">
          <div v-if="taskStore.currentTask" class="inspector-card">
            <div class="inspector-header">
              <div>
                <span class="inspector-code">TASK #{{ taskStore.currentTask.id }}</span>
                <h3 class="inspector-title">{{ taskStore.currentTask.title }}</h3>
              </div>
            </div>

            <p class="inspector-desc">{{ taskStore.currentTask.description }}</p>

            <div class="inspector-meta-box">
              <div class="meta-row">
                <span class="meta-key">Status:</span>
                <span :class="['badge', getStatusClass(taskStore.currentTask.status)]">
                  {{ taskStore.currentTask.status.replace('_', ' ') }}
                </span>
              </div>
              <div class="meta-row">
                <span class="meta-key">Priority:</span>
                <span :class="['badge', getPriorityClass(taskStore.currentTask.priority)]">
                  {{ taskStore.currentTask.priority }}
                </span>
              </div>
              <div class="meta-row">
                <span class="meta-key">Due Date:</span>
                <span class="meta-val">{{ taskStore.currentTask.dueDate }}</span>
              </div>
              <div class="meta-row">
                <span class="meta-key">Assignee:</span>
                <span class="meta-val">User #{{ taskStore.currentTask.assigneeId }}</span>
              </div>
            </div>

            <!-- Role-Based Status Transition Controls -->
            <div class="status-actions-box">
              <div class="actions-header">
                <span class="actions-title">Status Transitions:</span>
                <span class="actions-role-hint">
                  (Acting as: {{ userStore.currentUser?.name }} · {{ userStore.currentUser?.role }})
                </span>
              </div>

              <!-- Member Transitions -->
              <div
                v-if="userStore.currentUser?.role === 'MEMBER'"
                class="button-group"
              >
                <button
                  type="button"
                  class="btn btn-sm btn-outline"
                  :disabled="taskStore.currentTask.status === 'IN_PROGRESS'"
                  @click="handleStatusChange(taskStore.currentTask, 'IN_PROGRESS')"
                >
                  Start Progress
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-warning"
                  :disabled="taskStore.currentTask.status === 'IN_REVIEW'"
                  @click="handleStatusChange(taskStore.currentTask, 'IN_REVIEW')"
                >
                  Submit for Review
                </button>
              </div>

              <!-- Manager Transitions -->
              <div
                v-else-if="userStore.currentUser?.role === 'MANAGER'"
                class="button-group"
              >
                <button
                  type="button"
                  class="btn btn-sm btn-success"
                  :disabled="taskStore.currentTask.status === 'DONE'"
                  @click="handleStatusChange(taskStore.currentTask, 'DONE')"
                >
                  ✓ Approve as DONE
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger"
                  @click="handleStatusChange(taskStore.currentTask, 'IN_PROGRESS')"
                >
                  Request Changes
                </button>
              </div>
            </div>

            <!-- Comments / Discussion Timeline -->
            <div class="comments-section">
              <h4 class="comments-title">
                Discussion &amp; Notes ({{ taskStore.comments.length }})
              </h4>

              <div class="comments-feed">
                <div
                  v-for="comment in taskStore.comments"
                  :key="comment.id"
                  class="comment-bubble"
                >
                  <div class="comment-header">
                    <span class="comment-author">User #{{ comment.authorId }}</span>
                    <span class="comment-time">
                      {{ new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                    </span>
                  </div>
                  <p class="comment-text">{{ comment.content }}</p>
                </div>
              </div>

              <!-- Add Comment Input -->
              <form class="comment-form" @submit.prevent="handlePostComment">
                <input
                  v-model="newCommentText"
                  type="text"
                  placeholder="Write a comment or review note..."
                  class="form-control comment-input"
                />
                <button
                  type="submit"
                  class="btn btn-sm btn-primary"
                  :disabled="!newCommentText.trim()"
                >
                  Post
                </button>
              </form>
            </div>
          </div>

          <div v-else class="inspector-card inspector-empty">
            <p class="empty-hint">Select a task from the list to view details and notes.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.breadcrumb-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

.breadcrumb-sep {
  color: #94a3b8;
}

.breadcrumb-current {
  color: #64748b;
}

.project-header-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
}

.project-desc {
  color: #64748b;
  font-size: 0.95rem;
  max-width: 800px;
}

.header-meta-row {
  display: flex;
  align-items: center;
  gap: 2rem;
  border-top: 1px solid #f1f5f9;
  padding-top: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.meta-label {
  color: #64748b;
}

.meta-val {
  color: #0f172a;
  font-weight: 600;
}

.progress-meta {
  flex: 1;
  max-width: 320px;
}

.progress-bar-track {
  flex: 1;
  height: 0.5rem;
  background-color: #e2e8f0;
  border-radius: 0.25rem;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: #2563eb;
  transition: width 0.3s ease;
}

.alert-banner {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
}

.alert-success {
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
}

.alert-error {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
}

.alert-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: inherit;
}

.details-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 1.5rem;
  align-items: start;
}

.tasks-column {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.column-header {
  margin-bottom: 1rem;
}

.section-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.75rem;
}

.tabs-bar {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.tab-btn {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  padding: 0.35rem 0.65rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.tab-btn:hover {
  background: #f1f5f9;
}

.tab-active {
  background: #2563eb !important;
  color: #ffffff !important;
  border-color: #2563eb !important;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-item-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.task-item-card:hover {
  border-color: #cbd5e1;
  background-color: #f8fafc;
}

.task-selected {
  border-color: #2563eb !important;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
}

.task-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.35rem;
}

.task-code {
  font-size: 0.75rem;
  font-weight: 700;
  color: #94a3b8;
}

.badge-group {
  display: flex;
  gap: 0.35rem;
}

.task-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.25rem;
}

.task-brief {
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 0.65rem;
}

.task-bottom {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #94a3b8;
}

.inspector-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.25rem;
  position: sticky;
  top: 5rem;
}

.inspector-empty {
  text-align: center;
  padding: 3rem 1.5rem;
  color: #94a3b8;
}

.inspector-code {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
}

.inspector-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
}

.inspector-desc {
  font-size: 0.85rem;
  color: #475569;
  line-height: 1.45;
  margin-bottom: 1rem;
}

.inspector-meta-box {
  background: #f8fafc;
  border-radius: 0.5rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
}

.meta-key {
  color: #64748b;
}

.status-actions-box {
  border-top: 1px solid #f1f5f9;
  padding-top: 0.85rem;
  margin-bottom: 1rem;
}

.actions-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.actions-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
}

.actions-role-hint {
  font-size: 0.7rem;
  color: #94a3b8;
}

.button-group {
  display: flex;
  gap: 0.5rem;
}

.btn-warning {
  background-color: #d97706;
  color: #ffffff;
}

.btn-warning:hover {
  background-color: #b45309;
}

.btn-success {
  background-color: #16a34a;
  color: #ffffff;
}

.btn-success:hover {
  background-color: #15803d;
}

.btn-outline-danger {
  background: #ffffff;
  border: 1px solid #fca5a5;
  color: #dc2626;
}

.btn-outline-danger:hover {
  background: #fee2e2;
}

.comments-section {
  border-top: 1px solid #f1f5f9;
  padding-top: 0.85rem;
}

.comments-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.65rem;
}

.comments-feed {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 0.75rem;
}

.comment-bubble {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  padding: 0.5rem 0.65rem;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  margin-bottom: 0.2rem;
}

.comment-author {
  font-weight: 700;
  color: #2563eb;
}

.comment-time {
  color: #94a3b8;
}

.comment-text {
  font-size: 0.8rem;
  color: #334155;
  line-height: 1.35;
}

.comment-form {
  display: flex;
  gap: 0.5rem;
}

.comment-input {
  flex: 1;
  font-size: 0.8rem;
  padding: 0.4rem 0.65rem;
}

@media (max-width: 900px) {
  .details-layout {
    grid-template-columns: 1fr;
  }
}
</style>
