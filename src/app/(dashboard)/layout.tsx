import { RedirectToSignUp, SignedIn, SignedOut } from '@clerk/nextjs';
import { DashboardLayout } from './_components';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardLayout>
        <SignedIn>{children}</SignedIn>
      </DashboardLayout>
      <SignedOut>
        <RedirectToSignUp redirectUrl={'/'} />
      </SignedOut>
    </>
  );
}
