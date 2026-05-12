// Users/jaydenosafo/Phone_Screening_Platform/src/lib/validation.ts

/** Required by product rules for recruiter/candidate flows. */


export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isNonEmptyName(name: string): boolean {
  return name.trim().length > 0;
}

/** Demo recruiter password gate — any 8+ char password qualifies. */


export function isValidRecruiterPassword(password: string): boolean {
  return password.trim().length >= 8;
}
