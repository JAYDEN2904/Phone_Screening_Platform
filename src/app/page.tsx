// Users/jaydenosafo/Phone_Screening_Platform/src/app/page.tsx

import { RecruiterLoginScreen } from '@/components/recruiter/RecruiterLoginScreen';
import { RECRUITER_SESSION_COOKIE } from '@/lib/recruiterSession';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function HomePage() {
  const jar = await cookies();
  const session = jar.get(RECRUITER_SESSION_COOKIE)?.value;

  if (session === '1') {
    redirect('/jobs');
  }

  return (
    <Suspense
      fallback={
        <div className="flex min-h-full flex-1 flex-col items-center justify-center gap-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white">
          <span className="h-14 w-14 animate-spin rounded-full border-4 border-white/30 border-t-indigo-400" aria-hidden />
          <p className="text-base font-semibold text-indigo-100">Materializing recruiter login…</p>
        </div>
      }
    >
      <RecruiterLoginScreen />
    </Suspense>
  );
}
