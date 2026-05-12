// Users/jaydenosafo/Phone_Screening_Platform/src/components/recruiter/create-screening/GenerateQuestionsStep.tsx

'use client';


import { PrimaryButton } from '@/components/shared/PrimaryButton';

type GenerateQuestionsStepProps = {
  disabled: boolean;
  isLoading: boolean;
  onGenerate: () => Promise<void>;
};

export function GenerateQuestionsStep({ disabled, isLoading, onGenerate }: GenerateQuestionsStepProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-500 p-[1px] shadow-lg shadow-indigo-500/35">
      <div className="rounded-[calc(theme(borderRadius.3xl)-1px)] bg-white px-6 py-6 dark:bg-zinc-950">
        <p className="text-xs uppercase tracking-[0.45em] text-indigo-500">Step 2</p>
        <p className="mt-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Fabricate recruiter-ready prompts</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          We simulate inference locally—no outbound calls—to keep this challenge focused on UX.
        </p>
        <div className="mt-8 flex justify-center">
          <PrimaryButton
            className="w-full px-12 py-3 text-lg"
            variant="primary"
            disabled={disabled || isLoading}
            onClick={() => void onGenerate()}
            type="button"
          >
            {isLoading ? 'Sketching prompts…' : 'Generate Questions'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
