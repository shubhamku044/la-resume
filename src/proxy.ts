import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Note: `/resume-templates` is a PUBLIC, SSR marketing page and must NOT be
// protected. The resume builder lives at `/resume/...`, so anchor the matcher
// to `/resume` and `/resume/(.*)` to avoid catching `/resume-templates`.
const isProtectedRoute = createRouteMatcher([
  '/resume',
  '/resume/(.*)',
  '/templates(.*)',
  '/user-details(.*)',
]);
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req) && !isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|not-found$)).*)',
    '/(api|trpc)(.*)',
  ],
};
