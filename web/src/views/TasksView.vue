<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';
import { useTaskStore } from '../stores/taskStore';
import { useLangStore } from '../stores/langStore';
import LoadingState from '../components/LoadingState.vue';
import EmptyState from '../components/EmptyState.vue';
import ErrorState from '../components/ErrorState.vue';

const router = useRouter();
const route = useRoute();
const taskStore = useTaskStore();
const langStore = useLangStore();

type ViewMode = 'table' | 'kanban';
const viewMode = ref<ViewMode>('table');

onMounted(async () => {
  const queryStatus = route.query.status as string | undefined;
  if (queryStatus) {
    taskStore.filterOptions.status = queryStatus as any;
  }
  await taskStore.fetchExplorerTasks();
});

function handleSearch(e: Event) {
  const val = (e.target as HTMLInputElement).value;
  taskStore.fetchExplorerTasks({ search: val, page: 1 });
}

function handleStatusFilter(status: string) {
  taskStore.fetchExplorerTasks({ status: status as any, page: 1 });
}

function getStatusBadgeClass(status: string) {
  switch (status) {
    case 'IN_REVIEW':
      return 'badge-rev';
    case 'IN_PROGRESS':
      return 'badge-prog';
    case 'DONE':
      return 'badge-done';
    default:
      return 'badge-todo';
  }
}

function getStatusLabel(status: string) {
  if (langStore.currentLang === 'km') {
    switch (status) {
      case 'IN_REVIEW':
        return 'ស្នើសុំពិនិត្យ';
      case 'IN_PROGRESS':
        return 'កំពុងធ្វើ';
      case 'DONE':
        return 'បញ្ចប់';
      default:
        return 'ថ្មី';
    }
  }
  return status.replace('_', ' ');
}
</script>

