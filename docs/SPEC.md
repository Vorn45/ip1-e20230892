# Specification: PlanFlow

## Overview
PlanFlow is a full-stack team project planning and task tracker web application for small project teams and university capstone groups, supporting role-based project setup (`MANAGER`) and task execution (`MEMBER`).

## User Stories & Acceptance Criteria

### US-01: Create Project and Assign Tasks
**As a Project Manager**, I want to create a project and assign prioritized tasks with due dates to team members so that everyone knows what they own and when it is due.
**Acceptance Criteria:**
- Given a valid title, description, and deadline, when a `MANAGER` creates a project, then a `Project` record is stored with `ownerId` set to the authenticated manager.
- Given a valid `projectId`, title, priority (`LOW`, `MEDIUM`, `HIGH`), due date, and `assigneeId`, when a `MANAGER` creates a task, then a `Task` record is created with status `TODO` and appears in the project detail view and assignee's task list.
- Given a `MEMBER` user, when they attempt to create a project or assign a task, then the API returns `403 Forbidden`.

### US-02: Update Assigned Task Status & Ownership Check
**As a Team Member**, I want to update the status of my own assigned tasks and submit them for review so that the project manager can track real-time progress and verify completion.
**Acceptance Criteria:**
- Given a task whose `assigneeId` equals the logged-in member's ID, when the member updates status from `TODO` to `IN_PROGRESS` or `IN_REVIEW`, then the update succeeds and returns `200 OK`.
- Given a task assigned to a different user, when a `MEMBER` attempts to update or delete it, then the API rejects the request with `403 Forbidden`.
- Given a `MEMBER` attempting to set a task directly to `DONE`, then the API rejects the transition because final approval is restricted to `MANAGER`.

### US-03: Search, Filter, and Pagination (Stretch Feature)
**As a Project Manager or Team Member**, I want to search and filter tasks across projects by keyword, status, priority, and project with pagination so that I can quickly find urgent deliverables in large plans.
**Acceptance Criteria:**
- Given query params `search`, `status`, `priority`, `projectId`, `page`, and `limit`, when the tasks endpoint is called, then it returns matching tasks paginated at 10 per page alongside pagination metadata (`page`, `limit`, `totalCount`, `totalPages`).
- Given filters that match zero tasks, when the API responds, then the UI displays a clear empty state message.

### US-04: Review and Approve Tasks
**As a Project Manager**, I want to review `IN_REVIEW` tasks and approve them as `DONE` or return them to `IN_PROGRESS` with review feedback so that deliverables meet quality expectations before closing.

### US-05: Task Comments & Ownership
**As a Team Member or Project Manager**, I want to add, edit, and delete my own comments on a task so that blockers, progress updates, and review notes remain documented alongside the work item.

### US-06: Manage Owned Projects
**As a Project Manager**, I want to update project details, change project status (`PLANNING`, `ACTIVE`, `COMPLETED`, `ARCHIVED`), or delete projects I own so that the workspace reflects current priorities.

### US-07: Project Progress Overview
**As a Team Member**, I want to view a project overview displaying task completion progress and upcoming deadlines so that I can prioritize my daily workload effectively.

### US-08: Task File Attachments (Nice-to-Have / Future Scope)
**As a Team Member**, I want to upload file attachments such as design mockups or PDF specs directly onto a task so that reference documents are stored with the work item.

### US-09: Automated Deadline Reminders (Nice-to-Have / Future Scope)
**As a Project Manager**, I want to receive automated daily email reminders for overdue tasks so that I can follow up with assignees before project deadlines slip.
