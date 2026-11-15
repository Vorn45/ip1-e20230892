import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/projects'
  },
  {
    path: '/projects',
    name: 'projects-list',
    component: () => import('../views/ProjectsView.vue'),
    meta: { title: 'Projects Dashboard - PlanFlow' }
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
    path: '/tasks',
    name: 'task-explorer',
    component: () => import('../views/TaskExplorerView.vue'),
    meta: { title: 'Task Explorer - PlanFlow' }
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
