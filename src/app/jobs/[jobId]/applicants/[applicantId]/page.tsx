// Users/jaydenosafo/Phone_Screening_Platform/src/app/jobs/[jobId]/applicants/[applicantId]/page.tsx

import { ApplicantDetailClient } from '@/components/recruiter/ApplicantDetailClient';
import { jobs as seededJobs } from '@/data/jobs';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ jobId: string; applicantId: string }>;
};

export default async function ApplicantDetailPage(props: Props) {
  const { jobId, applicantId } = await props.params;
  const matched = seededJobs.some((job) => job.id === jobId);

  if (!matched) {
    notFound();
  }

  return <ApplicantDetailClient applicantId={applicantId} jobId={jobId} />;
}
