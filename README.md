# Phone Screening Platform

UI-only prototype for Remotown's take-home assignment: recruiters craft phone-screening questionnaires, candidates complete them sequentially, and both personas communicate via shared `localStorage` keys (`aihrly_screenings`, `aihrly_submissions`).

## Prerequisites

- Node.js 18.18 or newer

## Commands

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000/) — recruiters land on `/jobs` automatically.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run lint` | ESLint (Next preset) |
| `npm run build` | Production build |
| `npm run start` | Serve the compiled output |

## Data + persistence assumptions

1. Per the take-home brief: **no authentication** — recruiter pages are treated as an already-authenticated internal tool (no login screen or middleware).
2. Recruitment roles are seeded in `src/data/jobs.ts`; question templates originate from `src/data/questions.ts`.
3. Each recruiter save appends another `Screening` record so cards can tally historical creations, but recruiter + candidate UIs hydrate the newest snapshot for a job.
4. Because there is **no backend**, both personas must use the **same browser profile** to observe submissions immediately.

## What shipped vs. backlog

Delivered core flows (`/jobs`, modal screening builder, `/jobs/[jobId]`, `/jobs/[jobId]/applicants/[applicantId]`, `/screening/[jobId]`). Bonus drag-to-reorder audio capture, persisted theme toggles, and automated testing were postponed per timeboxing—architecture should make those additions localized.
