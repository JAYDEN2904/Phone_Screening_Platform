// Users/jaydenosafo/Phone_Screening_Platform/src/components/recruiter/AnalyzeResponseButton.tsx

'use client';


import { AnalysisPanel } from '@/components/recruiter/AnalysisPanel';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import type { AnalysisResult } from '@/types/analysis';
import { fetchMockAnalysis } from '@/lib/mockAnalysis';
import { useState } from 'react';

type AnalyzeResponseButtonProps = {
  candidateLabel: string;
};

export function AnalyzeResponseButton({ candidateLabel }: AnalyzeResponseButtonProps) {
  const [panel, setPanel] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function invokeAnalysis() {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchMockAnalysis(candidateLabel);
      setPanel(result);
    } catch {
      setError('Synthetic analysis stalled — retry.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <PrimaryButton disabled={isLoading} type="button" onClick={() => void invokeAnalysis()} className="px-12 py-4 text-lg">
        {isLoading ? 'Analyzing…' : 'Analyze response'}
      </PrimaryButton>
      {error ? <p className="text-sm font-semibold text-rose-600 dark:text-rose-300">{error}</p> : null}
      {isLoading ? (
        <div className="rounded-3xl border border-dashed border-indigo-200 bg-white px-10 py-12 dark:border-indigo-800 dark:bg-zinc-950">
          <LoadingSpinner label="Synthesizing mock insights (1–2s)" />
        </div>
      ) : null}
      {panel ? <AnalysisPanel result={panel} /> : null}
    </div>
  );
}
