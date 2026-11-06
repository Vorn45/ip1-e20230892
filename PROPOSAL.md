# LabTrack - Laboratory Equipment Lending System

## Problem
University science and engineering students frequently lose valuable study time waiting in physical queues or struggling to find whether specialized lab apparatus and diagnostic tools are currently available for their coursework. At the same time, lab assistants lack a centralized system to track inventory, leading to unreturned equipment, double-booking conflicts, and untracked overdue loans.

## Users and roles
- **Student**: Browses available lab equipment, submits loan requests for required gear, monitors personal loan statuses, and cancels pending requests if plans change.
- **Lab Assistant**: Manages the equipment catalogue and categories (create, update, retire), reviews and approves or rejects loan requests, records equipment handovers and returns, and tracks overdue items.

## User stories
1. **As a student**, I want to submit a loan request for available lab equipment so that I can reserve the necessary tools for my laboratory assignments.
   Accepted when: The selected equipment has an `AVAILABLE` status and the requested duration does not exceed the maximum allowed period (7 days);
   Upon submission, a new loan record is created with a `PENDING` status associated with the student's account;
   The student receives immediate feedback and can view the request in their active loans list.

2. **As a lab assistant**, I want to approve or reject pending equipment loan requests so that inventory allocation is verified and controlled.
   Accepted when: The lab assistant can view all pending requests with student details, equipment name, and requested timeframes;
   Approving transitions the loan status to `APPROVED` and changes the equipment status from `AVAILABLE` to `BORROWED`;
   Rejecting transitions the loan status to `REJECTED`, requires a recorded reason, and keeps the equipment status as `AVAILABLE`.

3. **As a student or lab assistant**, I want to search and filter equipment by keyword and category with pagination so that I can quickly locate specific items without loading hundreds of records at once.
   Accepted when: Typing a keyword dynamically filters the catalogue by equipment name or model number;
   Selecting a category filter updates the displayed list to only include equipment belonging to that category;
   Results are paginated at 10 items per page with clear controls to navigate between pages and indicators of the current page and total item count.

4. **As a student**, I want to view my current and past loan history so that I can track due dates and avoid late return penalties.

5. **As a student**, I want to cancel my pending loan request so that the equipment becomes available to others if I no longer need it.

6. **As a lab assistant**, I want to add new equipment items to the inventory with category, model, and serial number so that students can discover newly acquired apparatus.

7. **As a lab assistant**, I want to record the return of borrowed equipment so that the loan is marked as `RETURNED` and the equipment status returns to `AVAILABLE`.

8. **As a student**, I want to upload a photo of the equipment condition upon pickup so that I am not held responsible for pre-existing scratches or damage.

## MVP scope
- **Must have**: Story 1, Story 2, Story 3, Story 4, Story 5, Story 6, Story 7
- **Nice to have**: Story 8

## Entities
| Entity | Main attributes | Relations |
|---|---|---|
| User | id, email, passwordHash, name, role (`STUDENT`, `LAB_ASSISTANT`), createdAt, updatedAt | has many Loans |
| Category | id, name, description, createdAt, updatedAt | has many Equipment |
| Equipment | id, name, modelNumber, serialNumber, status (`AVAILABLE`, `BORROWED`, `MAINTENANCE`, `RETIRED`), categoryId, createdAt, updatedAt | belongs to Category, has many Loans |
| Loan | id, userId, equipmentId, status (`PENDING`, `APPROVED`, `REJECTED`, `ACTIVE`, `RETURNED`, `OVERDUE`), borrowedAt, dueAt, returnedAt, notes, createdAt, updatedAt | belongs to User, belongs to Equipment |

## Stretch feature
**Search, filter and pagination**
What it does in this app:
Provides a server-side paginated catalogue (10 items per page) enabling users to search equipment by name or model number, and combine filters for category and availability status. The API returns the paginated data slice alongside pagination metadata (`page`, `limit`, `totalCount`, `totalPages`), and the Vue 3 frontend updates the view with loading and empty state handling.

## Repository
https://github.com/Vorn45/ip1--e20230892-
