// Users/jaydenosafo/Phone_Screening_Platform/src/app/jobs/[jobId]/applicants/[applicantId]/loading.tsx

export default function ApplicantLoadingFallback() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-white px-6 py-32 dark:bg-zinc-950">
      <div className="h-14 w-14 animate-spin rounded-full border-[3px] border-zinc-300 border-t-rose-500" />
      <p className="mt-10 text-base font-semibold text-zinc-600">Analyzing respondent payload…</p>
    </div>
  );
}
