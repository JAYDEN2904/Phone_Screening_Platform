// Users/jaydenosafo/Phone_Screening_Platform/src/components/recruiter/AnalysisPanel.tsx

'use client';


import type { AnalysisResult } from '@/types/analysis';

type AnalysisPanelProps = {
  result: AnalysisResult;
};

export function AnalysisPanel({ result }: AnalysisPanelProps) {
  const chipColor = result.recommendation === 'advance' ? 'border-emerald-500 text-emerald-700' :
    result.recommendation === 'reject' ? 'border-rose-500 text-rose-700' :
    'border-amber-500 text-amber-700';

  return (
    <section aria-live="assertive" className="space-y-6 rounded-[2rem] border border-emerald-200 bg-white/95 p-8 shadow-xl shadow-emerald-200/50 dark:border-emerald-900 dark:bg-emerald-950/40 dark:shadow-black/70">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-100 pb-6 dark:border-emerald-900/60">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">Mock recruiter insight</p>
          <p className="mt-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50">AI-style synthesis (static)</p>
        </div>
        <span
          className={`rounded-full px-5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em] border ${chipColor}`}
        >
          {result.recommendation}
        </span>
      </header>
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">Summary</h3>
        <p className="text-base leading-relaxed text-zinc-800 dark:text-zinc-100">{result.summary}</p>
      </div>
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">Sentiment</h3>
        <p className="text-base text-zinc-700 dark:text-zinc-300">{result.sentiment}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Bulleted bucket="Strength signals" bullets={result.strengths} tone="positive" />
        <Bulleted bucket="Watch outs" bullets={result.concerns} tone="caution" />
      </div>
    </section>
  );
}

type BulletedProps = {
  bucket: string;
  bullets: string[];
  tone: 'positive' | 'caution';
};

function Bulleted({ bucket, bullets, tone }: BulletedProps) {
  const palette =
    tone === 'positive'
      ? 'border-emerald-100 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950'
      : 'border-rose-100 bg-rose-50 dark:border-rose-900 dark:bg-rose-950';

  return (
    <div className={`rounded-2xl border p-6 ${palette}`}>
      <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-600 dark:text-zinc-300">{bucket}</h4>
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-800 dark:text-zinc-100">
        {bullets.map((point) => (
          <li key={point}>• {point}</li>
        ))}
      </ul>
    </div>
  );
}
