// Users/jaydenosafo/Phone_Screening_Platform/src/components/shared/EmptyState.tsx

'use client';


type EmptyStateProps = {
  title: string;
  description: string;
  actionSlot?: React.ReactNode;
};

export function EmptyState({ title, description, actionSlot }: EmptyStateProps) {
  return (
    <section className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-zinc-300 bg-white/70 px-6 py-14 text-center text-zinc-600 shadow-inner dark:border-zinc-700 dark:bg-zinc-950/60 dark:text-zinc-300">
      <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</p>
      <p className="max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
      {actionSlot ? <div className="flex flex-wrap items-center justify-center gap-3">{actionSlot}</div> : null}
    </section>
  );
}
