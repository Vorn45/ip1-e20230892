export type Role = 'MANAGER' | 'MEMBER';

export interface User {
  id: number;
  email: string;
  name: string;
  nameKm: string;
  role: Role;
  roleTitleKm: string;
  phone: string;
}

export type ProjectStatus = 'PLANNING' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';

export interface Project {
  id: number;
  title: string;
  titleKm?: string;
  description: string;
  descriptionKm?: string;
  status: ProjectStatus;
  deadline: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  deadline: string;
  status?: ProjectStatus;
  ownerId: number;
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type Priority = TaskPriority; // alias for convenience

export interface Task {
  id: number;
  code: string; // e.g. '#000b-005' or 'CCN-024800' from wireframe
  title: string;
  titleKm: string;
  category: string;
  categoryKm: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  dueTime?: string;
  durationKm?: string;
  projectId: number;
  assigneeId: number;
  assigneeNameKm?: string;
  commentsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  taskId: number;
  authorId: number;
  authorNameKm?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResult<T> {
  data: T[];
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface TaskFormData {
  title: string;
  category: string;
  priority: TaskPriority;
  dueDate: string;
  dueTime?: string;
  assigneeId: number;
  description: string;
  projectId?: number;
}

export interface TaskFilterOptions {
  search?: string;
  status?: TaskStatus | 'ALL';
  priority?: TaskPriority | 'ALL';
  projectId?: number | 'ALL';
  page?: number;
  limit?: number;
}
