// Users/jaydenosafo/Phone_Screening_Platform/src/components/candidate/ThankYouStep.tsx

'use client';


export function ThankYouStep({ candidateName }: { candidateName: string }) {
  return (
    <div className="space-y-4 rounded-[2rem] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-[1px] shadow-2xl shadow-emerald-500/70">
      <div className="rounded-[1.925rem] bg-white px-10 py-12 text-center dark:bg-zinc-950">
        <p className="text-xs uppercase tracking-[0.5em] text-emerald-500">Mission saved</p>
        <p className="mt-6 text-4xl font-semibold text-zinc-900 dark:text-white">{candidateName}</p>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Your responses are etched into this browser-only ledger so recruiters using the same workspace can unblock next
          funnel steps instantly.
        </p>
      </div>
    </div>
  );
}
