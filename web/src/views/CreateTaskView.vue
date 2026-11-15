<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useTaskStore } from '../stores/taskStore';
import { useUserStore } from '../stores/userStore';
import { useLangStore } from '../stores/langStore';
import type { Priority, TaskFormData } from '../types';

const router = useRouter();
const taskStore = useTaskStore();
const userStore = useUserStore();
const langStore = useLangStore();

// Form Model
const form = reactive<TaskFormData>({
  title: '',
  description: '',
  category: 'Frontend Development',
  priority: 'MEDIUM' as Priority,
  dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
  assigneeId: userStore.currentUser?.id || 1,
  projectId: 1
});

// Mock attachments (matches Balsamiq Page 16 dropzone)
interface AttachedFile {
  name: string;
  size: string;
  type: string;
}
const attachments = ref<AttachedFile[]>([]);
const isDragging = ref(false);

// Validation state
const errors = reactive({
  title: '',
  category: '',
  dueDate: '',
  assigneeId: ''
});

const submitError = ref<string | null>(null);
const isSubmitting = ref(false);

const categories = [
  { value: 'Frontend Development', km: 'ការអភិវឌ្ឍ Frontend (Vue 3 / TS)' },
  { value: 'Backend API & Database', km: 'ការរៀបចំ Backend API និង Postgres DB' },
  { value: 'UI/UX Design & Prototype', km: 'ការរចនាចំណុចប្រទាក់ និងគំរូ Balsamiq' },
  { value: 'Quality Assurance & Testing', km: 'ការធ្វើតេស្តគុណភាព និងសុពលភាព' },
  { value: 'Documentation & Architecture', km: 'ឯកសារបច្ចេកទេស និងស្ថាបត្យកម្ម' }
];

const priorities: { value: Priority; label: string; km: string; color: string }[] = [
  { value: 'LOW', label: 'Low', km: 'ទាប', color: '#10b981' },
  { value: 'MEDIUM', label: 'Medium', km: 'មធ្យម', color: '#f59e0b' },
  { value: 'HIGH', label: 'High', km: 'ខ្ពស់', color: '#ef4444' },
  { value: 'URGENT', label: 'Urgent', km: 'បន្ទាន់បំផុត', color: '#881337' }
];

function validateField(field: keyof typeof errors): boolean {
  let valid = true;

  if (field === 'title') {
    if (!form.title || form.title.trim().length === 0) {
      errors.title = langStore.currentLang === 'km'
        ? 'សូមបញ្ចូលចំណងជើងការងារ!'
        : 'Task title is required.';
      valid = false;
    } else if (form.title.trim().length < 3) {
      errors.title = langStore.currentLang === 'km'
        ? 'ចំណងជើងត្រូវមានយ៉ាងតិច ៣ តួអក្សរ!'
        : 'Title must be at least 3 characters.';
      valid = false;
    } else {
      errors.title = '';
    }
  }

  if (field === 'category') {
    if (!form.category) {
      errors.category = langStore.currentLang === 'km'
        ? 'សូមជ្រើសរើសប្រភេទការងារ!'
        : 'Category is required.';
      valid = false;
    } else {
      errors.category = '';
    }
  }

  if (field === 'dueDate') {
    if (!form.dueDate) {
      errors.dueDate = langStore.currentLang === 'km'
        ? 'សូមជ្រើសរើសកាលបរិច្ឆេទផុតកំណត់!'
        : 'Due date is required.';
      valid = false;
    } else {
      const today = new Date().toISOString().split('T')[0];
      if (form.dueDate < today) {
        errors.dueDate = langStore.currentLang === 'km'
          ? 'កាលបរិច្ឆេទមិនអាចនៅអតីតកាលបានទេ!'
          : 'Due date cannot be in the past.';
        valid = false;
      } else {
        errors.dueDate = '';
      }
    }
  }

  if (field === 'assigneeId') {
    if (!form.assigneeId) {
      errors.assigneeId = langStore.currentLang === 'km'
        ? 'សូមជ្រើសរើសអ្នកទទួលខុសត្រូវ!'
        : 'Assignee is required.';
      valid = false;
    } else {
      errors.assigneeId = '';
    }
  }

  return valid;
}

function validateAll(): boolean {
  const v1 = validateField('title');
  const v2 = validateField('category');
  const v3 = validateField('dueDate');
  const v4 = validateField('assigneeId');
  return v1 && v2 && v3 && v4;
}

