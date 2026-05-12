// Users/jaydenosafo/Phone_Screening_Platform/src/components/shared/LoadingSpinner.tsx

'use client';


import { cn } from '@/lib/cn';

export function LoadingSpinner({ label = 'Loading', className }: { label?: string; className?: string }) {
  return (
    <div className={cn('flex flex-col items-center gap-3 text-center', className)} role="status" aria-live="polite">
      <span className="h-11 w-11 animate-spin rounded-full border-[3px] border-zinc-300 border-t-indigo-500 dark:border-zinc-700 dark:border-t-indigo-400" />
      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">{label}</span>
    </div>
  );
}
