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
- [x] Wireframes (photo or tool) of the main screens in `docs/` (`docs/wireframes/balsamiq_wireframes.pdf` and SVGs: `01-projects-dashboard.svg`, `02-project-detail.svg`, `03-create-project-form.svg`, `04-task-explorer.svg`)
- [x] Vue 3 + TypeScript app created with Vite; strict mode on; ESLint passes
- [x] At least 4 routes, including a detail page with a route parameter (`/`, `/dashboard`, `/tasks`, `/tasks/new`, `/tasks/:id`, `/projects`, `/projects/:id`)
- [x] At least one form with client-side validation (`CreateTaskView.vue` with real-time validation on title, category, priority, due date, assignee, and file attachments dropzone matching Balsamiq Page 16; also `CreateProjectView.vue`)
- [x] A Pinia store and a service layer calling a mock API (json-server or local JSON) (`taskStore`, `projectStore`, `userStore`, `langStore`, backed by `services/api.ts` with local storage persistence)
- [x] Loading, empty and error states visible (`LoadingState.vue`, `EmptyState.vue`, `ErrorState.vue` across all views)

### Explain: What state lives in the store and what stays inside a component? Why?
**1. What lives in the Pinia store (Shared Application Domain State):**
- **Domain entity collections & active records:** The list of tasks (`projectTasks`, `paginatedTasks`, `currentTask`), project collections, and task verification comments. These represent shared domain records accessed and mutated by multiple routes (e.g. `/dashboard` metrics, `/tasks` list/Kanban, and `/tasks/:id` verification actions).
- **Session, identity & language state:** `currentUser` and `users` in `userStore` (with active roles `MANAGER` vs `MEMBER` to verify ownership boundaries live), and `currentLang` in `langStore` (`'km'` for Khmer vs `'en'` for English) for bilingual rendering.
- **Global async status & error recovery:** Store-level `isLoading` and `error` states for asynchronous mock API delays, ensuring uniform loading spinners and network failure banners.

**2. What stays inside a component (Local Ephemeral UI State):**
- **Form input drafts & touched states:** Reactive fields like `form.title`, `form.category`, `form.dueDate`, `form.assigneeId` in `CreateTaskView.vue`, and `newComment` in `TaskDetailView.vue`.
- **Client-side validation errors & touched flags:** Ephemeral error messages (`errors.title`, `errors.dueDate`, `submitError`) that evaluate user keystrokes in real time.
- **Local view toggles & presentation controls:** Dropzone hover states (`isDragging`), view switcher mode (Table vs Kanban view in `TasksView.vue`), filter search inputs, and modal popover open/close states (`showRoleModal` in `HeaderBar.vue`).

**3. Why this separation matters:**
- **Reactivity performance & clean component lifecycle:** Ephemeral keystrokes, drag-and-drop file states, and modal visibility do not belong in global memory. Storing them inside component scope ensures automatic garbage collection when navigating away, preventing unnecessary global re-renders and memory bloat.
- **Single source of truth & multi-component synchronization:** In contrast, storing task entities and verification statuses in Pinia ensures that approving a task (`IN_REVIEW` -> `DONE`) immediately updates the completion metric on the Dashboard (`59.35%`), shifts cards on the Kanban board, and appends review comments in the detail view without brittle prop drilling or event buses. This architecture prepares the app for Milestone 3 where mock services are replaced with real NestJS HTTP endpoints.

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
