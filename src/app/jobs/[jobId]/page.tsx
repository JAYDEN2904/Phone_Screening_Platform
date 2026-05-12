// Users/jaydenosafo/Phone_Screening_Platform/src/app/jobs/[jobId]/page.tsx

import { JobDetailClient } from '@/components/recruiter/JobDetailClient';
import { jobs as seededJobs } from '@/data/jobs';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ jobId: string }>;
};

export default async function JobDetailPage(props: Props) {
  const { jobId } = await props.params;
  const matched = seededJobs.find((job) => job.id === jobId);

  if (!matched) {
    notFound();
  }

  return <JobDetailClient job={matched} />;
}
