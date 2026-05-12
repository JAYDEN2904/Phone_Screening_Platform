// Users/jaydenosafo/Phone_Screening_Platform/src/components/recruiter/ApplicantSubmissionsTable.tsx

'use client';


import type { Submission } from '@/types/submission';
import Link from 'next/link';

type ApplicantSubmissionsTableProps = {
  jobId: string;
  rows: Submission[];
};

export function ApplicantSubmissionsTable({ jobId, rows }: ApplicantSubmissionsTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="border-b border-zinc-100 bg-gradient-to-r from-indigo-50 to-transparent px-6 py-4 dark:border-zinc-800 dark:from-indigo-950/40 dark:to-transparent">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500">Applicants surfaced</p>
        <p className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Shared via submissions store</p>
      </div>
      <table className="min-w-full divide-y divide-zinc-100 dark:divide-zinc-800">
        <thead className="bg-white text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400">
          <tr className="text-left">
            <th className="px-6 py-3 font-semibold">Name</th>
            <th className="hidden px-6 py-3 font-semibold sm:table-cell">Email</th>
            <th className="px-6 py-3 font-semibold">Submitted</th>
            <th className="px-6 py-3 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-50 text-sm text-zinc-700 dark:divide-zinc-900 dark:text-zinc-200">
          {rows.map((submission) => (
            <tr key={submission.id} className="bg-white hover:bg-emerald-50/40 dark:bg-zinc-950 dark:hover:bg-emerald-950/10">
              <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">{submission.candidateName}</td>
              <td className="hidden px-6 py-4 sm:table-cell">{submission.candidateEmail}</td>
              <td className="px-6 py-4 text-xs text-zinc-500 dark:text-zinc-400">{formatDate(submission.submittedAt)}</td>
              <td className="px-6 py-4 text-right">
                <Link
                  className="text-sm font-semibold text-indigo-600 underline decoration-2 underline-offset-4 hover:text-indigo-500 focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-indigo-300 dark:hover:text-indigo-200"
                  href={`/jobs/${jobId}/applicants/${submission.id}`}
                  prefetch={false}
                >
                  View responses
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
