// Users/jaydenosafo/Phone_Screening_Platform/src/components/shared/Modal.tsx

'use client';


import { cn } from '@/lib/cn';
import { useEffect, useId, useRef } from 'react';
import { PrimaryButton } from '@/components/shared/PrimaryButton';

type ModalProps = {
  title: string;
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
  panelClassName?: string;
};

export function Modal({
  title,
  open,
  children,
  onClose,
  footer,
  panelClassName,
}: ModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>('button, [href], input, select, textarea')?.focus();
    }, 0);
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      aria-labelledby={titleId}
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
      role="dialog"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={panelRef}
        className={cn(
          'max-h-[calc(100vh-2rem)] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl outline-none ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800 ring-4',
          panelClassName,
        )}
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-zinc-200 bg-white/95 px-6 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">
              Recruiter workspace
            </p>
            <h2 id={titleId} className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {title}
            </h2>
          </div>
          <PrimaryButton type="button" variant="quiet" aria-label="Close modal" onClick={onClose}>
            Close
          </PrimaryButton>
        </header>
        <div className="space-y-4 px-6 py-6">{children}</div>
        {footer ? (
          <footer className="flex flex-wrap items-center justify-end gap-3 border-t border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/70">
            {footer}
          </footer>
        ) : null}
      </div>
    </div>
  );
}
