import type {
  Project,
  ProjectFormData,
  Task,
  User,
  Comment,
  TaskFilterOptions,
  PaginatedResult,
  TaskStatus,
  Role,
  TaskFormData
} from '../types';
import {
  INITIAL_PROJECTS,
  INITIAL_TASKS,
  INITIAL_USERS,
  INITIAL_COMMENTS
} from './mockData';

const STORAGE_KEYS = {
  PROJECTS: 'planflow_wireframe_projects_v2',
  TASKS: 'planflow_wireframe_tasks_v2',
  USERS: 'planflow_wireframe_users_v2',
  COMMENTS: 'planflow_wireframe_comments_v2'
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

let projects: Project[] = loadStorage<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
let tasks: Task[] = loadStorage<Task[]>(STORAGE_KEYS.TASKS, INITIAL_TASKS);
const users: User[] = loadStorage<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
let comments: Comment[] = loadStorage<Comment[]>(STORAGE_KEYS.COMMENTS, INITIAL_COMMENTS);

export const projectService = {
  async getProjects(): Promise<Project[]> {
    await delay(250);
    return [...projects];
  },
  async getProjectById(id: number): Promise<Project> {
    await delay(200);
    const found = projects.find((p) => p.id === id);
    if (!found) throw new Error(`Project #${id} not found.`);
    return { ...found };
  },
  async createProject(data: ProjectFormData): Promise<Project> {
    await delay(300);
    const newId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
    const newProject: Project = {
      id: newId,
      title: data.title,
      description: data.description,
      status: 'PLANNING',
      deadline: data.deadline,
      ownerId: data.ownerId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    projects.unshift(newProject);
    saveStorage(STORAGE_KEYS.PROJECTS, projects);
    return newProject;
  },
  async deleteProject(id: number): Promise<boolean> {
    await delay(250);
    const idx = projects.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error(`Project #${id} not found.`);
    projects.splice(idx, 1);
    saveStorage(STORAGE_KEYS.PROJECTS, projects);
    return true;
  }
};

export const taskService = {
  async getTasksByProject(projectId: number): Promise<Task[]> {
    await delay(200);
    return tasks.filter((t) => t.projectId === projectId);
  },
  async getTasks(options: TaskFilterOptions = {}): Promise<PaginatedResult<Task>> {
    await delay(250);
    let filtered = [...tasks];

    if (options.search && options.search.trim() !== '') {
      const q = options.search.toLowerCase().trim();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.titleKm.toLowerCase().includes(q) ||
          t.code.toLowerCase().includes(q)
      );
    }

    if (options.status && options.status !== 'ALL') {
      filtered = filtered.filter((t) => t.status === options.status);
    }

    if (options.priority && options.priority !== 'ALL') {
      filtered = filtered.filter((t) => t.priority === options.priority);
    }

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

  async getTaskById(id: number): Promise<Task> {
    await delay(200);
    const found = tasks.find((t) => t.id === id);
    if (!found) throw new Error(`Task #${id} not found.`);
    return { ...found };
  },

  async updateTaskStatus(
    taskId: number,
    newStatus: TaskStatus,
    currentUserId: number,
    currentUserRole: Role
  ): Promise<Task> {
    await delay(300);
    const index = tasks.findIndex((t) => t.id === taskId);
    if (index === -1) throw new Error(`Task #${taskId} not found.`);

    const task = tasks[index];

    // Ownership & Role-Based Rules
    if (currentUserRole === 'MEMBER') {
      if (task.assigneeId !== currentUserId) {
        throw new Error('Forbidden: You can only update tasks assigned to you.');
      }
      if (newStatus === 'DONE') {
        throw new Error('Forbidden: Only a Team Lead / Manager can approve tasks as DONE.');
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

  async createTask(formData: TaskFormData): Promise<Task> {
    await delay(350);
    const newId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 101;
    const codeNum = String(newId).padStart(3, '0');
    const assignedUser = users.find((u) => u.id === Number(formData.assigneeId));

    const newTask: Task = {
      id: newId,
      code: `#000b-${codeNum}`,
      title: formData.title,
      titleKm: formData.title,
      category: formData.category,
      categoryKm: formData.category,
      description: formData.description,
      status: 'TODO',
      priority: formData.priority,
      dueDate: formData.dueDate,
      durationKm: '១ សប្តាហ៍',
      projectId: formData.projectId || 1,
      assigneeId: Number(formData.assigneeId),
      assigneeNameKm: assignedUser ? assignedUser.nameKm : 'ពិសិដ្ឋ បញ្ញាវុឌ្ឍ',
      commentsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
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
    const author = users.find((u) => u.id === authorId);
    const newComment: Comment = {
      id: comments.length + 1,
      taskId,
      authorId,
      authorNameKm: author ? author.nameKm : 'ពិសិដ្ឋ បញ្ញាវុឌ្ឍ',
      content: content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
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
