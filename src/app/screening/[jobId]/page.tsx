// Users/jaydenosafo/Phone_Screening_Platform/src/app/screening/[jobId]/page.tsx

import { ScreeningFlowClient } from '@/components/candidate/ScreeningFlowClient';
import { jobs as seededJobs } from '@/data/jobs';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ jobId: string }>;
};

export default async function CandidateScreeningPage(props: Props) {
  const { jobId } = await props.params;
  const matched = seededJobs.find((job) => job.id === jobId);

  if (!matched) {
    notFound();
  }

  return <ScreeningFlowClient job={matched} />;
}
