// Users/jaydenosafo/Phone_Screening_Platform/src/components/shared/AppHeader.tsx

'use client';


import Link from 'next/link';
import { cn } from '@/lib/cn';

type AppHeaderProps = {
  variant?: 'recruiter' | 'candidate';
};

export function AppHeader({ variant = 'recruiter' }: AppHeaderProps) {
  const palette =
    variant === 'candidate'
      ? 'border-emerald-100 bg-emerald-50/80 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100'
      : 'border-zinc-100 bg-white/90 text-zinc-900 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90 dark:text-white';

  return (
    <header className={cn('border-b sticky top-0 z-40', palette)}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-indigo-500">Remotown</p>
          <p className="text-lg font-semibold">Phone Screening Platform</p>
        </div>
        {variant === 'recruiter' ? (
          <nav className="flex flex-wrap items-center gap-5 text-sm font-semibold text-indigo-700 dark:text-indigo-300">
            <Link className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded" href="/jobs">
              Jobs
            </Link>
          </nav>
        ) : (
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
            Hiring flow · candidate experience strip
          </p>
        )}
      </div>
    </header>
  );
}