function handleFileDrop(e: DragEvent) {
  isDragging.value = false;
  if (!e.dataTransfer?.files) return;
  addFiles(Array.from(e.dataTransfer.files));
}

function handleFileInput(e: Event) {
  const target = e.target as HTMLInputElement;
  if (!target.files) return;
  addFiles(Array.from(target.files));
}

function addFiles(files: File[]) {
  for (const f of files) {
    if (f.size > 2 * 1024 * 1024) {
      alert(langStore.currentLang === 'km'
        ? `ឯកសារ "${f.name}" ធំជាង 2MB!`
        : `File "${f.name}" exceeds 2MB limit!`);
      continue;
    }
    const kb = (f.size / 1024).toFixed(1);
    attachments.value.push({
      name: f.name,
      size: `${kb} KB`,
      type: f.type || 'application/octet-stream'
    });
  }
}

function removeFile(index: number) {
  attachments.value.splice(index, 1);
}

async function handleSubmit() {
  submitError.value = null;
  if (!validateAll()) {
    submitError.value = langStore.currentLang === 'km'
      ? 'សូមពិនិត្យ និងកែតម្រូវទិន្នន័យមិនត្រឹមត្រូវក្នុងទម្រង់!'
      : 'Please correct the highlighted errors before submitting.';
    return;
  }

  isSubmitting.value = true;
  try {
    const newTask = await taskStore.createTask({
      title: form.title.trim(),
      description: form.description?.trim() || '',
      category: form.category,
      priority: form.priority,
      dueDate: form.dueDate,
      assigneeId: Number(form.assigneeId),
      projectId: Number(form.projectId) || 1
    });

    // Navigate to the newly created task detail page
    router.push(`/tasks/${newTask.id}`);
  } catch (err: unknown) {
    submitError.value = err instanceof Error ? err.message : 'Failed to create task';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="create-task-container">
    <!-- Breadcrumb & Header matching Balsamiq Page 16 -->
    <div class="page-top">
      <router-link to="/tasks" class="btn-back">
        ‹ {{ langStore.currentLang === 'km' ? 'ត្រឡប់ទៅតារាងការងារ (Back)' : 'Back to Tasks' }}
      </router-link>
      <h1 class="page-heading">
        {{ langStore.currentLang === 'km' ? 'បង្កើតការងារថ្មី' : 'Create New Task' }}
      </h1>
      <p class="page-desc">
        {{ langStore.currentLang === 'km'
          ? 'បំពេញព័ត៌មានខាងក្រោម និងភ្ជាប់ឯកសារពិពណ៌នា ដើម្បីចាត់ចែងការងារក្នុងក្រុម'
          : 'Fill in the details below and attach specifications to assign a new team task.' }}
      </p>
    </div>

    <!-- Error Banner -->
    <div v-if="submitError" class="alert-error">
      ⚠️ {{ submitError }}
    </div>

    <!-- Two-column form layout matching Balsamiq Page 16 -->
    <div class="create-grid">
      <!-- Left Column: File Dropzone & Specification Upload -->
      <div class="left-col">
        <div class="card dropzone-card">
          <h3 class="card-title">
            📎 {{ langStore.currentLang === 'km' ? 'ឯកសារភ្ជាប់ និង គំរូការងារ' : 'Attachments & Specs' }}
          </h3>
          <p class="card-hint">
            {{ langStore.currentLang === 'km'
              ? 'ទាញទម្លាក់ឯកសារ ឬ ចុចដើម្បីជ្រើសរើស (PNG, JPG, PDF អតិបរមា 2MB)'
              : 'Drag & drop files or click to browse (PNG, JPG, PDF up to 2MB)' }}
          </p>

          <div
            class="dropzone-area"
            :class="{ 'dropzone-active': isDragging }"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleFileDrop"
          >
            <input
              type="file"
              id="file-input"
              class="file-hidden-input"
              multiple
              accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
              @change="handleFileInput"
            />
            <label for="file-input" class="dropzone-label">
              <span class="upload-icon">📂</span>
              <span class="upload-text">
                {{ langStore.currentLang === 'km' ? 'ជ្រើសរើសឯកសារភ្ជាប់' : 'Choose files to upload' }}
              </span>
              <span class="upload-sub">
                {{ langStore.currentLang === 'km' ? 'ឬ ទាញទម្លាក់ឯកសារមកទីនេះ' : 'or drag and drop them here' }}
              </span>
            </label>
          </div>

          <!-- Attached Files List -->
          <div v-if="attachments.length > 0" class="attachments-list">
            <div class="att-head">
              {{ langStore.currentLang === 'km' ? 'ឯកសារដែលបានជ្រើសរើស:' : 'Selected Files:' }}
            </div>
            <div
              v-for="(file, idx) in attachments"
              :key="idx"
              class="attachment-row"
            >
              <div class="att-info">
                <span class="att-name">📄 {{ file.name }}</span>
                <span class="att-size">({{ file.size }})</span>
              </div>
              <button
                type="button"
                class="btn-remove-att"
                @click="removeFile(idx)"
                title="Remove"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Task Form with Validation -->
      <div class="right-col">
        <form @submit.prevent="handleSubmit" class="card form-card" novalidate>
          <h3 class="card-title">
            📝 {{ langStore.currentLang === 'km' ? 'ព័ត៌មានលម្អិតនៃការងារ' : 'Task Details' }}
          </h3>

          <!-- Title Field -->
          <div class="form-group" :class="{ 'has-error': errors.title }">
            <label for="title" class="form-label required">
              {{ langStore.currentLang === 'km' ? 'ចំណងជើងការងារ' : 'Task Title' }}
            </label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              class="form-control"
              :placeholder="langStore.currentLang === 'km' ? 'ឧទាហរណ៍៖ អនុវត្តផ្ទាំងផ្ទៀងផ្ទាត់ទិន្នន័យ (Task Verification UI)' : 'e.g. Implement Task Verification UI'"
              @blur="validateField('title')"
              @input="errors.title && validateField('title')"
            />
            <span v-if="errors.title" class="error-msg">{{ errors.title }}</span>
          </div>

          <!-- Category and Priority Row -->
          <div class="form-row-2">
            <!-- Category -->
            <div class="form-group" :class="{ 'has-error': errors.category }">
              <label for="category" class="form-label required">
                {{ langStore.currentLang === 'km' ? 'ប្រភេទការងារ' : 'Category / Project' }}
              </label>
              <select
                id="category"
                v-model="form.category"
                class="form-control"
                @blur="validateField('category')"
                @change="validateField('category')"
              >
                <option v-for="c in categories" :key="c.value" :value="c.value">
                  {{ langStore.currentLang === 'km' ? c.km : c.value }}
                </option>
              </select>
              <span v-if="errors.category" class="error-msg">{{ errors.category }}</span>
            </div>

            <!-- Priority -->
            <div class="form-group">
              <label class="form-label">
                {{ langStore.currentLang === 'km' ? 'កម្រិតអាទិភាព' : 'Priority' }}
              </label>
              <div class="priority-pills">
                <label
                  v-for="p in priorities"
                  :key="p.value"
                  class="pill-label"
                  :class="{ 'pill-selected': form.priority === p.value }"
                  :style="{ borderColor: form.priority === p.value ? p.color : '#e2e8f0' }"
                >
                  <input
                    type="radio"
                    name="priority"
                    :value="p.value"
                    v-model="form.priority"
                    class="sr-only"
                  />
                  <span>{{ langStore.currentLang === 'km' ? p.km : p.label }}</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Due Date & Assignee Row -->
          <div class="form-row-2">
            <!-- Due Date -->
            <div class="form-group" :class="{ 'has-error': errors.dueDate }">
              <label for="dueDate" class="form-label required">
                {{ langStore.currentLang === 'km' ? 'កាលបរិច្ឆេទផុតកំណត់' : 'Due Date' }}
              </label>
              <input
                id="dueDate"
                v-model="form.dueDate"
                type="date"
                class="form-control"
                @blur="validateField('dueDate')"
                @change="validateField('dueDate')"
              />
              <span v-if="errors.dueDate" class="error-msg">{{ errors.dueDate }}</span>
            </div>

            <!-- Assignee -->
            <div class="form-group" :class="{ 'has-error': errors.assigneeId }">
              <label for="assigneeId" class="form-label required">
                {{ langStore.currentLang === 'km' ? 'អ្នកទទួលខុសត្រូវ' : 'Assignee' }}
              </label>
              <select
                id="assigneeId"
                v-model="form.assigneeId"
                class="form-control"
                @blur="validateField('assigneeId')"
                @change="validateField('assigneeId')"
              >
                <option
                  v-for="u in userStore.users"
                  :key="u.id"
                  :value="u.id"
                >
                  {{ langStore.currentLang === 'km' ? u.nameKm : u.name }} ({{ u.role }})
                </option>
              </select>
              <span v-if="errors.assigneeId" class="error-msg">{{ errors.assigneeId }}</span>
            </div>
          </div>

          <!-- Description Field -->
          <div class="form-group">
            <label for="description" class="form-label">
              {{ langStore.currentLang === 'km' ? 'សេចក្តីពិពណ៌នាលម្អិត' : 'Description / Instructions' }}
            </label>
            <textarea
              id="description"
              v-model="form.description"
              rows="4"
              class="form-control"
              :placeholder="langStore.currentLang === 'km' ? 'បញ្ជាក់លក្ខខណ្ឌតម្រូវ ជំហានអនុវត្ត ឬព័ត៌មានលម្អិតផ្សេងៗ...' : 'Detail technical specs, acceptance criteria, or design notes...'"
            ></textarea>
          </div>

          <!-- Form Actions matching Balsamiq Page 16 -->
          <div class="form-actions">
            <button
              type="button"
              class="btn-cancel"
              @click="router.push('/tasks')"
            >
              {{ langStore.currentLang === 'km' ? 'បោះបង់' : 'Cancel' }}
            </button>
            <button
              type="submit"
              class="btn-submit"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="spinner-small"></span>
              <span>{{ langStore.currentLang === 'km' ? '✓ បង្កើតការងារ' : '✓ Create Task' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.create-task-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
}

.page-top {
  margin-bottom: 1.5rem;
}

.btn-back {
  display: inline-block;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.btn-back:hover {
  text-decoration: underline;
}

.page-heading {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.25rem 0;
}

.page-desc {
  color: #64748b;
  font-size: 0.95rem;
  margin: 0;
}

.alert-error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  padding: 0.85rem 1.25rem;
  border-radius: 8px;
  margin-bottom: 1.25rem;
  font-size: 0.92rem;
}

.create-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 900px) {
  .create-grid {
    grid-template-columns: 360px 1fr;
  }
}

.card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.35rem 0;
}

.card-hint {
  font-size: 0.85rem;
  color: #64748b;
  margin: 0 0 1.25rem 0;
}

/* Dropzone */
.dropzone-area {
  border: 2px dashed #cbd5e1;
  border-radius: 10px;
  padding: 2rem 1rem;
  text-align: center;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropzone-area:hover,
.dropzone-active {
  border-color: #3b82f6;
  background: #eff6ff;
}

.file-hidden-input {
  display: none;
}

.dropzone-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.upload-icon {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

.upload-text {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.95rem;
}

.upload-sub {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 0.25rem;
}

.attachments-list {
  margin-top: 1.25rem;
  border-top: 1px solid #f1f5f9;
  padding-top: 1rem;
}

.att-head {
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.5rem;
}

.attachment-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  background: #f8fafc;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
}

.att-info {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  overflow: hidden;
}

.att-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
  color: #1e293b;
}

.att-size {
  color: #94a3b8;
  font-size: 0.75rem;
}

.btn-remove-att {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.2rem 0.4rem;
}

/* Form Styles */
.form-group {
  margin-bottom: 1.25rem;
}

.form-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.35rem;
}

