import ReduxProvider from '@/components/providers/redux-provider';
import { RedirectToSignUp, SignedIn, SignedOut } from '@clerk/nextjs';
import { DashboardLayout } from './_components';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardLayout>
        <SignedIn>
          <ReduxProvider>{children}</ReduxProvider>
        </SignedIn>
      </DashboardLayout>
      <SignedOut>
        <RedirectToSignUp redirectUrl={'/'} />
      </SignedOut>
    </>
  );
}
