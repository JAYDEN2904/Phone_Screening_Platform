// Users/jaydenosafo/Phone_Screening_Platform/src/lib/screeningsStore.ts

import type { Screening } from '@/types/domain';
import { STORAGE_KEYS } from '@/lib/localStorage/constants';
import { readJsonFromLocalStorage, writeJsonToLocalStorage } from '@/lib/localStorage/readWrite';

function sanitizeList(value: unknown): Screening[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter(Boolean) as Screening[];
}

export function readScreenings(): Screening[] {
  return sanitizeList(
    readJsonFromLocalStorage<unknown>(STORAGE_KEYS.screenings, []),
  );
}

export function writeScreenings(screenings: Screening[]): void {
  writeJsonToLocalStorage(STORAGE_KEYS.screenings, screenings);
}

/** Appends each save so recruiter history counts can increment; viewers use latest snapshot. */


export function appendScreening(screening: Screening): Screening[] {
  const merged = [...readScreenings(), screening];
  writeScreenings(merged);
  return merged;
}

export function countScreeningsForJob(jobId: string): number {
  return readScreenings().filter((screening) => screening.jobId === jobId).length;
}

/** Latest screening first (by ISO date). Empty if none. */
export function getLatestScreeningForJob(jobId: string): Screening | undefined {
  const forJob = readScreenings().filter((screening) => screening.jobId === jobId);
  if (forJob.length === 0) {
    return undefined;
  }
  return [...forJob].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )[0];
}
