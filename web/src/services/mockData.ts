import type { User, Project, Task, Comment } from '../types';

export const INITIAL_USERS: User[] = [
  { id: 1, email: 'sarah.connor@planflow.io', name: 'Sarah Connor', role: 'MANAGER' },
  { id: 2, email: 'alex.mercer@planflow.io', name: 'Alex Mercer', role: 'MEMBER' },
  { id: 3, email: 'elena.rostova@planflow.io', name: 'Elena Rostova', role: 'MEMBER' },
  { id: 4, email: 'john.doe@planflow.io', name: 'John Doe', role: 'MANAGER' }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Mobile Banking App Redesign',
    description: 'Revamp consumer iOS & Android mobile banking UX with modern biometric authentication and unified dashboard.',
    status: 'ACTIVE',
    deadline: '2026-12-15',
    ownerId: 1,
    createdAt: '2026-10-01T08:00:00.000Z',
    updatedAt: '2026-11-10T14:30:00.000Z'
  },
  {
    id: 2,
    title: 'Cloud Migration & Infrastructure',
    description: 'Migrate on-premise microservices into containerized Kubernetes clusters on AWS with automated CI/CD pipelines.',
    status: 'ACTIVE',
    deadline: '2027-01-10',
    ownerId: 4,
    createdAt: '2026-10-05T09:15:00.000Z',
    updatedAt: '2026-11-08T11:20:00.000Z'
  },
  {
    id: 3,
    title: 'Data Pipeline Modernization',
    description: 'Implement automated ETL pipelines streaming real-time IoT and warehouse telemetry metrics.',
    status: 'PLANNING',
    deadline: '2027-02-28',
    ownerId: 1,
    createdAt: '2026-10-12T10:00:00.000Z',
    updatedAt: '2026-11-02T16:00:00.000Z'
  },
  {
    id: 4,
    title: 'Customer Portal SSO Integration',
    description: 'Integrate SAML 2.0 and OAuth 2.0 PKCE single sign-on across the multi-tenant enterprise portal.',
    status: 'ACTIVE',
    deadline: '2026-11-30',
    ownerId: 4,
    createdAt: '2026-10-18T13:45:00.000Z',
    updatedAt: '2026-11-12T09:00:00.000Z'
  },
  {
    id: 5,
    title: 'PCI-DSS Security Compliance Audit',
    description: 'Quarterly external vulnerability scan, penetration testing remediation, and compliance certification.',
    status: 'COMPLETED',
    deadline: '2026-11-01',
    ownerId: 1,
    createdAt: '2026-09-01T08:00:00.000Z',
    updatedAt: '2026-11-01T17:00:00.000Z'
  },
  {
    id: 6,
    title: 'Internal Developer Portal (Backstage)',
    description: 'Deploy Backstage service catalog to organize API documentation, service health metrics, and onboarding.',
    status: 'PLANNING',
    deadline: '2027-03-15',
    ownerId: 4,
    createdAt: '2026-10-25T11:00:00.000Z',
    updatedAt: '2026-10-25T11:00:00.000Z'
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 101,
    title: 'Implement FaceID & Fingerprint Biometric Prompt',
    description: 'Integrate LocalAuthentication API for iOS and BiometricPrompt for Android with passcode fallback.',
    status: 'IN_REVIEW',
    priority: 'HIGH',
    dueDate: '2026-11-20',
    projectId: 1,
    assigneeId: 2,
    createdAt: '2026-10-15T09:00:00.000Z',
    updatedAt: '2026-11-14T10:30:00.000Z'
  },
  {
    id: 102,
    title: 'Design Dark Mode Navigation Drawer',
    description: 'Create responsive SVG icons, adjust WCAG AA color contrasts, and support system theme changes.',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    dueDate: '2026-11-25',
    projectId: 1,
    assigneeId: 3,
    createdAt: '2026-10-16T11:00:00.000Z',
    updatedAt: '2026-11-12T15:00:00.000Z'
  },
  {
    id: 103,
    title: 'Setup OAuth 2.0 PKCE Handshake',
    description: 'Implement secure authorization code grant with PKCE code verifier and token refresh cycle.',
    status: 'DONE',
    priority: 'HIGH',
    dueDate: '2026-11-10',
    projectId: 1,
    assigneeId: 2,
    createdAt: '2026-10-10T08:00:00.000Z',
    updatedAt: '2026-11-09T17:00:00.000Z'
  },
  {
    id: 104,
    title: 'Push Notification Token Registration API',
    description: 'Build backend endpoint to register Apple APNs and Google FCM device tokens securely.',
    status: 'TODO',
    priority: 'MEDIUM',
    dueDate: '2026-12-05',
    projectId: 1,
    assigneeId: 3,
    createdAt: '2026-10-20T14:00:00.000Z',
    updatedAt: '2026-10-20T14:00:00.000Z'
  },
  {
    id: 201,
    title: 'Configure Distributed Tracing with OpenTelemetry',
    description: 'Instrument NestJS microservices with OpenTelemetry exporter sending traces to Jaeger.',
    status: 'IN_REVIEW',
    priority: 'LOW',
    dueDate: '2026-11-28',
    projectId: 2,
    assigneeId: 2,
    createdAt: '2026-10-22T10:00:00.000Z',
    updatedAt: '2026-11-13T16:00:00.000Z'
  },
  {
    id: 202,
    title: 'Write Terraform Scripts for EKS Cluster Provisioning',
    description: 'Define VPC, subnets, NAT gateways, managed node groups, and IAM roles in reusable modules.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    dueDate: '2026-12-01',
    projectId: 2,
    assigneeId: 3,
    createdAt: '2026-10-24T12:00:00.000Z',
    updatedAt: '2026-11-11T09:30:00.000Z'
  },
  {
    id: 301,
    title: 'Benchmark Apache Kafka vs AWS Kinesis throughput',
    description: 'Execute stress testing simulations measuring ingestion latency under 50,000 events/sec peak loads.',
    status: 'TODO',
    priority: 'MEDIUM',
    dueDate: '2027-01-15',
    projectId: 3,
    assigneeId: 2,
    createdAt: '2026-11-01T09:00:00.000Z',
    updatedAt: '2026-11-01T09:00:00.000Z'
  },
  {
    id: 401,
    title: 'SAML Assertion Consumer Service Handler',
    description: 'Validate XML digital signatures and extract user claims from Okta and Azure AD identity providers.',
    status: 'IN_REVIEW',
    priority: 'HIGH',
    dueDate: '2026-11-24',
    projectId: 4,
    assigneeId: 3,
    createdAt: '2026-10-28T14:00:00.000Z',
    updatedAt: '2026-11-14T11:00:00.000Z'
  }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 1,
    content: 'Tested on physical iOS 17.5 device. Biometric fallback to device PIN works without unexpected crash.',
    taskId: 101,
    authorId: 2,
    createdAt: '2026-11-13T10:15:00.000Z',
    updatedAt: '2026-11-13T10:15:00.000Z'
  },
  {
    id: 2,
    content: 'Review looks great! Security checks passed. Ready for manager sign-off.',
    taskId: 101,
    authorId: 1,
    createdAt: '2026-11-14T10:30:00.000Z',
    updatedAt: '2026-11-14T10:30:00.000Z'
  },
  {
    id: 3,
    content: 'Checked contrast ratio in Dark Mode; text is WCAG AAA compliant at 7.2:1.',
    taskId: 102,
    authorId: 3,
    createdAt: '2026-11-12T15:00:00.000Z',
    updatedAt: '2026-11-12T15:00:00.000Z'
  }
];
