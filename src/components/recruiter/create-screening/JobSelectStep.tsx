// Users/jaydenosafo/Phone_Screening_Platform/src/components/recruiter/create-screening/JobSelectStep.tsx

'use client';


import type { Job } from '@/types/domain';

type JobSelectStepProps = {
  jobs: Job[];
  selectedJobId: string;
  onChangeJobId: (jobId: string) => void;
};

export function JobSelectStep({ jobs, selectedJobId, onChangeJobId }: JobSelectStepProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="create-screening-job" className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        1 · Select role
      </label>
      <select
        id="create-screening-job"
        className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 outline-none ring-2 ring-transparent transition focus-visible:border-indigo-500 focus-visible:ring-indigo-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
        value={selectedJobId}
        onChange={(event) => onChangeJobId(event.target.value)}
      >
        <option value="">Choose a seeded job...</option>
        {jobs.map((job) => (
          <option key={job.id} value={job.id}>
            {job.title}
          </option>
        ))}
      </select>
    </div>
  );
}
