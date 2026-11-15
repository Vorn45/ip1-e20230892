# AI Usage Log

> One entry per meaningful AI use. Be honest and specific.

---

## 2026-10-20 · Project scaffolding
**Tool:** Antigravity (Claude)
**Asked:** Set up project folder structure with Vue 3 + Vite + TS frontend and NestJS + Prisma backend
**Kept:** Folder structure, framework initialization commands, markdown templates
**Rejected:** —
**Checked by:** Verified both `npm run dev` commands start correctly

---

## 2026-10-20 · Fix CI failure for api job
**Tool:** Antigravity (Gemini Flash)
**Asked:** Fix failing GitHub Actions CI on the `api` push job
**Kept:** Regenerated and synced `api/package-lock.json` with prisma dependencies, tested local `npm ci` and `npm run build`
**Rejected:** —
**Checked by:** Tested `npm ci` and `npm run build` locally in `api/` (both passed with exit code 0)

---

## 2026-11-06 · Milestone M0 proposal and design specifications
**Tool:** Antigravity (Gemini Flash)
**Asked:** Formulate M0 proposal according to course guidelines for full-stack Vue 3 + NestJS + PostgreSQL project
**Kept:** Project domain (Lab Equipment Lending System), 2 roles (Student, Lab Assistant), 8 user stories with 3 detailed acceptance criteria, MVP scope split, 4 relational entities (User, Category, Equipment, Loan), stretch feature (Search, filter and pagination), and MILESTONES.md design explanation for MVP scope reduction
**Rejected:** External file storage upload stretch feature to eliminate Docker disk mount complications during early milestones
**Checked by:** Verified strict alignment against M0 checklist and Appendix A template requirements

---

## 2026-11-11 · Pivot M0 proposal topic to PlanFlow (Project Planning)
**Tool:** Antigravity (Gemini)
**Asked:** Update M0 proposal and specifications after switching project topic to a Team Project Planning web app with Search, filter and pagination
**Kept:** PlanFlow domain (`MANAGER` and `MEMBER` roles), 4 entities (`User`, `Project`, `Task`, `Comment`), 9 user stories with acceptance criteria for top 3, ownership/review rules distinguishing it from a simple to-do list, updated `MILESTONES.md`, `docs/SPEC.md`, and `DECISIONS.md`
**Rejected:** File attachment uploads and automated email reminders (deferred to nice-to-have) to keep MVP focused on core planning workflows
**Checked by:** Verified alignment with Appendix A template and M0 checklist criteria

---

## 2026-11-15 · Milestone M1 Frontend Prototype implementation
**Tool:** Antigravity (Gemini)
**Asked:** Build M1 Frontend prototype for PlanFlow in Vue 3 + TypeScript with Pinia, Vue Router, mock service layer, client-side validation form, wireframes, and ESLint configuration
**Kept:** Vue 3 SPA architecture with 5 routes (`/projects`, `/projects/new`, `/projects/:id`, `/tasks`, `/:pathMatch`), Pinia stores (`projectStore`, `taskStore`, `userStore`), mock API service layer (`services/api.ts`, `services/mockData.ts`, `public/mock/db.json`), reactive client-side form validation, Balsamiq wireframes PDF in `docs/wireframes/`, loading/empty/error state components, strict TypeScript compilation, ESLint 9+ flat configuration, and MILESTONES.md design explanation for store vs component state
**Rejected:** Overly strict stylistic single-line HTML element newline ESLint rules in favor of standard Vue essential linting to prioritize code correctness
**Checked by:** Verified `vue-tsc -b` passed with 0 errors, `npm run lint` passed with 0 errors, and `npm run build` succeeded with 0 errors

---

## 2026-11-15 · Align Prototype Views & Wireframes to Balsamiq Design (4 Core Screens)
**Tool:** Antigravity (Gemini)
**Asked:** Align running frontend views and docs/wireframes to match the user's authentic Balsamiq wireframes for the 4 core Milestone 1 prototype screens without implementing all 18 pages ("yes but not yet to do all page")
**Kept:** Work Summary Dashboard view (`DashboardView.vue` matching Page 5 with bilingual metrics, completion rate, newly assigned cards), Tasks Explorer (`TasksView.vue` matching Page 13 & 14 with Table and Kanban board toggle), Create Task Form (`CreateTaskView.vue` matching Page 16 with client-side validation and drag-and-drop file attachment dropzone), Task Verification & Detail view (`TaskDetailView.vue` matching Page 17 & 18 with approval actions and comments discussion feed), `HeaderBar.vue` with bilingual toggle (`langStore`) and user persona switcher modal (Page 11), four vector SVG wireframes in `docs/wireframes/` (`01-projects-dashboard.svg`, `02-project-detail.svg`, `03-create-project-form.svg`, `04-task-explorer.svg`), and updated `docs/wireframes/README.md`
**Rejected:** Full 18-page implementation (deferred complex QR login, multi-device 2FA management, and organizational hierarchy trees to future milestones)
**Checked by:** Ran `npm run check` (0 errors), `npm run lint` (0 errors), and `npm run build` (0 errors) successfully in `web/`

---

<!-- Copy this template for each new entry:

## YYYY-MM-DD · Short description
**Tool:** tool name
**Asked:** what you asked
**Kept:** what you used from the output
**Rejected:** what you changed and why
**Checked by:** how you verified it works

---
-->
