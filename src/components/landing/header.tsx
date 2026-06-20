'use client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Show, UserButton } from '@clerk/nextjs';
import { FileText, Menu } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LanguageSelectorDropdown from '../language-selector-dropdown';
import { ThemeToggle } from './theme-provider';

export function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 lg:px-6 flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-primary text-white shadow-sm">
              <FileText className="size-5" />
            </span>
            <span className="text-xl font-bold tracking-tight">La Resume</span>
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

          <Show when="signed-in">
            <Button
              onClick={() => {
                router.push('/templates');
              }}
              size="default"
              className="rounded-full bg-gradient-primary text-white shadow-sm transition-shadow hover:shadow-glow"
            >
              Go to app
            </Button>
            <UserButton />
          </Show>
          <Show when="signed-out">
            <Link href="/sign-in">
              <Button
                size="default"
                className="hidden rounded-full bg-gradient-primary text-white shadow-sm transition-shadow hover:shadow-glow md:flex"
              >
                Get Started
              </Button>
            </Link>
          </Show>

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
                <Link
                  href="#features"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  How It Works
                </Link>
                <Link
                  href="#team"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Our Team
                </Link>
                <Link
                  href="#testimonials"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Testimonials
                </Link>
                <Link
                  href="#faq"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  FAQ
                </Link>

                <Show when="signed-in">
                  <Button
                    onClick={() => {
                      router.push('/templates');
                    }}
                    size="sm"
                    className="rounded-full bg-gradient-primary text-white"
                  >
                    Go to app
                  </Button>
                  <UserButton />
                </Show>
                <Show when="signed-out">
                  <Link href="/sign-in">
                    <Button size="sm" className="rounded-full bg-gradient-primary text-white">
                      Get Started
                    </Button>
                  </Link>
                </Show>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
