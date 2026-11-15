# PlanFlow UI Wireframes

This directory contains SVG wireframe specifications for the main screens of **PlanFlow**, submitted as part of **Milestone 1 (Frontend Prototype)**.

---

## Screen Overview

| Screen | Wireframe File | Route | Description |
|---|---|---|---|
| **1. Projects Dashboard** | [`01-projects-dashboard.svg`](./01-projects-dashboard.svg) | `/` & `/projects` | High-level metrics, active project cards with progress bars, search, status filter, and pagination. |
| **2. Project Detail** | [`02-project-detail.svg`](./02-project-detail.svg) | `/projects/:id` | Project metadata, progress bar, task list grouped by status tabs, task inspector with status approval transitions, and discussion notes. |
| **3. Create Project** | [`03-create-project-form.svg`](./03-create-project-form.svg) | `/projects/new` | Project creation form showcasing inline client-side validation rules, error banners, and field-level feedback. |
| **4. Task Explorer** | [`04-task-explorer.svg`](./04-task-explorer.svg) | `/tasks` | Dedicated view for the stretch feature: multi-filter search (keyword, project, status, priority) with 10-item server-style pagination. |

---

## UI States Handled

1. **Loading State:**
   - Animated skeleton placeholder cards shown during mock API latency simulation.
2. **Empty State:**
   - Displayed when search/filter criteria match zero projects or tasks, featuring a "Reset Filters" action.
3. **Error State:**
   - Displayed when an invalid route parameter is requested (e.g. `/projects/999` returns "Project not found") with a return button.
