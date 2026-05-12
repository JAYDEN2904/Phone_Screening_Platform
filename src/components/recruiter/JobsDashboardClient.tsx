// Users/jaydenosafo/Phone_Screening_Platform/src/components/recruiter/JobsDashboardClient.tsx

'use client';


import { CreateScreeningModal } from '@/components/recruiter/CreateScreeningModal';
import { AppHeader } from '@/components/shared/AppHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { JobCard } from '@/components/shared/JobCard';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { jobs as seededJobs } from '@/data/jobs';
import { useScreenings } from '@/hooks/useScreenings';
import { useMemo, useState } from 'react';

export function JobsDashboardClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const { screenings } = useScreenings();

  const memoizedCards = useMemo(
    () =>
      seededJobs.map((job) => ({
        job,
        screenings: screenings.filter((screening) => screening.jobId === job.id).length,
      })),
    [screenings],
  );

  return (
    <div className="min-h-full bg-gradient-to-br from-[#eef2ff] via-white to-emerald-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <AppHeader variant="recruiter" />
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-6 rounded-[2rem] bg-white px-8 py-8 shadow-xl shadow-indigo-200/70 ring-1 ring-zinc-100 dark:bg-zinc-950 dark:shadow-black/70 dark:ring-zinc-800">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-500">Recruiters workspace</p>
            <p className="text-4xl font-semibold text-zinc-900 dark:text-white">Operationalize humane phone screenings</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Seeded `{seededJobs.length}` roles anchor the demo. Persisted questionnaires live locally under{' '}
              <code className="font-mono text-xs text-emerald-600 dark:text-emerald-300">aihrly_screenings</code>.
            </p>
          </div>
          <PrimaryButton className="h-14 px-10 text-lg" type="button" onClick={() => setModalOpen(true)}>
            Create phone screening
          </PrimaryButton>
        </div>

        {memoizedCards.length === 0 ? (
          <EmptyState
            title="No seeded jobs surfaced"
            description="The brief mandates three seeded roles—reload if this shows up unexpectedly."
          />
        ) : (
          <section className="grid gap-6 md:grid-cols-2">
            {memoizedCards.map(({ job, screenings }) => (
              <JobCard key={job.id} job={job} screeningCount={screenings} />
            ))}
          </section>
        )}
      </main>
      <CreateScreeningModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
