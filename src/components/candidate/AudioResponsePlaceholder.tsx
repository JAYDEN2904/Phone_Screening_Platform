// Users/jaydenosafo/Phone_Screening_Platform/src/components/candidate/AudioResponsePlaceholder.tsx

'use client';


export function AudioResponsePlaceholder() {
  return (
    <div className="space-y-4 rounded-2xl border border-dashed border-amber-300 bg-amber-50 px-5 py-5 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
      <div className="flex flex-wrap items-center gap-4">
        <button
          className="inline-flex items-center rounded-full bg-amber-900/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white opacity-70"
          disabled
          type="button"
        >
          Record (demo-disabled)
        </button>
        <p className="text-sm leading-relaxed">For this demo, please use a text response below.</p>
      </div>
      <div className="h-px w-full bg-amber-200 dark:bg-amber-800" aria-hidden />
    </div>
  );
}
