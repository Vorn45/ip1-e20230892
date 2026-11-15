import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { title: 'Dashboard (ផ្ទាំងព័ត៌មាន) - PlanFlow' }
  },
  {
    path: '/tasks',
    name: 'tasks-list',
    component: () => import('../views/TasksView.vue'),
    meta: { title: 'Tasks Explorer (បញ្ជីការងារ) - PlanFlow' }
  },
  {
    path: '/tasks/new',
    name: 'task-create',
    component: () => import('../views/CreateTaskView.vue'),
    meta: { title: 'Create Task (បង្កើតការងារថ្មី) - PlanFlow' }
  },
  {
    path: '/tasks/:id',
    name: 'task-detail',
    component: () => import('../views/TaskDetailView.vue'),
    props: true,
    meta: { title: 'Task Verification & Detail (ផ្ទៀងផ្ទាត់ទិន្នន័យការងារ) - PlanFlow' }
  },
  {
    path: '/projects',
    name: 'projects-list',
    component: () => import('../views/ProjectsView.vue'),
    meta: { title: 'Projects Overview - PlanFlow' }
  },
  {
    path: '/projects/new',
    name: 'project-create',
    component: () => import('../views/CreateProjectView.vue'),
    meta: { title: 'Create Project - PlanFlow' }
  },
  {
    path: '/projects/:id',
    name: 'project-detail',
    component: () => import('../views/ProjectDetailView.vue'),
    props: true,
    meta: { title: 'Project Details - PlanFlow' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: 'Page Not Found - PlanFlow' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

router.afterEach((to) => {
  if (to.meta.title && typeof to.meta.title === 'string') {
    document.title = to.meta.title;
  }
});

export default router;
