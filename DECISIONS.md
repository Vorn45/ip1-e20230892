# Design Decisions

> One line per real design choice. Date · Decision · Rationale.

| Date       | Decision                              | Rationale                                      |
|------------|---------------------------------------|-------------------------------------------------|
| 2026-10-20 | Vue 3 + Vite + TypeScript for frontend | Modern DX, fast HMR, type safety               |
| 2026-10-20 | NestJS + Prisma for backend           | Structured architecture, type-safe ORM          |
| 2026-10-20 | Separate `web/` and `api/` folders    | Clear separation of concerns, independent deploys |
| 2026-11-06 | Project Domain: Lab Equipment Lending | Meets 2-role requirement (Student/Lab Assistant), natural 1-N relations (Category, Equipment, Loan, User), clear ownership & status transitions |
| 2026-11-06 | Stretch Feature: Search, filter & pagination | High reliability across NestJS & Prisma, directly benefits inventory usability without fragile external dependencies |
