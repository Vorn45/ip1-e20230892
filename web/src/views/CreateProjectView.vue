<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useProjectStore } from '../stores/projectStore';
import { useUserStore } from '../stores/userStore';
import type { ProjectStatus } from '../types';

const router = useRouter();
const projectStore = useProjectStore();
const userStore = useUserStore();

// Form State
const form = reactive({
  title: '',
  description: '',
  status: 'PLANNING' as ProjectStatus,
  deadline: '',
  ownerId: userStore.currentUser?.id || 1
});

// Form Touched / Dirty State
const touched = reactive({
  title: false,
  description: false,
  deadline: false,
  ownerId: false
});

const isSubmitting = ref(false);
const submitError = ref<string | null>(null);

// Validation Rules & Error Messages
const errors = computed(() => {
  const errs: Record<string, string> = {};

  // Title Validation
  if (!form.title.trim()) {
    errs.title = 'Project title is required.';
  } else if (form.title.trim().length < 3) {
    errs.title = 'Title must be at least 3 characters.';
  } else if (form.title.trim().length > 100) {
    errs.title = 'Title cannot exceed 100 characters.';
  }

  // Description Validation
  if (!form.description.trim()) {
    errs.description = 'Project description is required.';
  } else if (form.description.trim().length < 10) {
    errs.description = 'Description must be at least 10 characters long.';
  }

  // Deadline Validation
  if (!form.deadline) {
    errs.deadline = 'Target deadline date is required.';
  } else {
    const selectedDate = new Date(form.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate <= today) {
      errs.deadline = 'Deadline must be a future date.';
    }
  }

  // Owner Validation
  if (!form.ownerId) {
    errs.ownerId = 'Please select a Project Manager.';
  }

  return errs;
});

const isFormValid = computed(() => Object.keys(errors.value).length === 0);

function handleBlur(field: keyof typeof touched) {
  touched[field] = true;
}

async function handleSubmit() {
  // Mark all fields as touched to trigger validation feedback
  touched.title = true;
  touched.description = true;
  touched.deadline = true;
  touched.ownerId = true;

  if (!isFormValid.value) {
    submitError.value = 'Please correct the validation errors in the form before submitting.';
    return;
  }

  isSubmitting.value = true;
  submitError.value = null;

  try {
    const newProject = await projectStore.createProject({
      title: form.title,
      description: form.description,
      status: form.status,
      deadline: form.deadline,
      ownerId: Number(form.ownerId)
    });

    // Navigate to the newly created project detail view
    router.push(`/projects/${newProject.id}`);
  } catch (err: unknown) {
    submitError.value = err instanceof Error ? err.message : 'Failed to create project.';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="page-container">
    <div class="form-wrapper">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <router-link to="/projects" class="breadcrumb-link">Projects</router-link>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-current">Create New Project</span>
      </div>

      <div class="form-card">
        <div class="card-header">
          <h1 class="card-title">Create New Project</h1>
          <p class="card-subtitle">
            Establish a collaborative project plan, specify initial deliverables, and assign an owner.
          </p>
        </div>

        <!-- Global Submit Error Banner -->
        <div v-if="submitError" class="alert alert-danger">
          {{ submitError }}
        </div>

        <form @submit.prevent="handleSubmit" novalidate>
          <!-- Field 1: Title -->
          <div class="form-group">
            <label for="project-title" class="form-label">
              Project Title <span class="required">*</span>
            </label>
            <input
              id="project-title"
              v-model="form.title"
              type="text"
              placeholder="e.g. Mobile Banking App Redesign"
              :class="[
                'form-control',
                touched.title && errors.title ? 'is-invalid' : '',
                touched.title && !errors.title ? 'is-valid' : ''
              ]"
              @blur="handleBlur('title')"
            />
            <span v-if="touched.title && errors.title" class="invalid-feedback">
              {{ errors.title }}
            </span>
            <span v-else class="form-text">
              Must be between 3 and 100 characters.
            </span>
          </div>

          <!-- Field 2: Description -->
          <div class="form-group">
            <label for="project-desc" class="form-label">
              Description <span class="required">*</span>
            </label>
            <textarea
              id="project-desc"
              v-model="form.description"
              rows="4"
              placeholder="Detailed objectives, technical stack, and deliverable targets..."
              :class="[
                'form-control',
                touched.description && errors.description ? 'is-invalid' : '',
                touched.description && !errors.description ? 'is-valid' : ''
              ]"
              @blur="handleBlur('description')"
            ></textarea>
            <span v-if="touched.description && errors.description" class="invalid-feedback">
              {{ errors.description }}
            </span>
            <span v-else class="form-text">
              Provide at least 10 characters summarizing project scope.
            </span>
          </div>

          <!-- Two Column Row: Status and Deadline -->
          <div class="form-row">
            <!-- Field 3: Status -->
            <div class="form-group col">
              <label for="project-status" class="form-label">
                Initial Status <span class="required">*</span>
              </label>
              <select
                id="project-status"
                v-model="form.status"
                class="form-control"
              >
                <option value="PLANNING">Planning</option>
                <option value="ACTIVE">Active</option>
              </select>
            </div>

            <!-- Field 4: Deadline -->
            <div class="form-group col">
              <label for="project-deadline" class="form-label">
                Target Deadline <span class="required">*</span>
              </label>
              <input
                id="project-deadline"
                v-model="form.deadline"
                type="date"
                :class="[
                  'form-control',
                  touched.deadline && errors.deadline ? 'is-invalid' : '',
                  touched.deadline && !errors.deadline ? 'is-valid' : ''
                ]"
                @blur="handleBlur('deadline')"
              />
              <span v-if="touched.deadline && errors.deadline" class="invalid-feedback">
                {{ errors.deadline }}
              </span>
            </div>
          </div>

          <!-- Field 5: Assigned Manager -->
          <div class="form-group">
            <label for="project-owner" class="form-label">
              Project Manager (Owner) <span class="required">*</span>
            </label>
            <select
              id="project-owner"
              v-model="form.ownerId"
              :class="[
                'form-control',
                touched.ownerId && errors.ownerId ? 'is-invalid' : ''
              ]"
              @blur="handleBlur('ownerId')"
            >
              <option
                v-for="user in userStore.users"
                :key="user.id"
                :value="user.id"
              >
                {{ user.name }} ({{ user.role }}) - {{ user.email }}
              </option>
            </select>
            <span v-if="touched.ownerId && errors.ownerId" class="invalid-feedback">
              {{ errors.ownerId }}
            </span>
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <button
              type="button"
              class="btn btn-outline"
              @click="$router.push('/projects')"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Creating Project...</span>
              <span v-else>Create Project →</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1.25rem;
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

.form-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card-header {
  margin-bottom: 1.75rem;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 1.25rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
}

.card-subtitle {
  font-size: 0.95rem;
  color: #64748b;
  margin-top: 0.25rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.35rem;
}

.required {
  color: #dc2626;
}

.form-text {
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 0.25rem;
  display: block;
}

.invalid-feedback {
  font-size: 0.8rem;
  color: #dc2626;
  font-weight: 500;
  margin-top: 0.25rem;
  display: block;
}

.is-invalid {
  border-color: #ef4444 !important;
  background-color: #fff5f5 !important;
}

.is-valid {
  border-color: #22c55e !important;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  border-top: 1px solid #f1f5f9;
  padding-top: 1.5rem;
  margin-top: 1rem;
}

.alert {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.25rem;
  font-size: 0.875rem;
}

.alert-danger {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
