// Users/jaydenosafo/Phone_Screening_Platform/src/app/jobs/[jobId]/loading.tsx

export default function JobDetailLoadingFallback() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-gradient-to-b from-white via-slate-50 to-indigo-50 px-8 py-32">
      <div className="h-14 w-14 animate-spin rounded-full border-[3px] border-zinc-300 border-t-indigo-500" />
      <p className="mt-10 text-lg font-semibold text-zinc-700">Hydrating recruiting workspace…</p>
    </div>
  );
}
