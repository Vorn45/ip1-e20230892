# PlanFlow - Team Project Planning & Task Tracker

## Problem
Small project teams and university capstone groups struggle to coordinate project deadlines, task ownership, and review progress across scattered spreadsheets and chat threads. Without clear role separation between project leads and team members, tasks fall behind schedule, responsibilities blur, and overdue deliverables go unnoticed until it is too late.

## Users and roles
- **Project Manager (`MANAGER`)**: Creates and manages projects with target deadlines, breaks work into prioritized tasks assigned to team members, reviews completed submissions (`IN_REVIEW` to `DONE` or `IN_PROGRESS`), and oversees project completion.
- **Team Member (`MEMBER`)**: Views assigned projects and tasks, searches and filters tasks by keyword, priority, or status, updates progress on their own assigned tasks (`TODO` to `IN_PROGRESS` to `IN_REVIEW`), and posts progress comments.

## User stories
1. **As a Project Manager**, I want to create a project and assign prioritized tasks with due dates to team members so that everyone knows what they own and when it is due.
   Accepted when: Creating a project validates a non-empty title, description, and future deadline, saving the authenticated manager as `ownerId`;
   Creating a task under the project validates a title, priority (`LOW`, `MEDIUM`, `HIGH`), due date, and existing `assigneeId`;
   The newly assigned task immediately appears in the project detail view and on the assigned team member's task board.

2. **As a Team Member**, I want to update the status of my own assigned tasks and submit them for review so that the project manager can track real-time progress and verify completion.
   Accepted when: A member can transition only tasks where `assigneeId` matches their user ID along `TODO` -> `IN_PROGRESS` -> `IN_REVIEW`;
   Attempting to update or delete another user's task returns `403 Forbidden`;
   A `MEMBER` cannot mark a task `DONE` directly—final approval requires a `MANAGER`.

3. **As a Project Manager or Team Member**, I want to search and filter tasks across projects by keyword, status, priority, and project with pagination so that I can quickly find urgent deliverables in large plans.
   Accepted when: Entering a search keyword filters tasks by matching title or description;
   Selecting `status`, `priority`, or `projectId` filters returns only tasks matching all active criteria;
   Results are paginated at 10 tasks per page, returning pagination metadata (`page`, `limit`, `totalCount`, `totalPages`) and displaying clear page navigation controls in the UI.

4. **As a Project Manager**, I want to review `IN_REVIEW` tasks and approve them as `DONE` or return them to `IN_PROGRESS` with review feedback so that deliverables meet quality expectations before closing.

5. **As a Team Member or Project Manager**, I want to add, edit, and delete my own comments on a task so that blockers, progress updates, and review notes remain documented alongside the work item.

6. **As a Project Manager**, I want to update project details, change project status (`PLANNING`, `ACTIVE`, `COMPLETED`, `ARCHIVED`), or delete projects I own so that the workspace reflects current priorities.

7. **As a Team Member**, I want to view a project overview displaying task completion progress and upcoming deadlines so that I can prioritize my daily workload effectively.

8. **As a Team Member**, I want to upload file attachments such as design mockups or PDF specs directly onto a task so that reference documents are stored with the work item.

9. **As a Project Manager**, I want to receive automated daily email reminders for overdue tasks so that I can follow up with assignees before project deadlines slip.

## MVP scope
Must have: Story 1, Story 2, Story 3, Story 4, Story 5, Story 6, Story 7
Nice to have: Story 8, Story 9

## Entities
| Entity | Main attributes | Relations |
|---|---|---|
| User | id, email, passwordHash, name, role (`MANAGER`, `MEMBER`), createdAt, updatedAt | owns many Projects; assigned many Tasks; authors many Comments |
| Project | id, title, description, status (`PLANNING`, `ACTIVE`, `COMPLETED`, `ARCHIVED`), deadline, ownerId, createdAt, updatedAt | belongs to User (owner); has many Tasks |
| Task | id, title, description, status (`TODO`, `IN_PROGRESS`, `IN_REVIEW`, `DONE`), priority (`LOW`, `MEDIUM`, `HIGH`), dueDate, projectId, assigneeId, createdAt, updatedAt | belongs to Project; belongs to User (assignee); has many Comments |
| Comment | id, content, taskId, authorId, createdAt, updatedAt | belongs to Task; belongs to User (author) |

## Stretch feature
Search, filter and pagination.
What it does in this app:
Provides a server-side paginated task explorer (10 items per page) allowing managers and team members to search tasks by title or description and filter simultaneously by project, task status (`TODO`, `IN_PROGRESS`, `IN_REVIEW`, `DONE`), and priority (`LOW`, `MEDIUM`, `HIGH`). The NestJS API returns the filtered slice alongside pagination metadata (`page`, `limit`, `totalCount`, `totalPages`), and the Vue 3 UI renders loading, empty, and error states cleanly.

## Repository
https://github.com/Vorn45/ip1-e20230892
