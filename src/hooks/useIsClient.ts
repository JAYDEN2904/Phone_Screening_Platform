// Users/jaydenosafo/Phone_Screening_Platform/src/hooks/useIsClient.ts

'use client';


import { useSyncExternalStore } from 'react';

function subscribeToNothing(): () => void {
  return () => {};
}

export function useIsClient(): boolean {
  return useSyncExternalStore(subscribeToNothing, () => true, () => false);
}
