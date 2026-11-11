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
*(Pending Week 5)*
- [ ] Wireframes (photo or tool) of the main screens in `docs/`
- [ ] Vue 3 + TypeScript app created with Vite; strict mode on; ESLint passes
- [ ] At least 4 routes, including a detail page with a route parameter
- [ ] At least one form with client-side validation
- [ ] A Pinia store and a service layer calling a mock API (json-server or local JSON)
- [ ] Loading, empty and error states visible

### Explain: What state lives in the store and what stays inside a component? Why?
*To be completed in M1.*

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
