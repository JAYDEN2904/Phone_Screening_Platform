// Users/jaydenosafo/Phone_Screening_Platform/src/components/recruiter/create-screening/QuestionListEditor.tsx

'use client';


import type { Question } from '@/types/domain';
import { QuestionEditorRow } from '@/components/recruiter/create-screening/QuestionEditorRow';
import { PrimaryButton } from '@/components/shared/PrimaryButton';

type QuestionListEditorProps = {
  questions: Question[];
  setQuestions: (next: Question[]) => void;
  onAppendCustom: () => void;
};

export function QuestionListEditor({ questions, setQuestions, onAppendCustom }: QuestionListEditorProps) {
  function updateAt(index: number, nextQuestion: Question) {
    const next = questions.slice();
    next[index] = nextQuestion;
    setQuestions(next);
  }

  function removeAt(index: number) {
    setQuestions(questions.filter((_, idx) => idx !== index));
  }

  function move(from: number, to: number) {
    const next = questions.slice();
    const [picked] = next.splice(from, 1);
    if (!picked) {
      return;
    }
    next.splice(to, 0, picked);
    setQuestions(next);
  }

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-3 dark:border-zinc-800">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-indigo-500">Steps 3–4 · Edit arsenal</p>
          <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">Tune prompts before candidates see them.</p>
        </div>
        <PrimaryButton type="button" variant="secondary" onClick={onAppendCustom}>
          Add custom question
        </PrimaryButton>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <QuestionEditorRow
            key={question.id}
            question={question}
            questionNumber={index + 1}
            onRemove={() => removeAt(index)}
            onReplace={(next) => updateAt(index, next)}
            onMoveUp={index === 0 ? undefined : () => move(index, index - 1)}
            onMoveDown={index === questions.length - 1 ? undefined : () => move(index, index + 1)}
          />
        ))}
      </div>
    </div>
  );
}
