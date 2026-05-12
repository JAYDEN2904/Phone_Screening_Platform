// Users/jaydenosafo/Phone_Screening_Platform/src/data/jobs.ts

import type { Job } from '@/types/domain';

export const jobs: Job[] = [
  {
    id: 'job-001',
    title: 'Frontend-Focused Full Stack Developer (NSS)',
    location: 'Remote, Ghana',
    employmentType: 'NSS',
    description:
      'Build delightful interfaces in Next.js, collaborate across the stack with TypeScript-first patterns, and help ship structured hiring flows recruiters rely on.',
  },
  {
    id: 'job-002',
    title: 'Product Designer — Growth',
    location: 'Berlin (hybrid)',
    employmentType: 'Full-time',
    description:
      'Own onboarding and conversion UX for our recruiting products. Balance systems thinking with fast iteration loops and strong collaboration with engineers.',
  },
  {
    id: 'job-003',
    title: 'Engineering Intern — Platform',
    location: 'Remote, EU-compatible',
    employmentType: 'Internship',
    description:
      'Work on foundational tooling around authless demos, mocks, and local-first persistence patterns — ideal if you enjoy clarity and observable state.',
  },
];
