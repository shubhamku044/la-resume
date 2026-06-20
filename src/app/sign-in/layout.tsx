import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in | La-Resume',
  description: 'Sign in to La-Resume to build and manage your ATS-friendly resumes.',
  // Auth pages add no search value and shouldn't be indexed.
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://la-resume.com/sign-in' },
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
