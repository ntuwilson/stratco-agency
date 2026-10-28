// Analytics IDs are public identifiers, not secrets. Leave a value empty to keep
// that tool switched off; the site loads nothing for it.

// Google Analytics 4 measurement ID, e.g. 'G-XXXXXXXXXX' (Admin → Data streams).
export const GA_MEASUREMENT_ID = '';

// Microsoft Clarity project ID, e.g. 'abcd1234ef' (Settings → Overview).
export const CLARITY_ID = 'z4wmb6wqof';

type GtagParams = Record<string, string | number | boolean | undefined>;

// Send a GA4 event when Google Analytics is loaded; a no-op otherwise.
export function trackEvent(name: string, params: GtagParams = {}) {
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void })
    .gtag;
  if (typeof gtag === 'function') {
    gtag('event', name, params);
  }
}
