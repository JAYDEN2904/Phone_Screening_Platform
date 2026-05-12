// Users/jaydenosafo/Phone_Screening_Platform/src/components/recruiter/create-screening/QuestionEditorRow.tsx

'use client';


import type { Question, ResponseType } from '@/types/domain';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { useState } from 'react';

type QuestionEditorRowProps = {
  question: Question;
  questionNumber: number;
  onRemove: () => void;
  onReplace: (next: Question) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
};

export function QuestionEditorRow({
  question,
  questionNumber,
  onRemove,
  onReplace,
  onMoveUp,
  onMoveDown,
}: QuestionEditorRowProps) {
  const [isEditingText, setIsEditingText] = useState(false);
  const [draftText, setDraftText] = useState(question.text);

  function handleSaveText() {
    onReplace({
      ...question,
      text: draftText.trim() || question.text,
    });
    setIsEditingText(false);
  }

  function handleResponseType(next: ResponseType) {
    onReplace({ ...question, responseType: next });
  }

  const displayBody = (
    <>
      {!isEditingText ? (
        <p className="text-base leading-relaxed text-zinc-900 dark:text-zinc-100">{question.text}</p>
      ) : (
        <textarea
          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base text-zinc-900 outline-none ring-2 ring-transparent transition focus-visible:ring-indigo-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          value={draftText}
          onChange={(event) => setDraftText(event.target.value)}
        />
      )}
    </>
  );

  return (
    <article className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-indigo-50/40 px-6 py-5 shadow-sm shadow-zinc-200/70 dark:border-zinc-800 dark:from-zinc-950 dark:to-zinc-900/40 dark:shadow-none">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-dashed border-zinc-200 pb-5 dark:border-zinc-700">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-indigo-500">Question · {questionNumber}</p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{question.isCustom ? 'Custom' : 'Generated'}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {onMoveUp ? (
            <PrimaryButton variant="secondary" type="button" aria-label={`Move question ${questionNumber} up`} onClick={onMoveUp}>
              ↑
            </PrimaryButton>
          ) : null}
          {onMoveDown ? (
            <PrimaryButton variant="secondary" type="button" aria-label={`Move question ${questionNumber} down`} onClick={onMoveDown}>
              ↓
            </PrimaryButton>
          ) : null}
          {!isEditingText ? (
            <PrimaryButton variant="secondary" type="button" onClick={() => setIsEditingText(true)}>
              Edit prompt
            </PrimaryButton>
          ) : (
            <PrimaryButton type="button" variant="secondary" onClick={() => handleSaveText()}>
              Save wording
            </PrimaryButton>
          )}
          <PrimaryButton variant="danger" type="button" onClick={onRemove}>
            Remove
          </PrimaryButton>
        </div>
      </div>
      <div className="grid gap-4 pt-6 md:grid-cols-[2fr,1fr]">
        <div className="space-y-4">{displayBody}</div>
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400">
            Response type
          </label>
          <select
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-3 text-base text-zinc-900 outline-none ring-2 ring-transparent transition focus-visible:ring-indigo-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            value={question.responseType}
            onChange={(event) => handleResponseType(event.target.value as ResponseType)}
          >
            <option value="text">Text</option>
            <option value="audio">Audio (placeholder)</option>
          </select>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Drag-free reorder ↑/↓ satisfies the recruiter brief while remaining lightweight without DnD.
          </p>
        </div>
      </div>
    </article>
  );
}
