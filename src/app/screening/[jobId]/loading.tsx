// Users/jaydenosafo/Phone_Screening_Platform/src/app/screening/[jobId]/loading.tsx

export default function ScreeningLoadingFallback() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-emerald-50 px-8 py-32 dark:bg-zinc-950">
      <div className="h-14 w-14 animate-spin rounded-full border-[3px] border-emerald-200 border-t-emerald-600" />
      <p className="mt-10 text-lg font-semibold text-emerald-900 dark:text-emerald-100">
        Preparing recruiter-authored prompts…
      </p>
    </div>
  );
}
