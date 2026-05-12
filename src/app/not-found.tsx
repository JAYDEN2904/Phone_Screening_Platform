// Users/jaydenosafo/Phone_Screening_Platform/src/app/not-found.tsx

export default function GlobalNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-white px-6 text-center dark:bg-zinc-950">
      <p className="text-xs uppercase tracking-[0.4em] text-indigo-500">Lost signal</p>
      <p className="text-4xl font-semibold text-zinc-900 dark:text-white">Route not seeded</p>
      <p className="max-w-xl text-base text-zinc-600 dark:text-zinc-400">
        Triple-check slug casing—`/jobs/[jobId]` only recognizes IDs defined in `/src/data/jobs.ts`.
      </p>
    </div>
  );
}
