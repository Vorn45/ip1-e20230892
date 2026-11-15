# PlanFlow Wireframes Specification

All UI/UX wireframes for **PlanFlow** were authored in **Balsamiq** and are compiled in the attached specification document:

📄 **[balsamiq_wireframes.pdf](./balsamiq_wireframes.pdf)**

---

## Screen Breakdown (18 Pages)

| Page | Screen / Feature | Description |
|---|---|---|
| **Page 1** | **ចូលប្រព័ន្ធ (Login)** | Phone/Email authentication, password masking, remember me, forgot password, Google OAuth, and QR code login option. |
| **Page 2** | **បង្កើតគណនីថ្មី (Registration - Step 1)** | Full name, phone/email, department selection (`ផ្នែកឌីហ្សាញ UI/UX`), requested role (`អ្នកឌីហ្សាញ`), password confirmation, and terms agreement. |
| **Page 3** | **ផ្ទៀងផ្ទាត់ OTP (Registration - Step 2)** | 6-digit OTP security verification input with timer, and initial password confirmation. |
| **Page 4** | **ចូលប្រព័ន្ធតាមលេខកូដ QR (QR Login)** | Dynamic QR code login with 2-minute countdown timer and scanner instructions. |
| **Page 5** | **ផ្ទាំងព័ត៌មាន និង សង្ខេបការងារ (Main Dashboard)** | Profile summary, task metrics breakdown (New, Confirmed, In Progress, In Review, Done), completion progress rate (59.35%), and newly assigned tasks. |
| **Page 6** | **រចនាសម្ព័ន្ធក្រុមការងារ (Team Hierarchy)** | Organizational chart displaying Department Head (`ប្រធានផ្នែក`), Team Lead (`ប្រធានក្រុម`), and Designers (`អ្នកឌីហ្សាញ UI/UX`). |
| **Page 7** | **ការជូនដំណឹង (Notifications Drawer)** | System, staff, and verification alert feed with unread indicators and action triggers. |
| **Page 8** | **កែសម្រួលព័ត៌មានផ្ទាល់ខ្លួន (Profile Edit Drawer)** | Avatar upload, username (`@piseth_kh`), email, website, phone, and birthdate settings. |
| **Page 9** | **ការកំណត់ការបង្ហាញ (Appearance & Settings)** | Language switcher (Khmer / English), theme contrast, font sizing, and layout modes. |
| **Page 10** | **ម៉ឺនុយអ្នកប្រើប្រាស់ (User Action Menu)** | Dropdown menu for role switching, security settings, and logout. |
| **Page 11** | **ផ្លាស់ប្តូរតួនាទី (Switch Role Modal)** | Persona switcher: Department Head, Team Lead, Document Reviewer, and Team Member. |
| **Page 12** | **ប្រព័ន្ធសុវត្ថិភាព និង ការពារគណនី (Security & 2FA)** | Password update form, 2FA/OTP toggle, and active login sessions management across devices. |
| **Page 13** | **តារាងការងារ (Tasks Table List View)** | Cross-project task table with search input, task code, deadline, comment count, assignee, and status columns. |
| **Page 14** | **ផ្ទាំងកាត់បាន (Tasks Kanban Board)** | Kanban columns (`ថ្មី` / New, `បញ្ជាក់` / Confirmed, `មិនទាន់បញ្ជាក់` / Unconfirmed) with draggable cards. |
| **Page 15** | **ប្រតិទិនការងារ (Tasks Calendar View)** | Monthly/weekly calendar scheduling view with task duration blocks and time slots. |
| **Page 16** | **បង្កើតការងារថ្មី (Create Task Drawer)** | Task creation form with drag-and-drop file attachment zone (PNG, JPG, PDF max 2MB), priority, deadline, category, and assignee. |
| **Page 17** | **ផ្ទៀងផ្ទាត់ទិន្នន័យ (Task Detail & Verification)** | Task verification details, discussion/review comments feed, with action buttons: *Request Changes* (`ស្នើសុំកែប្រែ`) and *Approve* (`អនុម័តការផ្ទៀងផ្ទាត់`). |
| **Page 18** | **ផ្ទៀងផ្ទាត់ទិន្នន័យ - បញ្ចូលមតិ (Task Discussion)** | Interactive timeline and discussion input for team members and managers. |

---

## Alignment with Course Prototype Requirements

- **Wireframe Tool Requirement:** Authored in Balsamiq (`balsamiq_wireframes.pdf`), covering all main screens.
- **Roles Represented:** Project Manager / Team Lead (`ប្រធានក្រុម / ប្រធានផ្នែក`) and Team Member (`សមាជិកក្រុម / អ្នកឌីហ្សាញ`).
- **Core Flows:** Authentication, multi-filter task explorer, detail inspector with role status approval, and form validation.
