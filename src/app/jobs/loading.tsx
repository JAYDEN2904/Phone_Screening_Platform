// Users/jaydenosafo/Phone_Screening_Platform/src/app/jobs/loading.tsx

export default function JobsLoadingFallback() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-gradient-to-br from-[#eef2ff] via-white to-emerald-50 px-6 py-28">
      <div className="h-14 w-14 animate-spin rounded-full border-[3px] border-zinc-300 border-t-indigo-600" />
      <p className="mt-8 text-base font-semibold text-zinc-600">Loading recruiter console…</p>
    </div>
  );
}
