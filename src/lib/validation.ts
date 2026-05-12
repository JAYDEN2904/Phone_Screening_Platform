// Users/jaydenosafo/Phone_Screening_Platform/src/lib/validation.ts

/** Required by product rules for recruiter/candidate flows. */


export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isNonEmptyName(name: string): boolean {
  return name.trim().length > 0;
}
