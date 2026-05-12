// Users/jaydenosafo/Phone_Screening_Platform/src/lib/submissionsStore.ts

import type { Submission } from '@/types/submission';
import { STORAGE_KEYS } from '@/lib/localStorage/constants';
import { readJsonFromLocalStorage, writeJsonToLocalStorage } from '@/lib/localStorage/readWrite';

function sanitizeList(value: unknown): Submission[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter(Boolean) as Submission[];
}

export function readSubmissions(): Submission[] {
  return sanitizeList(
    readJsonFromLocalStorage<unknown>(STORAGE_KEYS.submissions, []),
  );
}

export function writeSubmissions(submissions: Submission[]): void {
  writeJsonToLocalStorage(STORAGE_KEYS.submissions, submissions);
}

export function appendSubmission(submission: Submission): Submission[] {
  const next = [...readSubmissions(), submission];
  writeSubmissions(next);
  return next;
}

export function getSubmissionsForJob(jobId: string): Submission[] {
  return readSubmissions()
    .filter((submission) => submission.jobId === jobId)
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}

export function findSubmission(applicantId: string): Submission | undefined {
  return readSubmissions().find((submission) => submission.id === applicantId);
}
