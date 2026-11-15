import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Task, Comment, TaskStatus, Role, TaskFilterOptions, PaginatedResult } from '../types';
import { taskService, commentService } from '../services/api';

export const useTaskStore = defineStore('task', () => {
  const projectTasks = ref<Task[]>([]);
  const currentTask = ref<Task | null>(null);
  const comments = ref<Comment[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Cross-project explorer state (stretch feature)
  const paginatedTasks = ref<PaginatedResult<Task>>({
    data: [],
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 1
  });

  const filterOptions = ref<TaskFilterOptions>({
    search: '',
    status: 'ALL',
    priority: 'ALL',
    projectId: 'ALL',
    page: 1,
    limit: 10
  });

  const tasksByStatus = computed(() => {
    return {
      TODO: projectTasks.value.filter((t) => t.status === 'TODO'),
      IN_PROGRESS: projectTasks.value.filter((t) => t.status === 'IN_PROGRESS'),
      IN_REVIEW: projectTasks.value.filter((t) => t.status === 'IN_REVIEW'),
      DONE: projectTasks.value.filter((t) => t.status === 'DONE')
    };
  });

  const projectProgress = computed(() => {
    if (projectTasks.value.length === 0) return 0;
    const doneCount = projectTasks.value.filter((t) => t.status === 'DONE').length;
    return Math.round((doneCount / projectTasks.value.length) * 100);
  });

  async function fetchTasksForProject(projectId: number) {
    isLoading.value = true;
    error.value = null;
    try {
      projectTasks.value = await taskService.getTasksByProject(projectId);
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to load project tasks';
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchExplorerTasks(options?: Partial<TaskFilterOptions>) {
    isLoading.value = true;
    error.value = null;
    if (options) {
      filterOptions.value = { ...filterOptions.value, ...options };
    }
    try {
      paginatedTasks.value = await taskService.getTasks(filterOptions.value);
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch tasks';
    } finally {
      isLoading.value = false;
    }
  }

  async function updateTaskStatus(
    taskId: number,
    newStatus: TaskStatus,
    currentUserId: number,
    currentUserRole: Role
  ) {
    error.value = null;
    try {
      const updated = await taskService.updateTaskStatus(
        taskId,
        newStatus,
        currentUserId,
        currentUserRole
      );
      // Update in projectTasks array
      const pIdx = projectTasks.value.findIndex((t) => t.id === taskId);
      if (pIdx !== -1) {
        projectTasks.value[pIdx] = updated;
      }
      // Update in explorer tasks
      const eIdx = paginatedTasks.value.data.findIndex((t) => t.id === taskId);
      if (eIdx !== -1) {
        paginatedTasks.value.data[eIdx] = updated;
      }
      if (currentTask.value?.id === taskId) {
        currentTask.value = updated;
      }
      return updated;
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to update task status';
      throw err;
    }
  }

  async function fetchTaskComments(taskId: number) {
    try {
      comments.value = await commentService.getComments(taskId);
    } catch (err: unknown) {
      console.warn('Failed to load comments', err);
    }
  }

  async function addComment(taskId: number, authorId: number, content: string) {
    try {
      const newComment = await commentService.addComment(taskId, authorId, content);
      comments.value.push(newComment);
      return newComment;
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to post comment';
      throw err;
    }
  }

  function selectTask(task: Task | null) {
    currentTask.value = task;
    if (task) {
      fetchTaskComments(task.id);
    } else {
      comments.value = [];
    }
  }

  function setPage(page: number) {
    filterOptions.value.page = page;
    fetchExplorerTasks();
  }

  function resetFilters() {
    filterOptions.value = {
      search: '',
      status: 'ALL',
      priority: 'ALL',
      projectId: 'ALL',
      page: 1,
      limit: 10
    };
    fetchExplorerTasks();
  }

  return {
    projectTasks,
    currentTask,
    comments,
    isLoading,
    error,
    paginatedTasks,
    filterOptions,
    tasksByStatus,
    projectProgress,
    fetchTasksForProject,
    fetchExplorerTasks,
    updateTaskStatus,
    fetchTaskComments,
    addComment,
    selectTask,
    setPage,
    resetFilters
  };
});
