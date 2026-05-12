// Users/jaydenosafo/Phone_Screening_Platform/src/types/submission.ts

import type { ResponseType } from './domain';

export interface Answer {
  questionId: string;
  responseType: ResponseType;
  value: string;
}

export interface Submission {
  id: string;
  jobId: string;
  candidateName: string;
  candidateEmail: string;
  answers: Answer[];
  submittedAt: string;
}
