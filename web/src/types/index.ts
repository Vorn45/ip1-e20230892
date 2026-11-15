export type Role = 'MANAGER' | 'MEMBER';

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
}

export type ProjectStatus = 'PLANNING' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';

export interface Project {
  id: number;
  title: string;
  description: string;
  status: ProjectStatus;
  deadline: string; // ISO date string YYYY-MM-DD
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // ISO date string YYYY-MM-DD
  projectId: number;
  assigneeId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  taskId: number;
  authorId: number;
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

export interface ProjectFormData {
  title: string;
  description: string;
  status: ProjectStatus;
  deadline: string;
  ownerId: number;
}

export interface TaskFilterOptions {
  search?: string;
  status?: TaskStatus | 'ALL';
  priority?: TaskPriority | 'ALL';
  projectId?: number | 'ALL';
  page?: number;
  limit?: number;
}
