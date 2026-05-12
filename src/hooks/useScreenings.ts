// Users/jaydenosafo/Phone_Screening_Platform/src/hooks/useScreenings.ts

'use client';


import type { Screening } from '@/types/domain';
import { appendScreening, readScreenings } from '@/lib/screeningsStore';
import { useCallback, useSyncExternalStore } from 'react';

const EMPTY_SCREENINGS: Screening[] = [];

let screeningsSnapshot: Screening[] = EMPTY_SCREENINGS;

function refreshScreeningsSnapshot() {
  screeningsSnapshot = readScreenings();
}

function subscribeToScreenings(listener: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  refreshScreeningsSnapshot();

  const handler = () => {
    refreshScreeningsSnapshot();
    listener();
  };

  window.addEventListener('storage', handler);
  window.addEventListener('aihrly-storage-sync', handler);

  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener('aihrly-storage-sync', handler);
  };
}

function getScreeningsSnapshot() {
  if (typeof window === 'undefined') {
    return EMPTY_SCREENINGS;
  }
  return screeningsSnapshot;
}

/** Same reference forever — required by React 19 strict `useSyncExternalStore`. */
function getScreeningsServerSnapshot() {
  return EMPTY_SCREENINGS;
}

export function useScreenings() {
  const screenings = useSyncExternalStore(subscribeToScreenings, getScreeningsSnapshot, getScreeningsServerSnapshot);

  const persistNewScreening = useCallback((screening: Screening) => {
    appendScreening(screening);
  }, []);

  const screeningCountFor = useCallback(
    (jobId: string) => screenings.filter((entry) => entry.jobId === jobId).length,
    [screenings],
  );

  const latestForJob = useCallback(
    (jobId: string): Screening | undefined => {
      const scoped = screenings.filter((entry) => entry.jobId === jobId);
      if (scoped.length === 0) {
        return undefined;
      }

      return [...scoped].sort(
        (first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
      )[0];
    },
    [screenings],
  );

  return { screenings, persistNewScreening, screeningCountFor, latestForJob };
}
