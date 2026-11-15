<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTaskStore } from '../stores/taskStore';
import { useLangStore } from '../stores/langStore';

const router = useRouter();
const taskStore = useTaskStore();
const langStore = useLangStore();

onMounted(async () => {
  await taskStore.fetchExplorerTasks();
});

function goToTasksWithStatus(status: string) {
  router.push({ path: '/tasks', query: { status } });
}
</script>

<template>
  <div class="dashboard-page">
    <div class="dashboard-grid">
      <!-- Left Column: Work Summary matching Balsamiq Page 5 -->
      <section class="card summary-card">
        <div class="card-header-row">
          <h2 class="card-title">
            {{ langStore.currentLang === 'km' ? 'សង្ខេបការងារ' : 'Work Summary' }}
          </h2>
          <router-link to="/tasks" class="view-all-link">
            {{ langStore.currentLang === 'km' ? 'ទាំងអស់ >>' : 'View all >>' }}
          </router-link>
        </div>

        <div class="total-tasks-block">
          <span class="total-label">
            {{ langStore.currentLang === 'km' ? 'ការងារសរុប' : 'Total Tasks' }}
          </span>
          <span class="total-number">
            {{ langStore.currentLang === 'km' ? '១២៣' : '123' }}
          </span>
          <div class="sub-tags">
            <span class="tag-pill">៧៣ បញ្ចប់</span>
            <span class="tag-pill">៥០ នៅសល់</span>
          </div>
        </div>

        <!-- Completion Rate Progress Indicator matching Balsamiq Page 5 -->
        <div class="completion-banner">
          <div class="completion-icon">📈</div>
          <div>
            <div class="completion-label">
              {{ langStore.currentLang === 'km' ? 'អត្រាបញ្ចប់' : 'Completion Rate' }}
            </div>
            <div class="completion-val">៥៩.៣៥% (59.35%)</div>
          </div>
        </div>

        <!-- Status Categories Breakdown List matching Balsamiq Page 5 -->
        <div class="status-category-list">
          <div class="status-row" @click="goToTasksWithStatus('TODO')">
            <div class="status-left">
              <span class="status-icon">📄</span>
              <span class="status-name">{{ langStore.currentLang === 'km' ? 'ថ្មី (New)' : 'New / Todo' }}</span>
            </div>
            <div class="status-right">
              <span class="status-count">២៥</span>
              <span class="arrow">›</span>
            </div>
          </div>

          <div class="status-row" @click="goToTasksWithStatus('IN_PROGRESS')">
            <div class="status-left">
              <span class="status-icon">🔄</span>
              <span class="status-name">{{ langStore.currentLang === 'km' ? 'កំពុងធ្វើ (In Progress)' : 'In Progress' }}</span>
            </div>
            <div class="status-right">
              <span class="status-count">១១</span>
              <span class="arrow">›</span>
            </div>
          </div>

          <div class="status-row" @click="goToTasksWithStatus('IN_REVIEW')">
            <div class="status-left">
              <span class="status-icon">🔍</span>
              <span class="status-name">{{ langStore.currentLang === 'km' ? 'ស្នើសុំពិនិត្យ (In Review)' : 'Requested Review' }}</span>
            </div>
            <div class="status-right">
              <span class="status-count">៨</span>
              <span class="arrow">›</span>
            </div>
          </div>

          <div class="status-row" @click="goToTasksWithStatus('DONE')">
            <div class="status-left">
              <span class="status-icon">✓</span>
              <span class="status-name">{{ langStore.currentLang === 'km' ? 'បញ្ចប់ (Done)' : 'Completed' }}</span>
            </div>
            <div class="status-right">
              <span class="status-count">៧៣</span>
              <span class="arrow">›</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Right Column: Newly Assigned Tasks matching Balsamiq Page 5 -->
      <section class="card tasks-card">
        <div class="card-header-row">
          <h2 class="card-title">
            {{ langStore.currentLang === 'km' ? 'ការងារចាត់តាំងថ្មី' : 'Newly Assigned Tasks' }}
          </h2>
          <router-link to="/tasks/new" class="btn btn-sm btn-create">
            + {{ langStore.currentLang === 'km' ? 'បង្កើត' : 'Create' }}
          </router-link>
        </div>

        <div class="tasks-mini-list">
          <div
            v-for="task in taskStore.paginatedTasks.data"
            :key="task.id"
            class="task-row-card"
            @click="router.push(`/tasks/${task.id}`)"
          >
            <div class="task-info">
              <div class="task-title-line">
                <span class="task-badge-tag">{{ task.code }}</span>
                <span class="task-title-text">
                  {{ langStore.currentLang === 'km' ? task.titleKm : task.title }}
                </span>
              </div>
              <div class="task-sub-meta">
                <span>⏱ {{ task.durationKm || '១ សប្តាហ៍' }}</span>
                <span>·</span>
                <span>📅 {{ task.dueDate }}</span>
              </div>
            </div>

            <div class="task-action-pill">
              <span :class="['pill-status', `pill-${task.status.toLowerCase()}`]">
                {{ task.status === 'IN_REVIEW' ? 'ស្នើសុំពិនិត្យ' : task.status === 'IN_PROGRESS' ? 'កំពុងធ្វើ' : task.status === 'DONE' ? 'បញ្ចប់' : 'ថ្មី' }}
              </span>
              <span class="user-avatar-small">👤</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.dashboard-page {
  max-width: 1240px;
  margin: 0 auto;
  padding: 1.5rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 460px 1fr;
  gap: 1.5rem;
  align-items: start;
}

.card {
  background: #ffffff;
  border: 1.5px solid #0f172a;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
}

.view-all-link {
  color: #2563eb;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
}

.total-tasks-block {
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.total-label {
  display: block;
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 0.25rem;
}

.total-number {
  font-size: 2.75rem;
  font-weight: 900;
  color: #0f172a;
  line-height: 1;
}

.sub-tags {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag-pill {
  font-size: 0.75rem;
  font-weight: 600;
  background-color: #f1f5f9;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  color: #334155;
}

.completion-banner {
  background-color: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  padding: 0.85rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.completion-icon {
  font-size: 1.75rem;
}

.completion-label {
  font-size: 0.8rem;
  color: #64748b;
}

.completion-val {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
}

.status-category-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.status-row:hover {
  background-color: #f8fafc;
  border-color: #cbd5e1;
}

.status-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.status-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #0f172a;
}

.status-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-count {
  font-size: 0.95rem;
  font-weight: 800;
  color: #0f172a;
}

.arrow {
  font-size: 1.15rem;
  color: #94a3b8;
}

.btn-create {
  background-color: #0f172a;
  color: #ffffff;
  border: none;
  font-weight: 700;
  padding: 0.35rem 0.85rem;
}

.tasks-mini-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-row-card {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.85rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.15s ease;
}

.task-row-card:hover {
  border-color: #0f172a;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.task-title-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}

.task-badge-tag {
  font-size: 0.75rem;
  font-weight: 800;
  color: #64748b;
}

.task-title-text {
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
}

.task-sub-meta {
  font-size: 0.75rem;
  color: #94a3b8;
  display: flex;
  gap: 0.35rem;
}

.task-action-pill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pill-status {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
}

.pill-in_review {
  background-color: #fef3c7;
  color: #b45309;
}

.pill-in_progress {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.pill-done {
  background-color: #dcfce7;
  color: #166534;
}

.pill-todo {
  background-color: #f1f5f9;
  color: #475569;
}

.user-avatar-small {
  font-size: 1.1rem;
  opacity: 0.7;
}

@media (max-width: 900px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>
