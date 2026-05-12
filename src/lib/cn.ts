// Users/jaydenosafo/Phone_Screening_Platform/src/lib/cn.ts

export function cn(...classes: Array<string | false | undefined | null>): string {
  return classes.filter(Boolean).join(' ');
}
