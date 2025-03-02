import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './user-details/_components';
import { cn } from '@/lib/utils';
import { RedirectToSignUp, SignedIn, SignedOut } from '@clerk/nextjs';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SignedIn>
        <div className="flex min-h-screen w-full">
          <AppSidebar />

          <main className="flex-1">
            <div className={cn('h-full transition-[margin] duration-300')}>
              <div className="flex h-full flex-col">
                <div className="fixed left-4 top-4 z-20 lg:hidden">
                  <SidebarTrigger className="rounded-lg border bg-background p-2 shadow-md" />
                </div>
                <div className="flex-1 overflow-y-auto p-2 md:p-4">
                  <div className="w-full">
                    <div className="space-y-8">{children}</div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignUp redirectUrl={'/'} />
      </SignedOut>
    </SidebarProvider>
  );
}
