# Project Milestones & Design Explanations

---

## M0 Proposal (Week 3)

### Checklist
- [x] `PROPOSAL.md` follows the template in Appendix A
- [x] Problem stated in two sentences; target users and at least 2 roles named
- [x] 6–10 user stories, with acceptance criteria for the 3 most important
- [x] MVP scope split into must-have and nice-to-have
- [x] Entity list with main attributes and relations; at least 3 entities (User, Project, Task, Comment)
- [x] Chosen stretch feature named (Search, filter and pagination)

### Explain: Which story did you cut from the MVP, and why?
**Stories cut from MVP:** Story 8 (*"As a Team Member, I want to upload file attachments such as design mockups or PDF specs directly onto a task so that reference documents are stored with the work item."*) and Story 9 (*"As a Project Manager, I want to receive automated daily email reminders for overdue tasks so that I can follow up with assignees before project deadlines slip."*).

**Why they were cut:**
1. **Focus on Multi-User Planning & Role-Based Ownership:** The core goal of PlanFlow is coordinating projects, task assignments, status review workflows (`TODO` -> `IN_PROGRESS` -> `IN_REVIEW` -> `DONE`), and task discussions with strict role (`MANAGER` vs `MEMBER`) and ownership boundaries—so the application clearly serves collaborative project planning rather than a simple personal to-do list.
2. **Reduced Infrastructure and Deployment Complexity:** Story 8 requires multipart upload parsing, MIME/size validation, and persistent disk volumes or object storage in Docker, while Story 9 introduces external SMTP credentials and scheduled background jobs. Cutting both removes external failure points and security risks during the core build.
3. **Feasibility within Timeline:** Deferring attachments and email notifications keeps the MVP focused on clean relational CRUD in NestJS + Prisma/PostgreSQL, server-side search/filter/pagination, Pinia state management, and thorough unit/e2e test coverage.

---

## M1 Frontend Prototype (Week 5)
- [x] Wireframes (photo or tool) of the main screens in `docs/` (`docs/wireframes/balsamiq_wireframes.pdf` and SVGs in `docs/wireframes/`)
- [x] Vue 3 + TypeScript app created with Vite; strict mode on; ESLint passes
- [x] At least 4 routes, including a detail page with a route parameter (`/`, `/projects`, `/projects/:id`, `/projects/new`, `/tasks`)
- [x] At least one form with client-side validation (`CreateProjectView.vue` with real-time validation on title, description, deadline, owner)
- [x] A Pinia store and a service layer calling a mock API (json-server or local JSON) (`projectStore`, `taskStore`, `userStore`, backed by `services/api.ts` and `public/mock/db.json`)
- [x] Loading, empty and error states visible (`LoadingState.vue`, `EmptyState.vue`, `ErrorState.vue` across all views)

### Explain: What state lives in the store and what stays inside a component? Why?
**1. What lives in the Pinia store (Shared Application Domain State):**
- **Domain entity collections & active records:** The list of `projects`, the currently active `currentProject`, `projectTasks`, and `paginatedTasks`. These entities represent shared backend domain data needed across multiple routes (e.g. navigating from `/projects` to `/projects/:id` or exploring `/tasks`).
- **Session & identity state:** `currentUser` and `users` (including active role `MANAGER` vs `MEMBER`). This identity determines authorization rules (e.g., whether status buttons for approval or work-in-progress are enabled or forbidden) and is needed globally by the navbar, detail inspector, and route views.
- **Global async status & errors:** Store-level `isLoading` and `error` states for asynchronous operations, ensuring consistent loading indicators and error recovery.

**2. What stays inside a component (Local Ephemeral UI State):**
- **Form input drafts & touched states:** Reactive objects like `form.title`, `form.description`, `form.deadline` in `CreateProjectView`, and `newCommentText` in `ProjectDetailView`.
- **Client-side validation errors:** Field-level `touched` flags and computed error strings (`errors.title`, `errors.deadline`).
- **Ephemeral UI controls:** Active tab selection (`activeTab = 'ALL' | 'TODO' | ...`), local action feedback toast timeouts, modal visibility toggles, and dropdown open/close states.

**3. Why this separation matters:**
- **Reactivity performance & clean boundaries:** Storing form input keystrokes or UI toggles in a global store introduces unnecessary global reactivity tracking, excessive action dispatching, and memory bloat. Form state should naturally reset with the component lifecycle when unmounted or canceled.
- **Single source of truth:** In contrast, keeping projects and tasks in Pinia guarantees that updating a task's status or deleting a project immediately synchronizes everywhere (e.g., updating progress percentages in detail view and reflecting in metrics) without fragile prop-drilling or event-bus spaghetti. This architecture enables swapping the mock service layer for the real NestJS API in Milestone 3 without changing component template logic.

---

## M2 Backend API (Week 7)
*(Pending Week 7)*
- [ ] API contract (`docs/api.md`) and ERD in `docs/`
- [ ] NestJS API with one module per resource (controller, service, DTOs)
- [ ] Prisma schema, migrations and a seed script; PostgreSQL runs in Docker
- [ ] CRUD endpoints for at least 3 entities, with server-side validation
- [ ] Correct status codes (200, 201, 204, 400, 404) and consistent error JSON

### Explain: Why did you choose this relation (1-N or N-N) between two of your entities?
*To be completed in M2.*

---

## M3 Integrated App (Week 9)
*(Pending Week 9)*
- [ ] Frontend calls the real API; the mock is gone
- [ ] Registration, login, logout; passwords hashed
- [ ] Guards on the API for authentication, roles and ownership
- [ ] Route guards in Vue; the UI hides what a role cannot do
- [ ] Security checklist from week 9 run on your app; findings fixed or listed
- [ ] 3-minute demo in the practice session

### Explain: Where is the token stored in the browser, and what attack does that choice protect against or expose?
*To be completed in M3.*

---

## M4 Feature Complete (Week 12)
*(Pending Week 12)*
- [ ] Every MVP user story works end to end
- [ ] Stretch feature implemented
- [ ] Unit tests for core services; e2e tests for the main endpoints; all green
- [ ] Swagger documentation available

### Explain: Pick one test. What bug would it catch?
*To be completed in M4.*

---

## M5 Deployed (Week 14)
*(Pending Week 14)*
- [ ] Dockerfiles for frontend and backend; `docker-compose.yml` for the whole stack
- [ ] Running on the school server with HTTPS, or starting locally with one `docker compose up`
- [ ] GitHub Actions workflow runs lint, tests and build on every push
- [ ] README complete; no secrets in the repository

### Explain: What happens, step by step, between git push and your change being live?
*To be completed in M5.*
