// Users/jaydenosafo/Phone_Screening_Platform/src/components/candidate/ScreeningFlowClient.tsx

'use client';


import { ProgressBar } from '@/components/candidate/ProgressBar';
import { QuestionStepForm } from '@/components/candidate/QuestionStepForm';
import { ThankYouStep } from '@/components/candidate/ThankYouStep';
import { WelcomeStepForm } from '@/components/candidate/WelcomeStepForm';
import { AppHeader } from '@/components/shared/AppHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { useIsClient } from '@/hooks/useIsClient';
import { useScreenings } from '@/hooks/useScreenings';
import { useSubmissions } from '@/hooks/useSubmissions';
import type { Job } from '@/types/domain';
import type { Answer, Submission } from '@/types/submission';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type Stage = 'welcome' | 'questions' | 'thanks';

export function ScreeningFlowClient({ job }: { job: Job }) {
  const hydrated = useIsClient();
  const { screenings } = useScreenings();
  const { persistApplicantSubmission } = useSubmissions();

  const activeScreening = useMemo(() => {
    const forJob = screenings.filter((entry) => entry.jobId === job.id);
    if (forJob.length === 0) {
      return undefined;
    }
    return [...forJob].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0];
  }, [job.id, screenings]);

  const [stage, setStage] = useState<Stage>('welcome');
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  function finalizeSubmission(bundle: Answer[]) {
    const submission: Submission = {
      id: randomSubmissionId(),
      jobId: job.id,
      candidateName,
      candidateEmail,
      answers: bundle,
      submittedAt: new Date().toISOString(),
    };

    persistApplicantSubmission(submission);
    setStage('thanks');
  }

  function submitAnswerAtIndex(value: string) {
    if (!activeScreening) {
      return;
    }

    const currentQuestionDraft = activeScreening.questions[questionIndex];
    if (!currentQuestionDraft) {
      return;
    }

    const appended: Answer = {
      questionId: currentQuestionDraft.id,
      responseType: currentQuestionDraft.responseType,
      value,
    };

    const nextAnswers = [...answers, appended];

    if (questionIndex === activeScreening.questions.length - 1) {
      finalizeSubmission(nextAnswers);
      setAnswers(nextAnswers);
      return;
    }

    setAnswers(nextAnswers);
    setQuestionIndex((prev) => prev + 1);
  }

  function handleQuestionBack() {
    if (questionIndex === 0) {
      setStage('welcome');
      setAnswers([]);
      setQuestionIndex(0);
      setCandidateEmail('');
      setCandidateName('');
      return;
    }

    setAnswers((prev) => prev.slice(0, -1));
    setQuestionIndex((prev) => Math.max(prev - 1, 0));
  }

  const stageQuestion =
    activeScreening && stage === 'questions' ? activeScreening.questions[questionIndex] : undefined;

  if (!hydrated) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center bg-emerald-50 px-6 py-24 dark:bg-zinc-950">
        <LoadingSpinner label="Preparing recruiter-configured questionnaires…" />
      </div>
    );
  }

  if (!activeScreening || activeScreening.questions.length === 0) {
    return (
      <div className="min-h-full bg-white dark:bg-zinc-950">
        <AppHeader variant="candidate" />
        <div className="mx-auto max-w-3xl px-6 py-16">
          <EmptyState
            title="Screening blueprint missing"
            description="Before candidates can iterate through prompts the recruiter console must stash a blueprint under `aihrly_screenings` for this job."
            actionSlot={
              <Link className="text-sm font-semibold text-emerald-700 underline" href="/jobs">
                Ask a teammate to blueprint from Jobs
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-emerald-50 via-white to-slate-100 dark:from-zinc-950 dark:via-emerald-950/30 dark:to-zinc-950">
      <AppHeader variant="candidate" />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-10">
        {stage === 'welcome' ? (
          <div className="space-y-8">
            <WelcomeStepForm
              jobTitle={job.title}
              onContinue={(payload) => {
                setCandidateName(payload.name);
                setCandidateEmail(payload.email);
                setStage('questions');
                setAnswers([]);
                setQuestionIndex(0);
              }}
            />
            <ProgressBar label="Momentum after kickoff" value={0} total={activeScreening.questions.length} />
          </div>
        ) : null}

        {stage === 'questions' ? (
          <div className="space-y-10">
            <ProgressBar label="Momentum through prompts" value={answers.length} total={activeScreening.questions.length} />
            {stageQuestion ? (
              <QuestionStepForm
                key={`${stageQuestion.id}-${questionIndex}-${answers.length}`}
                question={stageQuestion}
                progressLabel={`Question ${questionIndex + 1} of ${activeScreening.questions.length}`}
                indexHuman={questionIndex + 1}
                totalQuestions={activeScreening.questions.length}
                showBack={true}
                onBack={handleQuestionBack}
                onSubmit={submitAnswerAtIndex}
              />
            ) : (
              <p className="rounded-3xl border border-rose-300 bg-rose-50 px-6 py-4 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-100">
                Question index drifted beyond the recruiter blueprint length. Reload and regenerate from Jobs.
              </p>
            )}
          </div>
        ) : null}

        {stage === 'thanks' ? <ThankYouStep candidateName={candidateName || 'candidate'} /> : null}
      </main>
    </div>
  );
}

function randomSubmissionId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `submission-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
