// Users/jaydenosafo/Phone_Screening_Platform/src/hooks/useSubmissions.ts

'use client';


import type { Submission } from '@/types/submission';
import { appendSubmission, readSubmissions } from '@/lib/submissionsStore';
import { useCallback, useSyncExternalStore } from 'react';

const EMPTY_SUBMISSIONS: Submission[] = [];

let submissionsSnapshot: Submission[] = EMPTY_SUBMISSIONS;

function refreshSubmissionsSnapshot() {
  submissionsSnapshot = readSubmissions();
}

function subscribeToSubmissions(listener: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  refreshSubmissionsSnapshot();

  const handler = () => {
    refreshSubmissionsSnapshot();
    listener();
  };

  window.addEventListener('storage', handler);
  window.addEventListener('aihrly-storage-sync', handler);

  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener('aihrly-storage-sync', handler);
  };
}

function getSubmissionsSnapshot() {
  if (typeof window === 'undefined') {
    return EMPTY_SUBMISSIONS;
  }

  return submissionsSnapshot;
}

function getSubmissionsServerSnapshot() {
  return EMPTY_SUBMISSIONS;
}

export function useSubmissions() {
  const submissions = useSyncExternalStore(
    subscribeToSubmissions,
    getSubmissionsSnapshot,
    getSubmissionsServerSnapshot,
  );

  const persistApplicantSubmission = useCallback((submission: Submission) => {
    appendSubmission(submission);
  }, []);

  const submissionsFor = useCallback(
    (jobId: string) =>
      submissions
        .filter((submission) => submission.jobId === jobId)
        .sort((first, second) => new Date(second.submittedAt).getTime() - new Date(first.submittedAt).getTime()),
    [submissions],
  );

  const byId = useCallback(
    (applicantId: string) => submissions.find((submission) => submission.id === applicantId),
    [submissions],
  );

  return { submissions, persistApplicantSubmission, submissionsFor, byId };
}
