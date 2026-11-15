import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Project, ProjectFormData } from '../types';
import { projectService } from '../services/api';

export const useProjectStore = defineStore('project', () => {
  const projects = ref<Project[]>([]);
  const currentProject = ref<Project | null>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const searchQuery = ref<string>('');
  const statusFilter = ref<string>('ALL');

  const filteredProjects = computed(() => {
    let result = [...projects.value];
    if (searchQuery.value.trim() !== '') {
      const q = searchQuery.value.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    if (statusFilter.value !== 'ALL') {
      result = result.filter((p) => p.status === statusFilter.value);
    }
    return result;
  });

  const totalProjects = computed(() => projects.value.length);
  const activeCount = computed(
    () => projects.value.filter((p) => p.status === 'ACTIVE').length
  );
  const planningCount = computed(
    () => projects.value.filter((p) => p.status === 'PLANNING').length
  );
  const completedCount = computed(
    () => projects.value.filter((p) => p.status === 'COMPLETED').length
  );

  async function fetchProjects() {
    isLoading.value = true;
    error.value = null;
    try {
      projects.value = await projectService.getProjects();
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to load projects';
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchProjectById(id: number) {
    isLoading.value = true;
    error.value = null;
    currentProject.value = null;
    try {
      currentProject.value = await projectService.getProjectById(id);
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : `Failed to load project #${id}`;
    } finally {
      isLoading.value = false;
    }
  }

  async function createProject(formData: ProjectFormData): Promise<Project> {
    isLoading.value = true;
    error.value = null;
    try {
      const created = await projectService.createProject(formData);
      projects.value.unshift(created);
      return created;
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to create project';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteProject(id: number) {
    isLoading.value = true;
    error.value = null;
    try {
      await projectService.deleteProject(id);
      projects.value = projects.value.filter((p) => p.id !== id);
      if (currentProject.value?.id === id) {
        currentProject.value = null;
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : `Failed to delete project #${id}`;
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  function clearError() {
    error.value = null;
  }

  return {
    projects,
    currentProject,
    isLoading,
    error,
    searchQuery,
    statusFilter,
    filteredProjects,
    totalProjects,
    activeCount,
    planningCount,
    completedCount,
    fetchProjects,
    fetchProjectById,
    createProject,
    deleteProject,
    clearError
  };
});