<template>
  <div class="tasks-page-layout">
    <!-- Left Sidebar matching Balsamiq Page 13 & 14 -->
    <aside class="sidebar-nav">
      <button
        type="button"
        class="back-circle-btn"
        title="Back to Dashboard"
        @click="router.push('/dashboard')"
      >
        <Icon icon="mdi:chevron-left" width="22" height="22" />
      </button>

      <div class="sidebar-menu">
        <button
          type="button"
          :class="['menu-btn', viewMode === 'table' ? 'menu-btn-active' : '']"
          @click="viewMode = 'table'"
        >
          <Icon icon="mdi:table-large" width="18" height="18" />
          <span>{{ langStore.currentLang === 'km' ? 'តារាងការងារ' : 'Table View' }}</span>
        </button>

        <button
          type="button"
          :class="['menu-btn', viewMode === 'kanban' ? 'menu-btn-active' : '']"
          @click="viewMode = 'kanban'"
        >
          <Icon icon="mdi:view-column-outline" width="18" height="18" />
          <span>{{ langStore.currentLang === 'km' ? 'ផ្ទាំងកាត់បាន' : 'Kanban Board' }}</span>
        </button>

        <button
          type="button"
          class="menu-btn menu-btn-disabled"
          title="Coming soon"
        >
          <Icon icon="mdi:calendar-month-outline" width="18" height="18" />
          <span>{{ langStore.currentLang === 'km' ? 'ប្រតិទិនការងារ' : 'Calendar' }}</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="tasks-content-area">
      <!-- Top Action Bar matching Balsamiq Page 13 -->
      <div class="tasks-top-bar">
        <div class="search-input-wrap">
          <Icon icon="mdi:magnify" width="20" height="20" class="search-icon" />
          <input
            :value="taskStore.filterOptions.search"
            type="text"
            :placeholder="langStore.currentLang === 'km' ? 'ស្វែងរកការងារ...' : 'Search tasks...'"
            class="search-input"
            @input="handleSearch"
          />
        </div>

        <div class="top-bar-right">
          <router-link to="/tasks/new" class="btn btn-create-black">
            <Icon icon="mdi:plus" width="16" height="16" />
            <span>{{ langStore.currentLang === 'km' ? 'បង្កើតថ្មី' : 'Create New' }}</span>
          </router-link>
        </div>
      </div>

      <!-- Quick Filter Pills -->
      <div class="filter-pills-row">
        <button
          type="button"
          :class="['pill-btn', taskStore.filterOptions.status === 'ALL' ? 'pill-active' : '']"
          @click="handleStatusFilter('ALL')"
        >
          {{ langStore.currentLang === 'km' ? 'ទាំងអស់ (All)' : 'All' }}
        </button>
        <button
          type="button"
          :class="['pill-btn', taskStore.filterOptions.status === 'TODO' ? 'pill-active' : '']"
          @click="handleStatusFilter('TODO')"
        >
          {{ langStore.currentLang === 'km' ? 'ថ្មី (New)' : 'New' }}
        </button>
        <button
          type="button"
          :class="['pill-btn', taskStore.filterOptions.status === 'IN_PROGRESS' ? 'pill-active' : '']"
          @click="handleStatusFilter('IN_PROGRESS')"
        >
          {{ langStore.currentLang === 'km' ? 'កំពុងធ្វើ (In Progress)' : 'In Progress' }}
        </button>
        <button
          type="button"
          :class="['pill-btn', taskStore.filterOptions.status === 'IN_REVIEW' ? 'pill-active' : '']"
          @click="handleStatusFilter('IN_REVIEW')"
        >
          {{ langStore.currentLang === 'km' ? 'ស្នើសុំពិនិត្យ (In Review)' : 'In Review' }}
        </button>
        <button
          type="button"
          :class="['pill-btn', taskStore.filterOptions.status === 'DONE' ? 'pill-active' : '']"
          @click="handleStatusFilter('DONE')"
        >
          {{ langStore.currentLang === 'km' ? 'បញ្ចប់ (Done)' : 'Completed' }}
        </button>
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
        :message="langStore.currentLang === 'km' ? 'កំពុងទាញយកទិន្នន័យការងារ...' : 'Loading tasks...'"
        :card-count="3"
      />

      <!-- Empty State -->
      <EmptyState
        v-else-if="taskStore.paginatedTasks.data.length === 0"
        :title="langStore.currentLang === 'km' ? 'មិនមានការងារត្រូវនឹងលក្ខខណ្ឌ' : 'No tasks match criteria'"
        :description="langStore.currentLang === 'km' ? 'សូមលុបពាក្យស្វែងរក ឬ ប្តូរស្ថានភាពដើម្បីមើលការងារផ្សេងទៀត' : 'Try clearing filters to see other tasks.'"
        :action-text="langStore.currentLang === 'km' ? 'សម្អាតការស្វែងរក' : 'Reset Filters'"
        @action="taskStore.resetFilters()"
      />

      <!-- Mode 1: Table View matching Balsamiq Page 13 -->
      <div v-else-if="viewMode === 'table'" class="wireframe-table-card">
        <table class="balsamiq-table">
          <thead>
            <tr>
              <th style="width: 120px;">{{ langStore.currentLang === 'km' ? 'លេខកូដ' : 'Code' }}</th>
              <th>{{ langStore.currentLang === 'km' ? 'ចំណងជើងការងារ' : 'Task Title' }}</th>
              <th style="width: 140px;">{{ langStore.currentLang === 'km' ? 'ថ្ងៃកំណត់' : 'Due Date' }}</th>
              <th style="width: 80px;">{{ langStore.currentLang === 'km' ? 'មតិ' : 'Comments' }}</th>
              <th style="width: 160px;">{{ langStore.currentLang === 'km' ? 'អ្នកទទួល' : 'Assignee' }}</th>
              <th style="width: 130px;">{{ langStore.currentLang === 'km' ? 'ស្ថានភាព' : 'Status' }}</th>
              <th style="width: 110px;">{{ langStore.currentLang === 'km' ? 'រយៈពេល' : 'Duration' }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="task in taskStore.paginatedTasks.data"
              :key="task.id"
              class="table-click-row"
              @click="router.push(`/tasks/${task.id}`)"
            >
              <td class="cell-code">{{ task.code }}</td>
              <td class="cell-title">
                {{ langStore.currentLang === 'km' ? task.titleKm : task.title }}
              </td>
              <td class="cell-date">{{ task.dueDate }}</td>
              <td class="cell-comments">
                <span class="cell-comments-inner">
                  <Icon icon="mdi:comment-text-outline" width="14" height="14" />
                  <span>{{ task.commentsCount || 0 }}</span>
                </span>
              </td>
              <td class="cell-assignee">
                {{ langStore.currentLang === 'km' ? task.assigneeNameKm : `User #${task.assigneeId}` }}
              </td>
              <td>
                <span :class="['status-chip', getStatusBadgeClass(task.status)]">
                  {{ getStatusLabel(task.status) }}
                </span>
              </td>
              <td class="cell-duration">{{ task.durationKm || '១ សប្តាហ៍' }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Table Pagination Footer matching Balsamiq Stretch Feature -->
        <div class="table-pagination-footer">
          <span class="pagination-info">
            {{ langStore.currentLang === 'km'
              ? `ទំព័រទី ${taskStore.paginatedTasks.page} នៃ ${taskStore.paginatedTasks.totalPages} (សរុប ${taskStore.paginatedTasks.totalCount} ការងារ)`
              : `Page ${taskStore.paginatedTasks.page} of ${taskStore.paginatedTasks.totalPages} (${taskStore.paginatedTasks.totalCount} total tasks)`
            }}
          </span>

          <div class="pagination-btn-group">
            <button
              type="button"
              class="btn-pager"
              :disabled="taskStore.paginatedTasks.page <= 1"
              @click="taskStore.setPage(taskStore.paginatedTasks.page - 1)"
            >
              <Icon icon="mdi:chevron-left" width="16" height="16" />
            </button>
            <button
              v-for="p in taskStore.paginatedTasks.totalPages"
              :key="p"
              type="button"
              :class="['btn-pager', p === taskStore.paginatedTasks.page ? 'pager-active' : '']"
              @click="taskStore.setPage(p)"
            >
              {{ p }}
            </button>
            <button
              type="button"
              class="btn-pager"
              :disabled="taskStore.paginatedTasks.page >= taskStore.paginatedTasks.totalPages"
              @click="taskStore.setPage(taskStore.paginatedTasks.page + 1)"
            >
              <Icon icon="mdi:chevron-right" width="16" height="16" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mode 2: Kanban Board matching Balsamiq Page 14 -->
      <div v-else-if="viewMode === 'kanban'" class="kanban-board-grid">
        <!-- Column 1: ថ្មី (New) -->
        <div class="kanban-col">
          <div class="kanban-col-header">
            <span class="col-title">{{ langStore.currentLang === 'km' ? 'ថ្មី' : 'New' }}</span>
            <span class="col-count">({{ taskStore.tasksByStatus.TODO.length }})</span>
          </div>
          <div class="kanban-cards-stack">
            <div
              v-for="t in taskStore.tasksByStatus.TODO"
              :key="t.id"
              class="kanban-card"
              @click="router.push(`/tasks/${t.id}`)"
            >
              <h4 class="kcard-title">{{ langStore.currentLang === 'km' ? t.titleKm : t.title }}</h4>
              <div class="kcard-bottom">
                <span class="kcard-code">{{ t.code }}</span>
                <Icon icon="mdi:account-outline" width="16" height="16" class="kcard-user" />
              </div>
            </div>
            <router-link to="/tasks/new" class="btn-add-kcard">
              <Icon icon="mdi:plus" width="14" height="14" />
              <span>{{ langStore.currentLang === 'km' ? 'បង្កើតការងារ' : 'Add Task' }}</span>
            </router-link>
          </div>
        </div>

        <!-- Column 2: កំពុងធ្វើ (In Progress) -->
        <div class="kanban-col">
          <div class="kanban-col-header">
            <span class="col-title">{{ langStore.currentLang === 'km' ? 'កំពុងធ្វើ' : 'In Progress' }}</span>
            <span class="col-count">({{ taskStore.tasksByStatus.IN_PROGRESS.length }})</span>
          </div>
          <div class="kanban-cards-stack">
            <div
              v-for="t in taskStore.tasksByStatus.IN_PROGRESS"
              :key="t.id"
              class="kanban-card"
              @click="router.push(`/tasks/${t.id}`)"
            >
              <h4 class="kcard-title">{{ langStore.currentLang === 'km' ? t.titleKm : t.title }}</h4>
              <div class="kcard-bottom">
                <span class="kcard-code">{{ t.code }}</span>
                <Icon icon="mdi:account-outline" width="16" height="16" class="kcard-user" />
              </div>
            </div>
          </div>
        </div>

        <!-- Column 3: ស្នើសុំពិនិត្យ / បញ្ចប់ (Review / Done) -->
        <div class="kanban-col">
          <div class="kanban-col-header">
            <span class="col-title">{{ langStore.currentLang === 'km' ? 'ស្នើសុំពិនិត្យ / បញ្ចប់' : 'Review / Done' }}</span>
            <span class="col-count">({{ taskStore.tasksByStatus.IN_REVIEW.length + taskStore.tasksByStatus.DONE.length }})</span>
          </div>
          <div class="kanban-cards-stack">
            <div
              v-for="t in [...taskStore.tasksByStatus.IN_REVIEW, ...taskStore.tasksByStatus.DONE]"
              :key="t.id"
              class="kanban-card"
              @click="router.push(`/tasks/${t.id}`)"
            >
              <h4 class="kcard-title">{{ langStore.currentLang === 'km' ? t.titleKm : t.title }}</h4>
              <div class="kcard-bottom">
                <span class="kcard-code">{{ t.code }}</span>
                <span :class="['status-chip', t.status === 'DONE' ? 'badge-done' : 'badge-rev']">
                  {{ getStatusLabel(t.status) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tasks-page-layout {
  display: flex;
  min-height: calc(100vh - 110px);
}

.sidebar-nav {
  width: 170px;
  background-color: #f8fafc;
  border-right: 1.5px solid #0f172a;
  padding: 1.25rem 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.back-circle-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1.5px solid #0f172a;
  background: #ffffff;
  font-size: 1.5rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
  margin-bottom: 0.5rem;
}

.back-circle-btn:hover {
  background-color: #0f172a;
  color: #ffffff;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.menu-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1.5px solid #0f172a;
  border-radius: 0.5rem;
  background-color: #ffffff;
  padding: 0.65rem 0.75rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #0f172a;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
}

.menu-btn:hover {
  background-color: #f1f5f9;
}

.menu-btn-active {
  background-color: #0f172a !important;
  color: #ffffff !important;
}

.menu-btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tasks-content-area {
  flex: 1;
  padding: 1.5rem;
  max-width: 1100px;
}

.tasks-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.search-input-wrap {
  position: relative;
  width: 420px;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  font-size: 0.95rem;
}

.search-input {
  width: 100%;
  border: 1.5px solid #0f172a;
  border-radius: 0.5rem;
  padding: 0.6rem 0.75rem 0.6rem 2.25rem;
  font-size: 0.9rem;
  outline: none;
}

.btn-create-black {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background-color: #0f172a;
  color: #ffffff;
  border: 1.5px solid #0f172a;
  padding: 0.55rem 1.15rem;
  font-weight: 700;
  border-radius: 0.5rem;
  text-decoration: none;
}

.cell-comments-inner {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: #64748b;
  font-weight: 600;
}

.filter-pills-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  overflow-x: auto;
}

.pill-btn {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 2rem;
  padding: 0.35rem 0.85rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.15s ease;
}

.pill-btn:hover {
  background-color: #f1f5f9;
}

.pill-active {
  background-color: #0f172a !important;
  color: #ffffff !important;
  border-color: #0f172a !important;
}

.wireframe-table-card {
  background: #ffffff;
  border: 1.5px solid #0f172a;
  border-radius: 0.5rem;
  overflow: hidden;
}

.balsamiq-table {
  width: 100%;
  border-collapse: collapse;
}

.balsamiq-table th {
  background-color: #f1f5f9;
  border-bottom: 1.5px solid #0f172a;
  padding: 0.75rem 1rem;
  font-size: 0.825rem;
  font-weight: 800;
  color: #0f172a;
  text-align: left;
}

.balsamiq-table td {
  border-bottom: 1px solid #e2e8f0;
  padding: 0.85rem 1rem;
  font-size: 0.875rem;
}

.table-click-row {
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.table-click-row:hover {
  background-color: #f8fafc;
}

.cell-code {
  font-weight: 700;
  color: #0f172a;
}

.cell-title {
  font-weight: 700;
  color: #0f172a;
}

.cell-date {
  color: #64748b;
  font-size: 0.825rem;
}

.cell-comments {
  color: #64748b;
  font-size: 0.825rem;
}

.cell-assignee {
  color: #334155;
  font-size: 0.825rem;
}

.cell-duration {
  color: #64748b;
  font-size: 0.825rem;
}

.status-chip {
  padding: 0.2rem 0.55rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  display: inline-block;
}

.table-pagination-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1rem;
  background-color: #ffffff;
  border-top: 1px solid #e2e8f0;
}

.pagination-info {
  font-size: 0.8rem;
  color: #64748b;
}

.pagination-btn-group {
  display: flex;
  gap: 0.25rem;
}

.btn-pager {
  min-width: 32px;
  height: 32px;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  border-radius: 0.25rem;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
}

.pager-active {
  background-color: #0f172a !important;
  color: #ffffff !important;
  border-color: #0f172a !important;
}

.kanban-board-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.kanban-col {
  background: #ffffff;
  border: 1.5px solid #0f172a;
  border-radius: 0.5rem;
  padding: 1rem;
}

.kanban-col-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1.5px solid #0f172a;
  padding-bottom: 0.5rem;
}

.col-title {
  font-size: 1rem;
  font-weight: 800;
  color: #0f172a;
}

.col-count {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 700;
}

.kanban-cards-stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.kanban-card {
  border: 1.5px solid #0f172a;
  border-radius: 0.5rem;
  padding: 0.85rem;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.15s ease;
}

.kanban-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
}

.kcard-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.65rem;
}

.kcard-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.kcard-code {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
}

.btn-add-kcard {
  display: block;
  text-align: center;
  padding: 0.5rem;
  border: 1.5px dashed #0f172a;
  border-radius: 0.5rem;
  color: #0f172a;
  text-decoration: none;
  font-size: 0.825rem;
  font-weight: 700;
  margin-top: 0.5rem;
}
</style>
