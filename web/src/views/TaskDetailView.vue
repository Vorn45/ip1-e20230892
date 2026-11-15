<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTaskStore } from '../stores/taskStore';
import { useUserStore } from '../stores/userStore';
import { useLangStore } from '../stores/langStore';
import type { TaskStatus } from '../types';
import LoadingState from '../components/LoadingState.vue';
import ErrorState from '../components/ErrorState.vue';

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();
const userStore = useUserStore();
const langStore = useLangStore();

const newComment = ref('');
const feedbackMsg = ref<{ type: 'success' | 'error'; text: string } | null>(null);

const taskId = computed(() => Number(route.params.id));

async function loadTask() {
  feedbackMsg.value = null;
  const id = taskId.value;
  if (isNaN(id)) {
    taskStore.error = 'Invalid Task ID.';
    return;
  }
  try {
    await taskStore.fetchTaskById(id);
  } catch {
    // handled in store
  }
}

onMounted(() => {
  loadTask();
});

watch(
  () => route.params.id,
  () => loadTask()
);

async function handleAction(status: TaskStatus) {
  feedbackMsg.value = null;
  if (!taskStore.currentTask || !userStore.currentUser) return;

  try {
    await taskStore.updateTaskStatus(
      taskStore.currentTask.id,
      status,
      userStore.currentUser.id,
      userStore.currentUser.role
    );
    feedbackMsg.value = {
      type: 'success',
      text: langStore.currentLang === 'km'
        ? `ស្ថានភាពការងារត្រូវបានផ្លាស់ប្តូរទៅជា "${status}" ដោយជោគជ័យ។`
        : `Task status updated to ${status} successfully.`
    };
  } catch (err: unknown) {
    feedbackMsg.value = {
      type: 'error',
      text: err instanceof Error ? err.message : 'Failed to update task.'
    };
  }
}

async function handleAddComment() {
  if (!newComment.value.trim() || !taskStore.currentTask || !userStore.currentUser) return;
  try {
    await taskStore.addComment(
      taskStore.currentTask.id,
      userStore.currentUser.id,
      newComment.value.trim()
    );
    newComment.value = '';
  } catch (err: unknown) {
    feedbackMsg.value = {
      type: 'error',
      text: err instanceof Error ? err.message : 'Failed to post comment.'
    };
  }
}
</script>

