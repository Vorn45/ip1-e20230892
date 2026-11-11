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

<!-- Copy this template for each new entry:

## YYYY-MM-DD · Short description
**Tool:** tool name
**Asked:** what you asked
**Kept:** what you used from the output
**Rejected:** what you changed and why
**Checked by:** how you verified it works

---
-->
