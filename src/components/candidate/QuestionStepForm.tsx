// Users/jaydenosafo/Phone_Screening_Platform/src/components/candidate/QuestionStepForm.tsx

'use client';


import { AudioResponsePlaceholder } from '@/components/candidate/AudioResponsePlaceholder';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { TextAreaField } from '@/components/shared/TextField';
import type { Question } from '@/types/domain';
import { useMemo, useState } from 'react';

type QuestionStepFormProps = {
  question: Question;
  progressLabel: string;
  indexHuman: number;
  totalQuestions: number;
  onSubmit: (value: string) => void;
  onBack?: () => void;
  showBack?: boolean;
};

export function QuestionStepForm({
  question,
  progressLabel,
  indexHuman,
  totalQuestions,
  onSubmit,
  onBack,
  showBack,
}: QuestionStepFormProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const contextualHelper = useMemo(() => {
    if (question.responseType === 'audio') {
      return 'Audio capture is illustrative only — capture your rationale in plaintext below.';
    }
    return undefined;
  }, [question.responseType]);

  function handleAdvance() {
    if (value.trim().length === 0) {
      setError('Responses must include text.');
      return;
    }
    setError(null);
    onSubmit(value.trim());
  }

  return (
    <div className="space-y-6 rounded-[2rem] border border-zinc-200 bg-white px-8 py-8 shadow-2xl ring-1 ring-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-zinc-800">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-zinc-100 pb-4 dark:border-zinc-800">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">{progressLabel}</p>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Prompt {indexHuman} of {totalQuestions}
        </p>
      </div>
      <p className="text-3xl font-semibold leading-snug text-zinc-900 dark:text-zinc-50">{question.text}</p>
      {question.responseType === 'audio' ? <AudioResponsePlaceholder /> : null}
      <TextAreaField
        id={`answer-${question.id}`}
        label="Your written response"
        required
        value={value}
        onChange={(event) => setValue(event.target.value)}
        helperText={contextualHelper}
        error={error ?? undefined}
      />
      <div className="flex flex-wrap gap-4 border-t border-zinc-50 pt-6 dark:border-zinc-900">
        {showBack && onBack ? (
          <PrimaryButton type="button" variant="secondary" className="px-8 py-3" onClick={onBack}>
            Back
          </PrimaryButton>
        ) : (
          <span className="text-xs italic text-zinc-400 dark:text-zinc-500">Opening question — revise later via Back.</span>
        )}
        <PrimaryButton type="button" className="ml-auto px-12 py-3 text-lg" onClick={handleAdvance}>
          Submit & continue
        </PrimaryButton>
      </div>
    </div>
  );
}
