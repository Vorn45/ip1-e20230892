# PlanFlow – Team Project Planning & Task Tracker
**Course:** Internet Programming (Year 4, Capstone Project)  
**Student:** Piseth Panhavorn (ID: `e20230892`)  
**Repository:** [https://github.com/Vorn45/ip1-e20230892](https://github.com/Vorn45/ip1-e20230892)  
**Milestone:** `m1` (Week 5 – Frontend Prototype)

---

## 📌 Milestone 1 Overview

PlanFlow is a collaborative project planning and task tracking web application for Digitech teams. Milestone 1 delivers a fully functional Vue 3 + TypeScript frontend prototype adhering to all course rubric criteria:

- [x] **Wireframes in `docs/`:** Authentic Balsamiq design document (`docs/wireframes/balsamiq_wireframes.pdf`) and 4 core SVG wireframes.
- [x] **Vue 3 + TypeScript (Vite):** Strict mode enabled (`vue-tsc -b` passes with 0 errors).
- [x] **ESLint Passing:** Clean linting without errors or warnings (`npm run lint`).
- [x] **4+ Interactive Routes:**
  - `/dashboard`: Work Summary, KPI breakdown metrics, and newly assigned cards (Page 5).
  - `/tasks`: Tasks Explorer with Table and Kanban board switcher, search, and stretch pagination (Pages 13 & 14).
  - `/tasks/new`: Create Task Form with client-side validation and file attachments dropzone (Page 16).
  - `/tasks/:id`: Task Verification & Detail page with route param, approval workflows, and comments feed (Pages 17 & 18).
- [x] **Client-Side Form Validation:** Real-time validation for task title, category, priority, due date, and assignee in `CreateTaskView.vue`.
- [x] **Pinia Store & Mock Service Layer:** `taskStore`, `projectStore`, `userStore`, and `langStore` backed by `services/api.ts` with local storage persistence and simulated network delay.
- [x] **UI States:** Explicit `LoadingState`, `EmptyState`, and `ErrorState` components across views.
- [x] **UI & Typography Polish:** Material Design Icons via [Iconify MDI](https://icon-sets.iconify.design/mdi/) and **Kantumruy Pro** Google Font for authentic Khmer typography.
- [x] **Design Explanation:** Detailed explanation documented in `MILESTONES.md`.

---

## 🚀 How to Run the Frontend Prototype

### Prerequisites
- Node.js >= 18
- npm >= 9

### Commands (inside `/web`)
```bash
cd web

# 1. Install dependencies
npm install

# 2. Strict TypeScript type check
npm run check

# 3. ESLint verification
npm run lint

# 4. Production build
npm run build

# 5. Launch development server
npm run dev
```

App runs locally at: **`http://localhost:5173/`**

---

## 📁 Repository Structure
```
├── docs/
│   ├── wireframes/
│   │   ├── balsamiq_wireframes.pdf   # Complete 18-page UX design specification
│   │   ├── 01-projects-dashboard.svg # Dashboard & Work Summary wireframe
│   │   ├── 02-project-detail.svg     # Task Verification & Detail wireframe
│   │   ├── 03-create-project-form.svg# Create Task Form wireframe
│   │   ├── 04-task-explorer.svg      # Tasks Explorer (Table & Kanban) wireframe
│   │   └── README.md                 # Wireframe page mapping table
│   └── SPEC.md                       # Functional specifications
├── web/                              # Vue 3 + TypeScript Frontend Application
│   ├── src/
│   │   ├── components/               # HeaderBar, LoadingState, EmptyState, ErrorState
│   │   ├── plugins/                  # icons.ts (Iconify MDI offline bundle)
│   │   ├── router/                   # Vue Router route configuration
│   │   ├── services/                 # api.ts (mock service layer) & mockData.ts
│   │   ├── stores/                   # Pinia stores (taskStore, userStore, langStore, projectStore)
│   │   ├── types/                    # TypeScript data models and interfaces
│   │   └── views/                    # DashboardView, TasksView, CreateTaskView, TaskDetailView
├── AI_LOG.md                         # Transparent AI usage log
├── DECISIONS.md                      # Architecture & design decisions
├── MILESTONES.md                     # Milestone tracking & design questions
└── PROPOSAL.md                       # Project proposal & user stories
```
