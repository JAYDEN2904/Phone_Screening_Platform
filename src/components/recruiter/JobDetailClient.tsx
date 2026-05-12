// Users/jaydenosafo/Phone_Screening_Platform/src/components/recruiter/JobDetailClient.tsx

'use client';


import { ApplicantSubmissionsTable } from '@/components/recruiter/ApplicantSubmissionsTable';
import { CreateScreeningModal } from '@/components/recruiter/CreateScreeningModal';
import { PublicScreeningLinkCopy } from '@/components/recruiter/PublicScreeningLinkCopy';
import { AppHeader } from '@/components/shared/AppHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import type { Job } from '@/types/domain';
import { useScreenings } from '@/hooks/useScreenings';
import { useSubmissions } from '@/hooks/useSubmissions';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type JobDetailClientProps = {
  job: Job;
};

export function JobDetailClient({ job }: JobDetailClientProps) {
  const [creationOpen, setCreationOpen] = useState(false);
  const { latestForJob } = useScreenings();
  const { submissionsFor } = useSubmissions();

  const activeScreening = useMemo(() => latestForJob(job.id), [job.id, latestForJob]);

  const submissionRows = useMemo(() => submissionsFor(job.id), [job.id, submissionsFor]);

  return (
    <div className="min-h-full bg-gradient-to-b from-white via-slate-50 to-indigo-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <AppHeader variant="recruiter" />
      <main className="mx-auto max-w-5xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/jobs" className="text-sm font-semibold text-indigo-700 underline underline-offset-4 dark:text-indigo-300">
            ← Back to jobs
          </Link>
          {!activeScreening ? (
            <PrimaryButton type="button" onClick={() => setCreationOpen(true)}>
              Draft screening blueprint
            </PrimaryButton>
          ) : (
            <span className="rounded-full bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800 ring ring-emerald-100 dark:bg-emerald-950 dark:text-emerald-200 dark:ring-emerald-900">
              Active screening synced
            </span>
          )}
        </div>

        <article className="rounded-[2rem] border border-white/60 bg-white/90 p-8 shadow-xl shadow-indigo-200/60 ring ring-zinc-100 backdrop-blur dark:border-white/10 dark:bg-zinc-950/95 dark:shadow-black/70 dark:ring-zinc-800">
          <p className="text-xs uppercase tracking-[0.45em] text-indigo-500">{job.location}</p>
          <h1 className="mt-3 text-4xl font-semibold text-zinc-900 dark:text-white">{job.title}</h1>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">Employment</p>
          <p className="mt-2 text-xl font-semibold text-zinc-800 dark:text-zinc-50">{job.employmentType}</p>
          <p className="mt-8 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{job.description}</p>
        </article>

        {activeScreening ? (
          <PublicScreeningLinkCopy jobId={job.id} />
        ) : (
          <EmptyState
            title="No screening exists yet for this hiring loop"
            description="Spin up interviewer-ready prompts so candidates hitting /screening can progress through guided steps."
            actionSlot={
              <PrimaryButton type="button" onClick={() => setCreationOpen(true)}>
                Create phone screening
              </PrimaryButton>
            }
          />
        )}

        <section aria-live="polite" className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Applicant pipeline</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Rows hydrate from{' '}
            <code className="font-mono text-xs text-indigo-500">aihrly_submissions</code> keyed by `{job.id}`.
          </p>
          {submissionRows.length === 0 ? (
            <EmptyState
              title="No applicants yet"
              description="Applicants appear here instantly after submitting the gratitude step on their shareable screening link."
            />
          ) : (
            <ApplicantSubmissionsTable jobId={job.id} rows={submissionRows} />
          )}
        </section>
      </main>
      <CreateScreeningModal open={creationOpen} onClose={() => setCreationOpen(false)} />
    </div>
  );
}
