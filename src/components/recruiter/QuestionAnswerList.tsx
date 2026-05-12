// Users/jaydenosafo/Phone_Screening_Platform/src/components/recruiter/QuestionAnswerList.tsx

'use client';


import type { Question } from '@/types/domain';
import type { Answer } from '@/types/submission';

type QuestionAnswerListProps = {
  questions: Question[];
  answers: Answer[];
};

export function QuestionAnswerList({ questions, answers }: QuestionAnswerListProps) {
  const indexedAnswers = Object.fromEntries(answers.map((answer) => [answer.questionId, answer]));

  return (
    <ol className="space-y-8">
      {questions.map((question, index) => {
        const match = indexedAnswers[question.id];
        return (
          <li
            key={question.id}
            className="rounded-3xl border border-zinc-200 bg-white/90 px-6 py-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/80"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-indigo-500">
              Prompt {index + 1}/{questions.length}
            </p>
            <p className="mt-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50">{question.text}</p>
            <dl className="mt-6 space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
              <dt className="uppercase tracking-wide">Channel</dt>
              <dd className="text-base font-medium text-zinc-800 dark:text-zinc-200">{question.responseType}</dd>
              <dt className="uppercase tracking-wide">Captured answer</dt>
              <dd className="text-base leading-relaxed text-zinc-900 dark:text-zinc-100">
                {!match ? 'No answer recorded.' : renderAnswer(question.responseType, match)}
              </dd>
            </dl>
          </li>
        );
      })}
    </ol>
  );
}

function renderAnswer(expected: Question['responseType'], answer: Answer) {
  if (expected === 'audio') {
    return (
      <div className="space-y-4 rounded-2xl border border-dashed border-purple-400/60 bg-purple-50/80 px-4 py-6 text-purple-900 dark:border-purple-500/40 dark:bg-purple-950/40 dark:text-purple-50">
        <div className="flex flex-wrap items-center gap-3">
          <div className="h-14 w-full max-w-[220px] rounded-full bg-purple-900/10 ring-4 ring-purple-500/60">
            <div className="h-full animate-pulse rounded-full bg-purple-700/70" aria-hidden />
          </div>
          <div className="flex flex-1 items-center rounded-2xl border border-purple-200 bg-white px-4 py-3 text-xs uppercase tracking-[0.3em] text-purple-500 dark:border-purple-800 dark:bg-zinc-900 dark:text-purple-300">
            Disabled playback scaffold
          </div>
        </div>
        <p className="font-mono text-xs text-purple-800 dark:text-purple-200">
          {answer.value || 'Recorded placeholder unavailable'}
        </p>
      </div>
    );
  }

  return <p className="whitespace-pre-wrap">{answer.value || '––'}</p>;
}