<template>
  <div class="task-detail-page">
    <div class="top-nav-row">
      <button type="button" class="back-link-btn" @click="router.push('/tasks')">
        ‹ {{ langStore.currentLang === 'km' ? 'ត្រឡប់ទៅតារាងការងារ' : 'Back to Tasks' }}
      </button>
      <span class="page-code-tag">{{ taskStore.currentTask?.code || `#${$route.params.id}` }}</span>
    </div>

    <!-- Error State -->
    <ErrorState
      v-if="taskStore.error"
      :message="taskStore.error"
      :retryable="false"
    />

    <!-- Loading State -->
    <LoadingState
      v-else-if="taskStore.isLoading"
      :message="langStore.currentLang === 'km' ? 'កំពុងទាញយកព័ត៌មានផ្ទៀងផ្ទាត់...' : 'Loading verification details...'"
      :card-count="1"
    />

    <!-- Main Detail Layout matching Balsamiq Page 17 & 18 -->
    <div v-else-if="taskStore.currentTask" class="verification-drawer-card">
      <!-- Feedback Alert -->
      <div v-if="feedbackMsg" :class="['alert', feedbackMsg.type === 'success' ? 'alert-success' : 'alert-danger']">
        {{ feedbackMsg.text }}
      </div>

      <div class="verification-grid">
        <!-- Left: Task Verification Specs -->
        <div class="specs-section">
          <div class="specs-header">
            <h2 class="specs-title">
              {{ langStore.currentLang === 'km' ? 'ផ្ទៀងផ្ទាត់ទិន្នន័យ (Task Verification)' : 'Task Verification' }}
            </h2>
            <span class="code-badge">{{ taskStore.currentTask.code }}</span>
          </div>

          <h3 class="task-h3">
            {{ langStore.currentLang === 'km' ? taskStore.currentTask.titleKm : taskStore.currentTask.title }}
          </h3>
          <p class="task-desc">{{ taskStore.currentTask.description }}</p>

          <div class="info-list">
            <div class="info-row">
              <span class="info-key">{{ langStore.currentLang === 'km' ? 'ប្រភេទការងារ' : 'Category' }}:</span>
              <span class="info-val">{{ taskStore.currentTask.categoryKm || taskStore.currentTask.category }}</span>
            </div>
            <div class="info-row">
              <span class="info-key">{{ langStore.currentLang === 'km' ? 'កម្រិតអាទិភាព' : 'Priority' }}:</span>
              <span :class="['badge', `badge-${taskStore.currentTask.priority.toLowerCase()}`]">
                {{ taskStore.currentTask.priority }}
              </span>
            </div>
            <div class="info-row">
              <span class="info-key">{{ langStore.currentLang === 'km' ? 'ស្ថានភាពបច្ចុប្បន្ន' : 'Status' }}:</span>
              <span class="badge badge-prog">{{ taskStore.currentTask.status }}</span>
            </div>
            <div class="info-row">
              <span class="info-key">{{ langStore.currentLang === 'km' ? 'ថ្ងៃផុតកំណត់' : 'Due Date' }}:</span>
              <span class="info-val">{{ taskStore.currentTask.dueDate }}</span>
            </div>
            <div class="info-row">
              <span class="info-key">{{ langStore.currentLang === 'km' ? 'អ្នកទទួលខុសត្រូវ' : 'Assignee' }}:</span>
              <span class="info-val">{{ taskStore.currentTask.assigneeNameKm || `User #${taskStore.currentTask.assigneeId}` }}</span>
            </div>
          </div>

          <!-- Action Buttons matching Balsamiq Page 17 -->
          <div class="actions-panel">
            <div class="actions-role-indicator">
              {{ langStore.currentLang === 'km' ? 'សិទ្ធិអនុម័ត:' : 'Approval Actions:' }}
              <strong>{{ userStore.currentUser?.nameKm }} ({{ userStore.currentUser?.role }})</strong>
            </div>

            <div class="btn-actions-row">
              <button
                type="button"
                class="btn btn-changes"
                @click="handleAction('IN_PROGRESS')"
              >
                {{ langStore.currentLang === 'km' ? 'ស្នើសុំកែប្រែ / បដិសេធ' : 'Request Changes / Reject' }}
              </button>

              <button
                type="button"
                class="btn btn-approve"
                @click="handleAction('DONE')"
              >
                ✓ {{ langStore.currentLang === 'km' ? 'អនុម័តការផ្ទៀងផ្ទាត់' : 'Approve Verification' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Right: Discussion / Comments Timeline matching Balsamiq Page 18 -->
        <div class="discussion-section">
          <h3 class="discussion-title">
            {{ langStore.currentLang === 'km' ? 'កត់សម្គាល់ និង មតិយោបល់' : 'Discussion & Notes' }}
            ({{ taskStore.comments.length }})
          </h3>

          <div class="discussion-feed">
            <div
              v-for="c in taskStore.comments"
              :key="c.id"
              class="comment-card"
            >
              <div class="comment-top">
                <span class="author-name">👤 {{ c.authorNameKm || `User #${c.authorId}` }}</span>
                <span class="comment-date">
                  {{ new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                </span>
              </div>
              <p class="comment-body">{{ c.content }}</p>
            </div>
          </div>

          <form class="comment-input-box" @submit.prevent="handleAddComment">
            <input
              v-model="newComment"
              type="text"
              :placeholder="langStore.currentLang === 'km' ? 'បញ្ចូលមតិយោបល់...' : 'Enter your comment or note...'"
              class="form-control"
            />
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="!newComment.trim()"
            >
              {{ langStore.currentLang === 'km' ? 'ផ្ញើ' : 'Send' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-detail-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
}

.top-nav-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.back-link-btn {
  background: none;
  border: 1.5px solid #0f172a;
  border-radius: 0.375rem;
  padding: 0.4rem 0.85rem;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  color: #0f172a;
}

.page-code-tag {
  font-weight: 800;
  font-size: 1rem;
  color: #64748b;
}

.verification-drawer-card {
  background: #ffffff;
  border: 1.5px solid #0f172a;
  border-radius: 0.75rem;
  padding: 1.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.verification-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 2rem;
}

.specs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.specs-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
}

.code-badge {
  font-weight: 800;
  font-size: 0.85rem;
  background-color: #f1f5f9;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
}

.task-h3 {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.task-desc {
  font-size: 0.9rem;
  color: #475569;
  line-height: 1.5;
  margin-bottom: 1.25rem;
}

.info-list {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 1.5rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
}

.info-key {
  color: #64748b;
  font-weight: 600;
}

.info-val {
  color: #0f172a;
  font-weight: 700;
}

.actions-panel {
  border-top: 1.5px solid #0f172a;
  padding-top: 1.25rem;
}

.actions-role-indicator {
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 0.75rem;
}

.btn-actions-row {
  display: flex;
  gap: 0.75rem;
}

.btn-changes {
  flex: 1;
  background: #ffffff;
  border: 1.5px solid #0f172a;
  color: #0f172a;
  font-weight: 700;
  padding: 0.65rem;
  border-radius: 0.375rem;
  cursor: pointer;
}

.btn-approve {
  flex: 1.2;
  background: #0f172a;
  border: 1.5px solid #0f172a;
  color: #ffffff;
  font-weight: 700;
  padding: 0.65rem;
  border-radius: 0.375rem;
  cursor: pointer;
}

.discussion-section {
  border-left: 1px solid #e2e8f0;
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
}

.discussion-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 1rem;
}

.discussion-feed {
  flex: 1;
  max-height: 380px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.comment-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.75rem;
}

.comment-top {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  margin-bottom: 0.35rem;
}

.author-name {
  font-weight: 700;
  color: #0f172a;
}

.comment-date {
  color: #94a3b8;
}

.comment-body {
  font-size: 0.85rem;
  color: #334155;
  line-height: 1.4;
}

.comment-input-box {
  display: flex;
  gap: 0.5rem;
}

.alert {
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.alert-success {
  background-color: #f0fdf4;
  color: #166534;
  border: 1px solid #bbf7d0;
}

.alert-danger {
  background-color: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

@media (max-width: 900px) {
  .verification-grid {
    grid-template-columns: 1fr;
  }
  .discussion-section {
    border-left: none;
    padding-left: 0;
    border-top: 1px solid #e2e8f0;
    padding-top: 1.5rem;
  }
}
</style>
