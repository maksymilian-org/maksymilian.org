// Sends a GA4 event if gtag is loaded (it is not in dev or when the
// measurement id is unset), and never throws.
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>
): void {
  try {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    w.gtag?.("event", name, params);
  } catch {
    /* analytics must never break the UI */
  }
}
