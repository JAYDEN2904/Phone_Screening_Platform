# Phone Screening Platform

UI-only Next.js prototype for Remotown’s **Phone Screening Platform** take-home: recruiters compose phone-screen question sets backed by seeded jobs; candidates complete **`/screening/[jobId]`** step-by-step. Both halves share **`localStorage`** (`aihrly_screenings`, `aihrly_submissions`) instead of a server.

---

## How to run the project locally

**Prerequisites:** Node.js **18.18** or newer (npm ships with Node).

Install dependencies once:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)**. The root route redirects to **`/jobs`** (brief assumes recruiter is already “logged in” — no authentication layer).

Optional commands:

| Command | Purpose |
| --- | --- |
| **`npm run build`** | Production build (type-check + optimized output) |
| **`npm run start`** | Serve the built app locally (run **`build`** first) |
| **`npm run lint`** | ESLint with the Next.js preset |

---

## Approach (short)

I treated this as **product-shaped UI**: clear routing for recruiter vs candidate, **thin server `page.tsx` shells** that validate seeded `jobId`s, and **fat client islands** for anything touching **`localStorage`**. Persisted arrays are accessed through tiny **store modules** (`screeningsStore`, `submissionsStore`) plus **safe JSON helpers** so bad or missing keys never blow up the UI. React **`useSyncExternalStore`** wraps storage with **stable empty snapshots** (important on React 19) and listens for both the native **`storage`** event and a custom **`aihrly-storage-sync`** event so updates propagate in the **same tab** after writes.

---

## What I built

- **Jobs (`/jobs`)** — seeded job cards with screening counts, modal **Create Phone Screening** flow (job select → generate 5–8 questions with ~600 ms deliberate delay → edit / remove / reorder via arrows → save to `localStorage` → navigate to job detail).
- **Job detail (`/jobs/[jobId]`)** — job header, copyable public screening URL, screening-exists messaging, applicant list from **`aihrly_submissions`**, empty states.
- **Applicant responses (`/jobs/[jobId]/applicants/[applicantId]`)** — full Q/A list (audio rows as non-functional mocks), mocked **Analyze** with ~1.5 s spinner and static **`AnalysisResult`** (+ explicit **sentiment** line to match PDF wording vs the interface).
- **Candidate flow (`/screening/[jobId]`)** — welcome with validated name/email (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), one question at a time with progress, audio placeholder + **required textarea** answers, persisted **`Submission`** on completion, thank-you screen.
- **Operational polish** — `loading.tsx` on route segments, responsive Tailwind layout, reusable shared inputs/buttons/modal, **`CODEBASE_PRESENTATION_GUIDE.md`** for navigating the codebase in review.

---

## What I didn't get to (and why)

These were **bonus or out-of-scope** items from the PDF; I stopped once the core must-haves and quality bar ran end-to-end within a reasonable slice of time:

- **Drag-and-drop reorder** in create-screening (↑/↓ reorder only).
- **Click-to-edit** question text everywhere (explicit edit/save controls instead).
- **Dark-mode toggle** with persisted preference.
- **Framer Motion** transitions on candidate questions.
- **Stats badge** flavor text beyond the existing screening count on cards.
- **Jest + RTL** unit test for a non-trivial component.
- **Real `MediaRecorder` audio** path (brief allows text-only; audio remains a UI placeholder).

None of these block demonstrating the required recruiter ↔ candidate **`localStorage`** contract.

---

## Trade-offs

| Decision | Why |
| --- | --- |
| **`localStorage` only** | Matches the assignment; no backend to deploy. Trade-off: **same browser profile** for demoing recruiter seeing candidate submissions; no multi-device sync or privacy guarantees. |
| **Append screenings per save, “latest wins” for live questionnaires** | Job cards can show **how many** screenings were saved; candidate + reviewer UIs hydrate the **newest `createdAt`** snapshot for that `jobId` so edits don’t silently fork active flows. |
| **`useSyncExternalStore` + cached snapshots** | Avoids infinite re-render issues when `JSON.parse` would otherwise return fresh array references every read; duplicates a little module state for correctness under React 19. |
| **No authentication** | Per brief: recruiter views are assumed authenticated; adding login would be extra scope and misaligned with grading criteria unless requested. |
| **Modal wizard on `/jobs` vs dedicated route** | Avoids **`/jobs/[jobId]`** dynamic collisions and keeps navigation obvious; wizard state stays local to the dashboard. |

---

## Data + persistence (quick reference)

1. **Seeded jobs & question templates** — `src/data/jobs.ts`, `src/data/questions.ts`.
2. **`aihrly_screenings`** — array of saved **`Screening`** objects (questions + metadata).
3. **`aihrly_submissions`** — array of completed **`Submission`** objects from the candidate flow.

For more depth (data flow, file map, demo script), see **`CODEBASE_PRESENTATION_GUIDE.md`**.
