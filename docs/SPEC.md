# Specification: LabTrack

## Overview
LabTrack is a web application designed for university departments to manage lab equipment lending between students and lab assistants.

## User Stories & Acceptance Criteria

### US-01: Submit Loan Request
**As a student**, I want to submit a loan request for available lab equipment so that I can reserve the necessary tools for my laboratory assignments.
**Acceptance Criteria:**
- Given an equipment item with status `AVAILABLE` and a requested period within 7 days, when the student submits the request, then a `Loan` record is created with status `PENDING` linked to the student.
- Given an equipment item currently `BORROWED` or in `MAINTENANCE`, when the student attempts to borrow it, then the system prevents submission and alerts the user.

### US-02: Review Loan Requests
**As a lab assistant**, I want to approve or reject pending equipment loan requests so that inventory allocation is verified and controlled.
**Acceptance Criteria:**
- Given a list of `PENDING` loans, when the assistant clicks approve, then the loan status changes to `APPROVED` and the equipment status changes to `BORROWED`.
- Given a pending loan, when the assistant clicks reject with a reason note, then the loan status changes to `REJECTED` and the equipment remains `AVAILABLE`.

### US-03: Search, Filter, and Pagination (Stretch Feature)
**As a student or lab assistant**, I want to search and filter equipment by keyword and category with pagination so that I can quickly locate specific items without loading hundreds of records at once.
**Acceptance Criteria:**
- Given query params `search`, `categoryId`, `status`, `page`, and `limit`, when the API is called, then it returns a paginated list of matching items along with pagination metadata (`totalCount`, `totalPages`, `page`, `limit`).
- Given an empty search result, when filters yield no matches, then an informative empty state is shown on the UI.

### US-04: View Loan History
**As a student**, I want to view my current and past loan history so that I can track due dates and avoid late return penalties.

### US-05: Cancel Loan Request
**As a student**, I want to cancel my pending loan request so that the equipment becomes available to others if I no longer need it.

### US-06: Manage Inventory
**As a lab assistant**, I want to add new equipment items to the inventory with category, model, and serial number so that students can discover newly acquired apparatus.

### US-07: Process Return
**As a lab assistant**, I want to record the return of borrowed equipment so that the loan is marked as `RETURNED` and the equipment status returns to `AVAILABLE`.

### US-08: Photo Documentation (Nice-to-Have / Future Scope)
**As a student**, I want to upload a photo of the equipment condition upon pickup so that I am not held responsible for pre-existing scratches or damage.
