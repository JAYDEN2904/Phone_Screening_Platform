// Users/jaydenosafo/Phone_Screening_Platform/src/components/recruiter/RecruiterLoginScreen.tsx

'use client';


import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { TextField } from '@/components/shared/TextField';
import { RECRUITER_SESSION_COOKIE, persistRecruiterSessionClient, sanitizeInternalNextPath } from '@/lib/recruiterSession';
import { isValidEmail, isValidRecruiterPassword } from '@/lib/validation';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

export function RecruiterLoginScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const nextTarget = useMemo(() => sanitizeInternalNextPath(searchParams.get('next')), [searchParams]);

  function submit() {
    const nextErrors: typeof errors = {};
    if (!isValidEmail(email)) {
      nextErrors.email = 'Use a plausible work email.';
    }
    if (!isValidRecruiterPassword(password)) {
      nextErrors.password = 'Password needs at least 8 characters.';
    }
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      persistRecruiterSessionClient();
      router.push(nextTarget);
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-full flex-col bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-20 lg:flex-row lg:items-center lg:gap-16">
        <section className="max-w-xl space-y-8">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-indigo-300">Internal hiring OS</p>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Phone Screening Platform</h1>
            <p className="text-lg leading-relaxed text-indigo-100/85">
              Recruiters blueprint structured phone screenings; candidates iterate through shareable journeys. Credentials are
              purely cosmetic for this frontend-only challenge—anything valid unlocks `/jobs`.
            </p>
          </div>
          <ul className="space-y-3 text-sm text-indigo-100/80">
            <li>Secure your console before syncing local screening blueprints.</li>
            <li>Candidate-facing links stay reachable without logging in:</li>
            <li className="pl-4">
              <Link className="font-semibold text-emerald-300 underline decoration-dotted" href="/screening/job-001">
                /screening/[jobId] preview
              </Link>
            </li>
          </ul>
        </section>

        <section className="mt-14 w-full max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-[0px_55px_150px_-60px_rgba(99,102,241,0.9)] backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Sign in · recruiting workspace</h2>
          <p className="mt-3 text-sm text-indigo-100/80">
            Returning you to <span className="font-semibold">{nextTarget}</span> once validated.
          </p>
          <form
            className="mt-8 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            <TextField
              id="login-email"
              label="Work email"
              autoComplete="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={errors.email}
              className="bg-white text-slate-950"
            />
            <TextField
              id="login-password"
              label="Passphrase"
              autoComplete="current-password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              helperText="No backend validation — demo only."
              error={errors.password}
              className="bg-white text-slate-950"
            />
            <PrimaryButton className="w-full px-10 py-3 text-base" type="submit">
              Enter recruiting console
            </PrimaryButton>
          </form>
        </section>
      </main>
      <footer className="mx-auto px-6 py-12 text-xs text-white/55">
        Recruiter session cookie{' '}
        <span className="font-mono text-white/85">{RECRUITER_SESSION_COOKIE}</span>
        {' '}
        — use <span className="font-semibold text-white/85">Sign out</span> in the recruiting header to revoke it anytime.
      </footer>
    </div>
  );
}
