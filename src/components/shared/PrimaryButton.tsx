// Users/jaydenosafo/Phone_Screening_Platform/src/components/shared/PrimaryButton.tsx

'use client';


import { cn } from '@/lib/cn';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'quiet' | 'danger';

export type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
};

export function PrimaryButton({
  children,
  className,
  variant = 'primary',
  disabled,
  type = 'button',
  ...rest
}: PrimaryButtonProps) {
  const base =
    'inline-flex cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40';

  const palette: Record<Variant, string> = {
    primary:
      'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-500 shadow-sm shadow-indigo-500/40',
    secondary:
      'bg-white text-indigo-700 ring-1 ring-zinc-200 hover:bg-indigo-50 focus-visible:outline-indigo-500 dark:bg-zinc-950 dark:text-indigo-200 dark:ring-zinc-800 dark:hover:bg-zinc-900',
    quiet:
      'bg-transparent text-zinc-600 hover:bg-zinc-100 focus-visible:outline-zinc-400 dark:text-zinc-300 dark:hover:bg-zinc-900',
    danger:
      'bg-rose-600 text-white hover:bg-rose-500 focus-visible:outline-rose-500 shadow-sm shadow-rose-500/30',
  };

  return (
    <button type={type} disabled={disabled} className={cn(base, palette[variant], className)} {...rest}>
      {children}
    </button>
  );
}
