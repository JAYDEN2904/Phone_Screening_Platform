// Users/jaydenosafo/Phone_Screening_Platform/src/lib/mockAnalysis.ts

import type { AnalysisResult } from '@/types/analysis';

const ANALYSIS_DELAY_MS = 1700;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/** Simulated latency then a deterministic-but-rich mock AnalysisResult. */
export async function fetchMockAnalysis(candidateName: string): Promise<AnalysisResult> {
  await sleep(ANALYSIS_DELAY_MS);

  const label = candidateName.trim() || 'This candidate';

  return {
    summary: `${label} communicated structured narratives with credible examples. Signals align moderately well with autonomous execution in hybrid teams.`,
    sentiment: 'Cautiously positive — pragmatic tone with thoughtful trade-off discussions.',
    strengths: [
      'Clear sequencing when describing complex UI workstreams.',
      'Balances speed with readability in component boundaries.',
      'Open to feedback loops anchored in recruiter-visible outcomes.',
    ],
    concerns: [
      'Some answers stayed high-level — probe depth on instrumentation and rollout risks.',
      'Latency spikes under ambiguity could surface in live customer calls.',
    ],
    recommendation: 'hold',
  };
}
