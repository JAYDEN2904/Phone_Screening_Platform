// Users/jaydenosafo/Phone_Screening_Platform/src/components/shared/JobCard.tsx

'use client';


import type { Job } from '@/types/domain';
import { cn } from '@/lib/cn';
import Link from 'next/link';

type JobCardProps = {
  job: Job;
  screeningCount: number;
};

export function JobCard({ job, screeningCount }: JobCardProps) {
  const href = `/jobs/${job.id}`;

  return (
    <Link
      prefetch
      href={href}
      className={cn(
        'group rounded-3xl border border-zinc-200 bg-white p-6 shadow-xs transition hover:-translate-y-[2px] hover:border-indigo-300 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-zinc-800 dark:bg-zinc-950',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500">Open role</p>
          <p className="mt-3 text-xl font-semibold leading-snug text-zinc-900 dark:text-white">{job.title}</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-100 dark:bg-emerald-950 dark:text-emerald-200 dark:ring-emerald-900">
          {screeningCount} screening{screeningCount === 1 ? '' : 's'}
        </span>
      </div>
      <dl className="mt-5 grid gap-3 text-sm text-zinc-600 dark:text-zinc-400 md:grid-cols-3">
        <div>
          <dt className="text-xs uppercase text-zinc-500">Location</dt>
          <dd className="font-medium text-zinc-900 dark:text-zinc-100">{job.location}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-zinc-500">Employment</dt>
          <dd className="font-medium text-zinc-900 dark:text-zinc-100">{job.employmentType}</dd>
        </div>
      </dl>
      <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 group-hover:gap-4 dark:text-indigo-300">
        Manage job dashboard
      </span>
    </Link>
  );
}
