// Users/jaydenosafo/Phone_Screening_Platform/src/data/questions.ts

import type { Question } from '@/types/domain';

const baseId = (): string =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `q-${Date.now()}-${Math.random().toString(36).slice(2)}`;

/** Template drafts that get IDs and flags applied when generated. */
const engineeringTemplates = [
  'Walk end-to-end through a recent frontend feature from idea to deployed code.',
  'How do you approach breaking a fuzzy product ask into actionable UI milestones?',
  'Describe your TypeScript tooling choices and trade-offs across a layered app.',
  'Tell us about accessibility or performance tuning you prioritized on your last project.',
  'How would you collaborate with design when a spec misses edge-case states?',
  'When would you isolate state in hooks vs contextual providers in React?',
];

const designTemplates = [
  'How do you document components so engineers can reuse them faithfully?',
  'Describe translating quantitative signals into prioritized UX bets.',
  'Walk through a rework where usability testing changed your direction materially.',
];

const internshipTemplates = [
  'Tell us how you dissect an unfamiliar codebase before changing behavior safely.',
  'Describe a debugging session where you isolated a flaky UI bug.',
];

function decorate(texts: string[], countMin: number, countMax: number): Omit<Question, 'id'>[] {
  const bounded = Math.min(countMax, Math.max(countMin, texts.length));
  return texts.slice(0, bounded).map((text) => ({
    text,
    responseType: 'text' as const,
    isCustom: false,
  }));
}

/** Returns 5–8 questions scoped to seeded job identifiers. Falls back per role cluster. */
export function generateQuestionsForJob(jobId: string): Question[] {
  let drafts: Omit<Question, 'id'>[];

  switch (jobId) {
    case 'job-001':
      drafts = decorate(engineeringTemplates, 6, 8);
      break;
    case 'job-002':
      drafts = decorate([...designTemplates, ...engineeringTemplates.slice(0, 4)], 5, 7);
      break;
    case 'job-003':
      drafts = decorate([...internshipTemplates, ...engineeringTemplates.slice(0, 4)], 5, 6);
      break;
    default:
      drafts = decorate(engineeringTemplates, 5, 7);
      break;
  }

  return drafts.map((draft) => ({ ...draft, id: baseId() }));
}
