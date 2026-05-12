// Users/jaydenosafo/Phone_Screening_Platform/src/lib/localStorage/readWrite.ts

/** Safe client-only localStorage getter with JSON parsing. */


export function readJsonFromLocalStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback;
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null || raw === undefined || raw === '') {
      return fallback;
    }
    const parsed = JSON.parse(raw) as unknown;
    return parsed === null || parsed === undefined ? fallback : (parsed as T);
  } catch {
    return fallback;
  }
}

export function writeJsonToLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('aihrly-storage-sync', { detail: { key } }));
  } catch {
    // quota or privacy mode — fail silently per UI-only constraint
  }
}
