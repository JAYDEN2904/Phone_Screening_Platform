// Users/jaydenosafo/Phone_Screening_Platform/src/components/recruiter/PublicScreeningLinkCopy.tsx

'use client';


import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { copyTextToClipboard } from '@/lib/clipboard';
import { useIsClient } from '@/hooks/useIsClient';
import { useMemo, useState } from 'react';

type PublicScreeningLinkCopyProps = {
  jobId: string;
};

export function PublicScreeningLinkCopy({ jobId }: PublicScreeningLinkCopyProps) {
  const hydrated = useIsClient();
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  const link = useMemo(() => {
    if (typeof window === 'undefined') {
      return '';
    }
    return `${window.location.origin}/screening/${jobId}`;
  }, [jobId]);

  async function handleCopy() {
    if (!link) {
      setStatus('failed');
      return;
    }
    const copied = await copyTextToClipboard(link);
    setStatus(copied ? 'copied' : 'failed');
    window.setTimeout(() => setStatus('idle'), 2200);
  }

  const label =
    status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed · try highlighting' : 'Copy link';

  return (
    <div className="rounded-3xl border border-dashed border-indigo-200 bg-white/85 px-5 py-4 dark:border-indigo-900 dark:bg-indigo-950/40">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500">Public applicant link</p>
      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
        <span className="flex-1 break-all rounded-xl bg-white px-4 py-3 font-mono text-sm text-emerald-800 ring-1 ring-emerald-100 shadow-inner shadow-emerald-200/70 dark:bg-zinc-950 dark:text-emerald-200 dark:ring-emerald-900">
          {!hydrated ? 'Resolving clipboard-safe origin…' : link || 'Unavailable'}
        </span>
        <PrimaryButton
          variant="secondary"
          type="button"
          aria-label={`Copy applicant screening URL for ${jobId}`}
          disabled={!hydrated || !link}
          className="w-full shrink-0 md:w-auto"
          onClick={() => void handleCopy()}
        >
          {label}
        </PrimaryButton>
      </div>
    </div>
  );
}
