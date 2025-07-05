'use client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { FileText, Menu } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LanguageSelectorDropdown from '../language-selector-dropdown';
import { ThemeToggle } from './theme-provider';

export function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-6 flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="flex items-center gap-2">
            <FileText className="size-6 text-primary" />
            <span className="text-xl font-bold">La Resume</span>
          </div>
        </Link>

        <nav className="hidden items-center space-x-6 md:flex">
          <Link
            href="/#features"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            How It Works
          </Link>
          <Link
            href="/#pricing"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Pricing
          </Link>
          <Link href="/#team" className="text-sm font-medium transition-colors hover:text-primary">
            Our Team
          </Link>
          <Link
            href="/#testimonials"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Testimonials
          </Link>
          <Link href="/#faq" className="text-sm font-medium transition-colors hover:text-primary">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageSelectorDropdown showLabel={false} />

          <SignedIn>
            <Button
              onClick={() => {
                router.push('/templates');
              }}
              size="default"
              className="bg-purple-500 text-white hover:bg-purple-600 rounded-full"
            >
              Go to app
            </Button>
            <UserButton afterSignOutUrl="/" afterSwitchSessionUrl="/templates" />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <Button
                size="default"
                className="hidden bg-purple-500 text-white hover:bg-purple-600 md:flex rounded-full"
              >
                Get Started
              </Button>
            </Link>
          </SignedOut>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <SheetTitle>Mobile Navigation</SheetTitle>
              <nav className="mt-6 flex flex-col gap-4">
                <a
                  href="#features"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  How It Works
                </a>
                <a
                  href="#team"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Our Team
                </a>
                <a
                  href="#testimonials"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Testimonials
                </a>
                <a href="#faq" className="text-sm font-medium transition-colors hover:text-primary">
                  FAQ
                </a>

                <SignedIn>
                  <Button
                    onClick={() => {
                      router.push('/templates');
                    }}
                    size="sm"
                    className="bg-purple-500 text-white hover:bg-purple-600 rounded-full"
                  >
                    Go to app
                  </Button>
                  <UserButton afterSignOutUrl="/" afterSwitchSessionUrl="/templates" />
                </SignedIn>
                <SignedOut>
                  <Link href="/sign-in">
                    <Button
                      size="sm"
                      className="bg-purple-500 text-white hover:bg-purple-600 rounded-full"
                    >
                      Get Started
                    </Button>
                  </Link>
                </SignedOut>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
