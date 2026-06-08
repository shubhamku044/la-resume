import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Only capture errors in production
  enabled: process.env.NODE_ENV === 'production',

  // No performance tracing — error capture only
  tracesSampleRate: 0,

  // Capture 100% of errors
  sampleRate: 1.0,
});
