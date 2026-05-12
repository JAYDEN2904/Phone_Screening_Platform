// Users/jaydenosafo/Phone_Screening_Platform/src/lib/recruiterSession.ts

/** Mock recruiter auth — UI-only demo; no server verification. */

export const RECRUITER_SESSION_COOKIE = 'aihrly_recruiter_session';

const ONE_WEEK_SECONDS = 60 * 60 * 24 * 7;

export function persistRecruiterSessionClient() {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${RECRUITER_SESSION_COOKIE}=1; Path=/; Max-Age=${ONE_WEEK_SECONDS}; SameSite=Lax`;
}

export function clearRecruiterSessionClient() {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${RECRUITER_SESSION_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function sanitizeInternalNextPath(next: string | null): `/jobs${string}` | '/jobs' {
  if (next && next.startsWith('/jobs') && !next.includes('..')) {
    return next as `/jobs${string}`;
  }
  return '/jobs';
}
