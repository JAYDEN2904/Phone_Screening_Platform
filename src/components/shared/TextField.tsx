// Users/jaydenosafo/Phone_Screening_Platform/src/components/shared/TextField.tsx

'use client';


import { cn } from '@/lib/cn';
import type { ReactNode, TextareaHTMLAttributes, InputHTMLAttributes } from 'react';

export type InputFieldProps = {
  label: string;
  id: string;
  error?: string;
  helperText?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ label, id, error, helperText, className, ...props }: InputFieldProps) {
  return (
    <label htmlFor={id} className="block space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
      <span className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        {label}
      </span>
      <input
        id={id}
        {...props}
        className={cn(
          'w-full rounded-xl border px-4 py-2 text-base text-zinc-900 outline-none ring-2 ring-transparent transition focus-visible:ring-indigo-400 dark:bg-zinc-950 dark:text-zinc-50',
          error
            ? 'border-rose-500 focus-visible:ring-rose-400'
            : 'border-zinc-300 dark:border-zinc-800 focus-visible:border-indigo-500',
          className,
        )}
      />
      {helperText ? <span className="text-xs text-zinc-500 dark:text-zinc-400">{helperText}</span> : null}
      {error ? <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">{error}</span> : null}
    </label>
  );
}

export type TextAreaFieldProps = {
  label: string;
  id: string;
  error?: string;
  helperText?: ReactNode;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaField({
  label,
  id,
  error,
  helperText,
  className,
  ...props
}: TextAreaFieldProps) {
  return (
    <label htmlFor={id} className="block space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{label}</span>
      <textarea
        id={id}
        {...props}
        className={cn(
          'min-h-[140px] w-full resize-y rounded-xl border px-4 py-3 text-base leading-relaxed text-zinc-900 outline-none ring-2 ring-transparent transition focus-visible:ring-indigo-400 dark:bg-zinc-950 dark:text-zinc-50',
          error
            ? 'border-rose-500 focus-visible:ring-rose-400'
            : 'border-zinc-300 dark:border-zinc-800 focus-visible:border-indigo-500',
          className,
        )}
      />
      {helperText ? <span className="text-xs text-zinc-500 dark:text-zinc-400">{helperText}</span> : null}
      {error ? <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">{error}</span> : null}
    </label>
  );
}