.form-label.required::after {
  content: ' *';
  color: #ef4444;
}

.form-control {
  width: 100%;
  padding: 0.65rem 0.85rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #0f172a;
  background-color: #ffffff;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.has-error .form-control {
  border-color: #ef4444;
  background-color: #fffbfb;
}

.has-error .form-control:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.error-msg {
  display: block;
  color: #ef4444;
  font-size: 0.82rem;
  margin-top: 0.3rem;
  font-weight: 500;
}

.form-row-2 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 600px) {
  .form-row-2 {
    grid-template-columns: 1fr 1fr;
  }
}

.priority-pills {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.pill-label {
  flex: 1;
  text-align: center;
  padding: 0.55rem 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  background: #f8fafc;
  transition: all 0.2s;
}

.pill-label:hover {
  background: #f1f5f9;
}

.pill-selected {
  background: #eff6ff !important;
  font-weight: 700;
  border-width: 2px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid #f1f5f9;
}

.btn-cancel {
  padding: 0.65rem 1.25rem;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #475569;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-cancel:hover {
  background: #f1f5f9;
}

.btn-submit {
  padding: 0.65rem 1.5rem;
  background: #3b82f6;
  border: 1px solid #3b82f6;
  color: #ffffff;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.15s;
}

.btn-submit:hover:not(:disabled) {
  background: #2563eb;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
