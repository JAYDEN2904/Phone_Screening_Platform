// Users/jaydenosafo/Phone_Screening_Platform/src/components/recruiter/create-screening/CreateScreeningWizard.tsx

'use client';


import type { Question, Screening } from '@/types/domain';
import { GenerateQuestionsStep } from '@/components/recruiter/create-screening/GenerateQuestionsStep';
import { JobSelectStep } from '@/components/recruiter/create-screening/JobSelectStep';
import { QuestionListEditor } from '@/components/recruiter/create-screening/QuestionListEditor';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { jobs as seededJobs } from '@/data/jobs';
import { generateQuestionsForJob } from '@/data/questions';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

const GENERATOR_DELAY_MS = 600;

type CreateScreeningWizardProps = {
  onPersistScreening: (screening: Screening) => void;
};

function randomId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function CreateScreeningWizard({ onPersistScreening }: CreateScreeningWizardProps) {
  const router = useRouter();
  const [selectedJobId, setSelectedJobId] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const jobOptions = seededJobs;

  const handleGenerate = useCallback(async () => {
    if (!selectedJobId) {
      setError('Select a job before generating prompts.');
      return;
    }
    setIsGenerating(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, GENERATOR_DELAY_MS));
    try {
      setQuestions(generateQuestionsForJob(selectedJobId));
    } finally {
      setIsGenerating(false);
    }
  }, [selectedJobId]);

  const handleAppendCustom = useCallback(() => {
    const nextQuestion: Question = {
      id: randomId('custom'),
      text: 'Untitled recruiter question · edit me',
      responseType: 'text',
      isCustom: true,
    };
    setQuestions((prev) => [...prev, nextQuestion]);
    setError(null);
  }, []);

  const sanitizedQuestions = useMemo(
    () => questions.filter((question) => question.text.trim().length > 0),
    [questions],
  );

  const handleSaveScreening = useCallback(() => {
    if (!selectedJobId) {
      setError('Choose a seeded job.');
      return;
    }
    if (sanitizedQuestions.length === 0) {
      setError('Generate or add at least one question.');
      return;
    }
    const screening: Screening = {
      id: randomId('screening'),
      jobId: selectedJobId,
      createdAt: new Date().toISOString(),
      questions: sanitizedQuestions.map((question) => ({ ...question, text: question.text.trim() })),
    };

    onPersistScreening(screening);
    router.push(`/jobs/${selectedJobId}`);
  }, [onPersistScreening, router, sanitizedQuestions, selectedJobId]);

  return (
    <div className="space-y-8">
      <JobSelectStep jobs={jobOptions} selectedJobId={selectedJobId} onChangeJobId={setSelectedJobId} />
      <GenerateQuestionsStep
        disabled={!selectedJobId}
        isLoading={isGenerating}
        onGenerate={handleGenerate}
      />
      <QuestionListEditor questions={questions} setQuestions={setQuestions} onAppendCustom={handleAppendCustom} />
      {questions.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-8 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400">
          Press <strong>Generate Questions</strong> to scaffold 5–8 prompts. Every row exposes remove/edit/re-order
          affordances intentionally.
        </div>
      ) : (
        <div className="space-y-2 rounded-3xl border border-green-300/60 bg-emerald-50 px-6 py-4 text-sm font-medium text-green-950 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
          Step 5 — Save ties this questionnaire to `{selectedJobId || '–––'}` and syncs recruiter + candidate halves via
          `aihrly_screenings`.
        </div>
      )}
      {error ? <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">{error}</p> : null}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-6 dark:border-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {sanitizedQuestions.length} ready-to-go question{sanitizedQuestions.length === 1 ? '' : 's'}
        </p>
        <PrimaryButton type="button" onClick={handleSaveScreening} disabled={isGenerating}>
          Save screening
        </PrimaryButton>
      </div>
    </div>
  );
}
