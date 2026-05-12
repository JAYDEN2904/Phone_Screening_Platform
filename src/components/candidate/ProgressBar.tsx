// Users/jaydenosafo/Phone_Screening_Platform/src/components/candidate/ProgressBar.tsx

'use client';


import { cn } from '@/lib/cn';

type ProgressBarProps = {
  label: string;
  value: number;
  total: number;
};

export function ProgressBar({ label, value, total }: ProgressBarProps) {
  const safeTotal = Math.max(total, 1);
  const filled = Math.min(Math.max(value, 0), safeTotal);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-emerald-700 dark:text-emerald-300">
        <span>{label}</span>
        <span>
          {filled}/{safeTotal}
        </span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: safeTotal }).map((_, index) => (
          <span
            key={index}
            className={cn(
              'h-2 flex-1 rounded-full transition-colors',
              index < filled ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-emerald-100 dark:bg-emerald-950',
            )}
          />
        ))}
      </div>
    </div>
  );
}
