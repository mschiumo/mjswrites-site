/**
 * First-party usage tracking for mjswrites.com.
 *
 * Pageviews and clicks are batched and posted to ConfluenceTrading's analytics
 * ingest, which stores this site's traffic in its own key space and shows it
 * on the owner's Analytics tab under "MJSWrites" — kept entirely separate
 * from the app's own numbers. Nothing identifying is sent: a random per-browser
 * id, the page path, the external referrer's host, and click labels.
 *
 * Owner recognition: the blog has no login, so the owner opens
 *   https://mjswrites.com/?me=<ANALYTICS_OWNER_KEY>
 * once per browser. The key is stored locally and sent with every batch; the
 * server routes matching traffic to its "owner" buckets, which the dashboard
 * hides by default.
 *
 * Tracking is strictly fire-and-forget. Nothing here may ever throw into the
 * page, and nothing runs on localhost unless `mjs-track-dev` is set.
 */

const ENDPOINT = 'https://confluencetrading.app/api/analytics/track';
const SITE = 'mjswrites';
const ANON_ID_KEY = 'mjs-anon-id';
const OWNER_KEY_KEY = 'mjs-owner-key';
const DEV_OPT_IN_KEY = 'mjs-track-dev';
const FLUSH_DEBOUNCE_MS = 4000;
const FLUSH_AT_QUEUE_SIZE = 20;
const MAX_LABEL = 60;

type Event =
  | { type: 'pageview'; page: string; referrer: string }
  | { type: 'click'; page: string; label: string };

function storage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getAnonId(): string {
  const store = storage();
  const existing = store?.getItem(ANON_ID_KEY);
  if (existing) return existing;
  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  store?.setItem(ANON_ID_KEY, id);
  return id;
}

/** Store the owner key from ?me=… (then scrub it from the address bar). */
function captureOwnerKey(): void {
  const url = new URL(location.href);
  const key = url.searchParams.get('me');
  if (!key) return;
  storage()?.setItem(OWNER_KEY_KEY, key);
  url.searchParams.delete('me');
  history.replaceState(history.state, '', url.pathname + url.search + url.hash);
}

/** External referrer only — same-site navigation says nothing about reach. */
function externalReferrer(): string {
  const ref = document.referrer;
  if (!ref) return '';
  try {
    return new URL(ref).host === location.host ? '' : ref;
  } catch {
    return '';
  }
}

/**
 * Best human-readable label for a clicked control; outbound links name their
 * host. A post card is one big link whose text runs date / category / title /
 * excerpt together, so when the link wraps a heading the heading alone (the
 * post title) is the label.
 */
function labelFor(el: HTMLElement): string | null {
  const explicit = el.getAttribute('data-track') || el.getAttribute('aria-label') || el.title;
  const heading = el.querySelector('h1, h2, h3, h4');
  const text = (heading ?? el).textContent ?? '';
  let label = explicit ? explicit.trim() : text.replace(/\s+/g, ' ').trim();
  if (!label && el instanceof HTMLAnchorElement) label = el.getAttribute('href') ?? '';
  if (!label) return null;
  if (el instanceof HTMLAnchorElement && el.host && el.host !== location.host) {
    label = `${label} → ${el.host.replace(/^www\./, '')}`;
  }
  return label.slice(0, MAX_LABEL);
}

function start(): void {
  const isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  if (isLocal && storage()?.getItem(DEV_OPT_IN_KEY) !== '1') return;

  captureOwnerKey();
  const visitor = getAnonId();
  const queue: Event[] = [];
  let timer: ReturnType<typeof setTimeout> | null = null;

  const flush = (unloading: boolean) => {
    const events = queue.splice(0, queue.length);
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (events.length === 0) return;
    const ownerKey = storage()?.getItem(OWNER_KEY_KEY) ?? undefined;
    // text/plain keeps this a CORS "simple request": no preflight, and the
    // server parses the body as JSON regardless of the declared type.
    const body = JSON.stringify({ site: SITE, visitor, ownerKey, events });
    try {
      if (unloading && 'sendBeacon' in navigator) {
        navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'text/plain' }));
        return;
      }
      fetch(ENDPOINT, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'text/plain' },
        credentials: 'omit',
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Tracking must never break the page.
    }
  };

  const enqueue = (event: Event) => {
    queue.push(event);
    if (queue.length >= FLUSH_AT_QUEUE_SIZE) {
      flush(false);
      return;
    }
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        flush(false);
      }, FLUSH_DEBOUNCE_MS);
    }
  };

  const page = location.pathname;
  enqueue({ type: 'pageview', page, referrer: externalReferrer() });

  document.addEventListener(
    'click',
    (e) => {
      const target = e.target instanceof Element ? e.target : null;
      const el = target?.closest<HTMLElement>('button, a, [role="button"], [data-track]');
      if (!el) return;
      const label = labelFor(el);
      if (label) enqueue({ type: 'click', page, label });
    },
    { capture: true },
  );

  // Flush when the tab hides or the page is left, so the last batch — often
  // the outbound click to Amazon or Etsy — isn't lost with the document.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush(true);
  });
  window.addEventListener('pagehide', () => flush(true));
}

try {
  start();
} catch {
  // Never let analytics surface to the reader.
}
