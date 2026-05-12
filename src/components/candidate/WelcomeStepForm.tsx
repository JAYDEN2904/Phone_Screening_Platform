// Users/jaydenosafo/Phone_Screening_Platform/src/components/candidate/WelcomeStepForm.tsx

'use client';


import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { TextField } from '@/components/shared/TextField';
import { isNonEmptyName, isValidEmail } from '@/lib/validation';
import { useState } from 'react';

type WelcomeStepFormProps = {
  jobTitle: string;
  onContinue: (payload: { name: string; email: string }) => void;
};

export function WelcomeStepForm({ jobTitle, onContinue }: WelcomeStepFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  function handleContinue() {
    const nextErrors: typeof errors = {};
    if (!isNonEmptyName(name)) {
      nextErrors.name = 'Name is required.';
    }
    if (!isValidEmail(email)) {
      nextErrors.email = 'Enter a plausible email.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      onContinue({ name: name.trim(), email: email.trim().toLowerCase() });
    }
  }

  return (
    <div className="space-y-6 rounded-[2rem] border border-white/60 bg-white/95 p-8 shadow-xl shadow-emerald-200 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:shadow-black/70">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-500">Welcome aboard</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-zinc-900 dark:text-white">{jobTitle}</h1>
        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
          We cap this audition at thoughtfully sequenced prompts so every candidate gets equitable air-time. Share grounded
          stories—no live voice capture required yet.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <TextField
          id="candidate-name"
          label="Full name"
          autoComplete="name"
          placeholder="Ada Lovelace"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={errors.name}
        />
        <TextField
          id="candidate-email"
          label="Email"
          autoComplete="email"
          placeholder="candidate@company.com"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
        />
      </div>
      <div className="flex justify-end border-t border-zinc-100 pt-6 dark:border-zinc-900">
        <PrimaryButton type="button" className="px-10 py-3 text-lg" onClick={handleContinue}>
          Begin pacing
        </PrimaryButton>
      </div>
    </div>
  );
}
