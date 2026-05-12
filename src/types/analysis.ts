// Users/jaydenosafo/Phone_Screening_Platform/src/types/analysis.ts

export type Recommendation = 'advance' | 'reject' | 'hold';

export interface AnalysisResult {
  summary: string;
  sentiment: string;
  strengths: string[];
  concerns: string[];
  recommendation: Recommendation;
}
