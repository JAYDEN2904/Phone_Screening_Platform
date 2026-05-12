// Users/jaydenosafo/Phone_Screening_Platform/src/components/recruiter/ApplicantDetailClient.tsx

'use client';


import { AnalyzeResponseButton } from '@/components/recruiter/AnalyzeResponseButton';
import { QuestionAnswerList } from '@/components/recruiter/QuestionAnswerList';
import { AppHeader } from '@/components/shared/AppHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { useIsClient } from '@/hooks/useIsClient';
import { useScreenings } from '@/hooks/useScreenings';
import { useSubmissions } from '@/hooks/useSubmissions';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

type ApplicantDetailClientProps = {
  jobId: string;
  applicantId: string;
};

export function ApplicantDetailClient({ jobId, applicantId }: ApplicantDetailClientProps) {
  const hydrated = useIsClient();
  const { submissions } = useSubmissions();
  const { latestForJob } = useScreenings();

  const submission = useMemo(
    () => submissions.find((entry) => entry.id === applicantId),
    [applicantId, submissions],
  );

  const screeningSnapshot = useMemo(() => latestForJob(jobId), [jobId, latestForJob]);

  if (!hydrated) {
    return (
      <LoadingShell jobId={jobId}>
        <LoadingSpinner label="Synchronizing local applicant cache…" />
      </LoadingShell>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-full bg-white dark:bg-zinc-950">
        <AppHeader variant="recruiter" />
        <div className="mx-auto max-w-3xl px-6 py-16">
          <EmptyState
            title="Submission not found"
            description="This ID is either mistyped or was never saved to aihrly_submissions in this browser profile."
            actionSlot={
              <Link className="text-sm font-semibold text-indigo-600 underline" href={`/jobs/${jobId}`}>
                Return to job detail
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  if (submission.jobId !== jobId) {
    return (
      <div className="min-h-full bg-white dark:bg-zinc-950">
        <AppHeader variant="recruiter" />
        <div className="mx-auto max-w-3xl px-6 py-16">
          <EmptyState
            title="Job mismatch"
            description="This applicant record belongs to a different job route than the one you opened."
            actionSlot={
              <Link className="text-sm font-semibold text-indigo-600 underline" href={`/jobs/${submission.jobId}`}>
                Open correct job
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-b from-white via-rose-50/40 to-indigo-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
      <AppHeader variant="recruiter" />
      <main className="mx-auto max-w-5xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 pb-6 dark:border-zinc-800">
          <Link href={`/jobs/${jobId}`} className="text-sm font-semibold text-indigo-700 underline dark:text-indigo-300">
            ← Back to job detail
          </Link>
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">Applicant deep dive</p>
        </div>

        <header className="space-y-2 rounded-[2rem] bg-white px-8 py-8 shadow-lg shadow-orange-500/25 ring ring-orange-500/60 dark:bg-zinc-950">
          <p className="text-sm font-semibold text-orange-700 dark:text-orange-300">{submission.candidateEmail}</p>
          <p className="text-5xl font-semibold text-zinc-900 dark:text-white">{submission.candidateName}</p>
          <p className="text-xs uppercase tracking-[0.42em] text-zinc-500">Submitted · {submission.submittedAt}</p>
        </header>

        {screeningSnapshot ? (
          <>
            <QuestionAnswerList questions={screeningSnapshot.questions} answers={submission.answers} />
            <AnalyzeResponseButton candidateLabel={submission.candidateName} />
          </>
        ) : (
          <p className="rounded-3xl border border-amber-200 bg-amber-50 px-6 py-4 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
            This submission predates configured screening questionnaires. Persist a screening blueprint to regenerate question text.
          </p>
        )}
      </main>
    </div>
  );
}

function LoadingShell({ jobId, children }: { jobId: string; children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col gap-10 bg-white dark:bg-zinc-950">
      <AppHeader variant="recruiter" />
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center gap-6 px-6 text-center">
        {children}
        <Link className="text-sm font-semibold text-indigo-600 underline" href={`/jobs/${jobId}`}>
          Navigate back safely
        </Link>
      </div>
    </div>
  );
}
