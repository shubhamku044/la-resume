import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Only capture errors in production
  enabled: process.env.NODE_ENV === 'production',

  // No performance tracing — error capture only
  tracesSampleRate: 0,

  // Capture 100% of errors
  sampleRate: 1.0,

  // Filter out errors from localhost / development
  beforeSend(event) {
    if (typeof window !== 'undefined') {
      const { hostname } = window.location;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return null;
      }
    }
    return event;
  },

  // Ignore common non-actionable errors
  ignoreErrors: [
    // Browser extensions & noise
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
    // Network errors that aren't actionable
    'Failed to fetch',
    'Load failed',
    'NetworkError',
    // User navigation aborts
    'AbortError',
  ],
});
