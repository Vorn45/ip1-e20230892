import type {
  Project,
  Task,
  User,
  Comment,
  ProjectFormData,
  TaskFilterOptions,
  PaginatedResult,
  TaskStatus,
  Role
} from '../types';
import {
  INITIAL_PROJECTS,
  INITIAL_TASKS,
  INITIAL_USERS,
  INITIAL_COMMENTS
} from './mockData';

const STORAGE_KEYS = {
  PROJECTS: 'planflow_projects_v1',
  TASKS: 'planflow_tasks_v1',
  USERS: 'planflow_users_v1',
  COMMENTS: 'planflow_comments_v1'
};

function delay(ms: number = 250): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn('Failed to save to localStorage', err);
  }
}

// Storage initializers
let projects: Project[] = loadStorage<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
let tasks: Task[] = loadStorage<Task[]>(STORAGE_KEYS.TASKS, INITIAL_TASKS);
const users: User[] = loadStorage<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
let comments: Comment[] = loadStorage<Comment[]>(STORAGE_KEYS.COMMENTS, INITIAL_COMMENTS);

export const projectService = {
  async getProjects(search?: string, status?: string): Promise<Project[]> {
    await delay(300);
    let result = [...projects];

    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (status && status !== 'ALL') {
      result = result.filter((p) => p.status === status);
    }

    // Sort by updated/created descending
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return result;
  },

  async getProjectById(id: number): Promise<Project> {
    await delay(250);
    const found = projects.find((p) => p.id === id);
    if (!found) {
      throw new Error(`Project with ID ${id} was not found.`);
    }
    return { ...found };
  },

  async createProject(data: ProjectFormData): Promise<Project> {
    await delay(350);
    const now = new Date().toISOString();
    const newId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
    const newProject: Project = {
      id: newId,
      title: data.title.trim(),
      description: data.description.trim(),
      status: data.status,
      deadline: data.deadline,
      ownerId: data.ownerId,
      createdAt: now,
      updatedAt: now
    };

    projects.unshift(newProject);
    saveStorage(STORAGE_KEYS.PROJECTS, projects);
    return newProject;
  },

  async updateProject(id: number, updates: Partial<ProjectFormData>): Promise<Project> {
    await delay(300);
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Cannot update: Project ${id} not found.`);
    }
    const updated: Project = {
      ...projects[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    projects[index] = updated;
    saveStorage(STORAGE_KEYS.PROJECTS, projects);
    return updated;
  },

  async deleteProject(id: number): Promise<void> {
    await delay(300);
    projects = projects.filter((p) => p.id !== id);
    tasks = tasks.filter((t) => t.projectId !== id);
    saveStorage(STORAGE_KEYS.PROJECTS, projects);
    saveStorage(STORAGE_KEYS.TASKS, tasks);
  }
};

export const taskService = {
  async getTasks(options: TaskFilterOptions = {}): Promise<PaginatedResult<Task>> {
    await delay(300);
    let filtered = [...tasks];

    if (options.search && options.search.trim() !== '') {
      const q = options.search.toLowerCase().trim();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }

    if (options.status && options.status !== 'ALL') {
      filtered = filtered.filter((t) => t.status === options.status);
    }

    if (options.priority && options.priority !== 'ALL') {
      filtered = filtered.filter((t) => t.priority === options.priority);
    }

    if (options.projectId && options.projectId !== 'ALL') {
      filtered = filtered.filter((t) => t.projectId === options.projectId);
    }

    // Sort by due date
    filtered.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    const page = options.page || 1;
    const limit = options.limit || 10;
    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedData = filtered.slice(startIndex, startIndex + limit);

    return {
      data: paginatedData,
      page,
      limit,
      totalCount,
      totalPages
    };
  },

  async getTasksByProject(projectId: number): Promise<Task[]> {
    await delay(200);
    return tasks.filter((t) => t.projectId === projectId);
  },

  async updateTaskStatus(
    taskId: number,
    newStatus: TaskStatus,
    currentUserId: number,
    currentUserRole: Role
  ): Promise<Task> {
    await delay(300);
    const index = tasks.findIndex((t) => t.id === taskId);
    if (index === -1) {
      throw new Error(`Task ${taskId} not found.`);
    }

    const task = tasks[index];

    // Role & Ownership Verification
    if (currentUserRole === 'MEMBER') {
      if (task.assigneeId !== currentUserId) {
        throw new Error('Forbidden: You can only update tasks assigned to you.');
      }
      if (newStatus === 'DONE') {
        throw new Error('Forbidden: Only a Project Manager can approve tasks as DONE.');
      }
    }

    const updated: Task = {
      ...task,
      status: newStatus,
      updatedAt: new Date().toISOString()
    };
    tasks[index] = updated;
    saveStorage(STORAGE_KEYS.TASKS, tasks);
    return updated;
  },

  async createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    await delay(300);
    const now = new Date().toISOString();
    const newId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 101;
    const newTask: Task = {
      ...taskData,
      id: newId,
      createdAt: now,
      updatedAt: now
    };
    tasks.unshift(newTask);
    saveStorage(STORAGE_KEYS.TASKS, tasks);
    return newTask;
  }
};

export const commentService = {
  async getComments(taskId: number): Promise<Comment[]> {
    await delay(150);
    return comments
      .filter((c) => c.taskId === taskId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  },

  async addComment(taskId: number, authorId: number, content: string): Promise<Comment> {
    await delay(200);
    const now = new Date().toISOString();
    const newId = comments.length > 0 ? Math.max(...comments.map((c) => c.id)) + 1 : 1;
    const newComment: Comment = {
      id: newId,
      taskId,
      authorId,
      content: content.trim(),
      createdAt: now,
      updatedAt: now
    };
    comments.push(newComment);
    saveStorage(STORAGE_KEYS.COMMENTS, comments);
    return newComment;
  }
};

export const userService = {
  async getUsers(): Promise<User[]> {
    await delay(100);
    return [...users];
  },
  getUserById(id: number): User | undefined {
    return users.find((u) => u.id === id);
  }
};
