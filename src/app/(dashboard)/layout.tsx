import ReduxProvider from '@/components/providers/redux-provider';
import { RedirectToSignUp, Show } from '@clerk/nextjs';
import { DashboardLayout } from './_components';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardLayout>
        <Show when="signed-in">
          <ReduxProvider>{children}</ReduxProvider>
        </Show>
      </DashboardLayout>
      <Show when="signed-out">
        <RedirectToSignUp redirectUrl={'/'} />
      </Show>
    </>
  );
}
