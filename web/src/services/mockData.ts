import type { User, Project, Task, Comment } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 1,
    email: 'piseth@digitech.kh',
    name: 'Piseth Panhavorn',
    nameKm: 'ពិសិដ្ឋ បញ្ញាវុឌ្ឍ',
    role: 'MANAGER',
    roleTitleKm: 'ប្រធានក្រុមឌីហ្សាញ UI/UX',
    phone: '010 84 36 12'
  },
  {
    id: 2,
    email: 'alex.mercer@digitech.kh',
    name: 'Alex Mercer',
    nameKm: 'អាឡិច មឺស៊ើ',
    role: 'MEMBER',
    roleTitleKm: 'អ្នកឌីហ្សាញ UI/UX',
    phone: '012 34 56 78'
  },
  {
    id: 3,
    email: 'sophea.kh@digitech.kh',
    name: 'Sophea Kim',
    nameKm: 'សុភា គីម',
    role: 'MEMBER',
    roleTitleKm: 'អ្នកត្រួតពិនិត្យឯកសារ',
    phone: '077 88 99 00'
  },
  {
    id: 4,
    email: 'rithy.doe@digitech.kh',
    name: 'Rithy Doe',
    nameKm: 'រិទ្ធី ដូ',
    role: 'MANAGER',
    roleTitleKm: 'ប្រធានផ្នែកឌីហ្សាញ',
    phone: '098 76 54 32'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Mobile Banking App BMS',
    titleKm: 'អភិវឌ្ឍកម្មវិធីទូរស័ព្ទ BMS',
    description: 'Revamp consumer iOS & Android mobile banking UX with modern biometric authentication.',
    descriptionKm: 'កែលម្អប្រព័ន្ធកម្មវិធីទូរស័ព្ទដៃធនាគារ BMS ជាមួយនឹងការផ្ទៀងផ្ទាត់ជីវមាត្រ',
    status: 'ACTIVE',
    deadline: '2026-12-15',
    ownerId: 1,
    createdAt: '2026-10-01T08:00:00.000Z',
    updatedAt: '2026-11-10T14:30:00.000Z'
  },
  {
    id: 2,
    title: 'Accountant Licensing System',
    titleKm: 'ប្រព័ន្ធអាជ្ញាប័ណ្ណគណនេយ្យករ',
    description: 'Automated verification portal for professional chartered accountant licenses.',
    descriptionKm: 'វិបផតថលផ្ទៀងផ្ទាត់ស្វ័យប្រវត្តិនៃអាជ្ញាប័ណ្ណគណនេយ្យករអាជីព',
    status: 'ACTIVE',
    deadline: '2027-01-10',
    ownerId: 1,
    createdAt: '2026-10-05T09:15:00.000Z',
    updatedAt: '2026-11-08T11:20:00.000Z'
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 101,
    code: '#000b-005',
    title: 'Develop Mobile App BMS',
    titleKm: 'អភិវឌ្ឍកម្មវិធីទូរស័ព្ទ BMS',
    category: 'Mobile Development',
    categoryKm: 'អភិវឌ្ឍន៍ទូរស័ព្ទ',
    description: 'Build native iOS and Android biometric authentication components with Passcode and FaceID support.',
    status: 'IN_REVIEW',
    priority: 'HIGH',
    dueDate: '2026-11-20',
    durationKm: '១ សប្តាហ៍',
    projectId: 1,
    assigneeId: 1,
    assigneeNameKm: 'ពិសិដ្ឋ បញ្ញាវុឌ្ឍ',
    commentsCount: 2,
    createdAt: '2026-10-15T09:00:00.000Z',
    updatedAt: '2026-11-14T10:30:00.000Z'
  },
  {
    id: 102,
    code: '#0001-45',
    title: 'Verify Professional Accountant License',
    titleKm: 'ផ្ទៀងផ្ទាត់អាជ្ញាប័ណ្ណគណនេយ្យករ',
    category: 'Verification',
    categoryKm: 'ការផ្ទៀងផ្ទាត់',
    description: 'Verify digital signatures and bar association credentials for certified accountant registration.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    dueDate: '2026-11-22',
    durationKm: '២ ថ្ងៃ',
    projectId: 2,
    assigneeId: 2,
    assigneeNameKm: 'អាឡិច មឺស៊ើ',
    commentsCount: 3,
    createdAt: '2026-10-16T11:00:00.000Z',
    updatedAt: '2026-11-12T15:00:00.000Z'
  },
  {
    id: 103,
    code: '#0001-43',
    title: 'Check Telegram Notification System',
    titleKm: 'ពិនិត្យប្រព័ន្ធជូនដំណឹង Telegram',
    category: 'Automation',
    categoryKm: 'ស្វ័យប្រវត្តិកម្ម',
    description: 'Inspect webhook delivery latency and retry queue for real-time customer Telegram bot alerts.',
    status: 'TODO',
    priority: 'MEDIUM',
    dueDate: '2026-11-25',
    durationKm: '៤ ថ្ងៃ',
    projectId: 1,
    assigneeId: 3,
    assigneeNameKm: 'សុភា គីម',
    commentsCount: 1,
    createdAt: '2026-10-18T10:00:00.000Z',
    updatedAt: '2026-10-18T10:00:00.000Z'
  },
  {
    id: 104,
    code: '#0003-42',
    title: 'Customer Service Module Phase 2',
    titleKm: 'តួនាទី | ផ្នែកបម្រើអតិថិជន | កំណែ ២',
    category: 'Customer Support',
    categoryKm: 'បម្រើអតិថិជន',
    description: 'Update customer portal ticketing and real-time chat handoff escalation rules.',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    dueDate: '2026-11-28',
    durationKm: '១ សប្តាហ៍',
    projectId: 1,
    assigneeId: 2,
    assigneeNameKm: 'អាឡិច មឺស៊ើ',
    commentsCount: 0,
    createdAt: '2026-10-20T14:00:00.000Z',
    updatedAt: '2026-10-20T14:00:00.000Z'
  },
  {
    id: 105,
    code: '#0003-35',
    title: 'Prepare Accounting Work Package',
    titleKm: 'រៀបចំឈុតការងារគណនេយ្យ',
    category: 'Finance',
    categoryKm: 'ហិរញ្ញវត្ថុ',
    description: 'Consolidate monthly financial ledger templates, tax export formats, and auditing reports.',
    status: 'TODO',
    priority: 'LOW',
    dueDate: '2026-12-01',
    durationKm: '១ សប្តាហ៍',
    projectId: 2,
    assigneeId: 1,
    assigneeNameKm: 'ពិសិដ្ឋ បញ្ញាវុឌ្ឍ',
    commentsCount: 0,
    createdAt: '2026-10-22T08:00:00.000Z',
    updatedAt: '2026-10-22T08:00:00.000Z'
  },
  {
    id: 106,
    code: '#000b-001',
    title: 'Improve Account Registration Form',
    titleKm: 'កែលម្អទម្រង់ចុះឈ្មោះគណនី',
    category: 'UI/UX Design',
    categoryKm: 'ការរចនា UI/UX',
    description: 'Implement multi-step onboarding wizard with instant client-side validation and OTP phone inputs.',
    status: 'DONE',
    priority: 'HIGH',
    dueDate: '2026-11-10',
    durationKm: '៥ ថ្ងៃ',
    projectId: 1,
    assigneeId: 1,
    assigneeNameKm: 'ពិសិដ្ឋ បញ្ញាវុឌ្ឍ',
    commentsCount: 4,
    createdAt: '2026-10-10T08:00:00.000Z',
    updatedAt: '2026-11-09T17:00:00.000Z'
  }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 1,
    content: 'បានពិនិត្យឯកសារគំរូ ឃើញថាស្របតាមគោលការណ៍ត្រួតពិនិត្យ។ (Reviewed sample document; adheres to verification guidelines.)',
    taskId: 101,
    authorId: 3,
    authorNameKm: 'សុភា គីម',
    createdAt: '2026-11-13T10:15:00.000Z',
    updatedAt: '2026-11-13T10:15:00.000Z'
  },
  {
    id: 2,
    content: 'សូមអរគុណ! ឯកសារត្រូវបានអនុម័តរួចរាល់។ (Thank you! The work item has been approved.)',
    taskId: 101,
    authorId: 1,
    authorNameKm: 'ពិសិដ្ឋ បញ្ញាវុឌ្ឍ',
    createdAt: '2026-11-14T10:30:00.000Z',
    updatedAt: '2026-11-14T10:30:00.000Z'
  }
];
