# PlanFlow Wireframes Specification (Milestone 1)

This directory contains the authentic UI/UX wireframes for **PlanFlow**, designed in **Balsamiq** and exported as vector diagrams for the 4 core prototype screens, along with the full 18-page system specification document.

---

## 1. Core Milestone 1 Screens (SVG Wireframes)

As specified in the course requirements and prioritized for Milestone 1 (**4 core interactive screens**):

| # | Wireframe File | Route | Balsamiq Page | Feature Description |
|---|---|---|---|---|
| **1** | [01-projects-dashboard.svg](./01-projects-dashboard.svg) | `/dashboard` | **Page 5** | **Work Summary & Dashboard:** Profile header (Lead / Manager), task metrics breakdown (Total: `១២៣`, Todo: `១៨`, In Progress: `៣២`, In Review: `១៦`, Completed: `៥៧`), 59.35% completion rate progress bar, and newly assigned tasks cards. |
| **2** | [04-task-explorer.svg](./04-task-explorer.svg) | `/tasks` | **Page 13 & 14** | **Tasks Explorer (Table & Kanban):** Left sidebar navigation (Table view, Kanban board, Status filters), live search by code/title, status badges, assignee labels, and pagination controls. |
| **3** | [03-create-project-form.svg](./03-create-project-form.svg) | `/tasks/new` | **Page 16** | **Create Task Form:** Drag-and-drop file attachment dropzone (PNG, JPG, PDF max 2MB), task title, category select, priority selector, due date picker, assignee dropdown, and real-time client-side validation. |
| **4** | [02-project-detail.svg](./02-project-detail.svg) | `/tasks/:id` | **Page 17 & 18** | **Task Verification & Detail Page:** Route parameter `:id`, task code (e.g. `#000b-005` / `CCN-024800`), role-enforced approval buttons (*Request Changes* `ស្នើសុំកែប្រែ` vs *Approve* `✓ អនុម័តការផ្ទៀងផ្ទាត់`), and interactive comments discussion feed. |

---

## 2. Complete 18-Page Balsamiq Specification

The complete project UX flow is documented in the attached Balsamiq document:
📄 **[balsamiq_wireframes.pdf](./balsamiq_wireframes.pdf)**

### Screen Mapping Overview

| Page | Screen / Feature | Milestone Scope | Description |
|---|---|---|---|
| **Page 1** | **ចូលប្រព័ន្ធ (Login)** | M3/M4 Auth | Email/Phone login, remember me, forgot password, QR login. |
| **Page 2** | **បង្កើតគណនីថ្មី (Registration 1)** | M3/M4 Auth | Registration form with department and role selection. |
| **Page 3** | **ផ្ទៀងផ្ទាត់ OTP (Registration 2)** | M3/M4 Auth | 6-digit OTP security verification code entry. |
| **Page 4** | **ចូលប្រព័ន្ធតាម QR (QR Login)** | M3/M4 Auth | QR-code login with dynamic expiry countdown. |
| **Page 5** | **ផ្ទាំងព័ត៌មាន (Main Dashboard)** | **Milestone 1 Core** | Profile summary, work metric breakdown, completion rate, newly assigned task cards. |
| **Page 6** | **រចនាសម្ព័ន្ធក្រុម (Team Hierarchy)** | Future Extension | Visual organizational chart (Department Head, Team Lead, Designers). |
| **Page 7** | **ការជូនដំណឹង (Notifications Drawer)** | Future Extension | Drawer showing system alerts, reminders, and verification feeds. |
| **Page 8** | **កែសម្រួលគណនី (Profile Edit)** | Future Extension | Avatar upload and contact information editor. |
| **Page 9** | **ការកំណត់ការបង្ហាញ (Appearance)** | Milestone 1 Support | Khmer/English bilingual toggle (`langStore`) and theme tokens. |
| **Page 10**| **ម៉ឺនុយអ្នកប្រើប្រាស់ (User Menu)** | Milestone 1 Support | Persona switching and logout modal triggers. |
| **Page 11**| **ផ្លាស់ប្តូរតួនាទី (Switch Role Modal)** | **Milestone 1 Core** | Live persona switcher (Manager vs Member) to demonstrate ownership rules. |
| **Page 12**| **ប្រព័ន្ធសុវត្ថិភាព (Security & 2FA)** | M3/M4 Security | Password change and multi-device 2FA session manager. |
| **Page 13**| **តារាងការងារ (Tasks Table List)** | **Milestone 1 Core** | Search, filter pills, task rows, comments badge, and pagination. |
| **Page 14**| **ផ្ទាំងកាត់បាន (Tasks Kanban Board)** | **Milestone 1 Core** | Multi-column Kanban board view with status toggling. |
| **Page 15**| **ប្រតិទិនការងារ (Calendar View)** | Future Extension | Monthly/weekly scheduling calendar. |
| **Page 16**| **បង្កើតការងារថ្មី (Create Task Form)** | **Milestone 1 Core** | Client-side validated form, drag-and-drop attachments, deadline picker. |
| **Page 17**| **ផ្ទៀងផ្ទាត់ទិន្នន័យ (Task Verification)** | **Milestone 1 Core** | Detailed task specification, Request Changes / Approve verification buttons. |
| **Page 18**| **បញ្ចូលមតិយោបល់ (Task Comments Feed)**| **Milestone 1 Core** | Real-time discussion comments feed persisted via mock API service. |

---

## 3. Why Only the 4 Main Screens are Built for M1 ("yes but not yet to do all page")

1. **Course Prototype Focus:** Milestone 1 focuses on verifying core frontend client architecture (Vue 3, TypeScript strict mode, Vue Router dynamic routes, Pinia reactive stores, mock service layer, client-side validation, loading/empty/error states).
2. **Avoiding Premature Complexity:** Full authentication (OAuth, 2FA, OTP, QR generation) requires the NestJS backend and database, scheduled for Milestone 2 and Milestone 3.
3. **High-Fidelity Core Flow:** Implementing the core 4 screens (Dashboard, Tasks Explorer, Create Task Form, Task Verification Detail) demonstrates the complete end-to-end task lifecycle, ownership rules, and state management without bloat.
