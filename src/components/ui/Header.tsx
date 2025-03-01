'use client';
import { useState } from 'react';
import Link from 'next/link';
import { LuGithub } from 'react-icons/lu';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { Button } from './button';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const hideHeader = pathname.startsWith('/user-details') || pathname.startsWith('/templates');

  if (hideHeader) return null;

  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between border-b p-4 md:px-6">
        <Link href="/" className="text-lg font-semibold transition hover:opacity-80">
          La Resume
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <SignedIn>
            <Link href="/templates" className="text-gray-700 hover:text-black">
              Templates
            </Link>
            <Link href="/user-details" className="text-gray-700 hover:text-black">
              User Details
            </Link>
            <UserButton afterSignOutUrl="/" afterSwitchSessionUrl="/templates" />
          </SignedIn>
          <SignedOut>
            <div className="flex gap-2">
              <SignInButton
                fallbackRedirectUrl="/templates"
                signUpFallbackRedirectUrl="/"
                mode="modal"
              >
                <Button variant="outline">Sign In</Button>
              </SignInButton>
              <SignUpButton fallbackRedirectUrl="/" mode="modal">
                <Button>Sign Up</Button>
              </SignUpButton>
            </div>
          </SignedOut>
          <Link
            className="rounded-full border border-gray-300 p-2"
            href="https://github.com/shubhamku044/la-resume"
            target="_blank"
          >
            <LuGithub className="size-4" />
          </Link>
        </nav>

        <button
          className="p-2 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <HiOutlineX className="size-6" /> : <HiOutlineMenu className="size-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute z-10 w-full bg-white md:hidden">
          <nav className="flex flex-col items-center gap-4 border-b py-4">
            <SignedIn>
              <Link
                href="/templates"
                className="text-gray-700 hover:text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Templates
              </Link>
              <Link
                href="/user-details"
                className="text-gray-700 hover:text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                User Details
              </Link>
              <UserButton afterSignOutUrl="/" afterSwitchSessionUrl="/templates" />
            </SignedIn>
            <SignedOut>
              <SignInButton
                fallbackRedirectUrl="/templates"
                signUpFallbackRedirectUrl="/"
                mode="modal"
              >
                <Button variant="outline">Sign In</Button>
              </SignInButton>
              <SignUpButton fallbackRedirectUrl="/" mode="modal">
                <Button>Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            <Link
              className="mt-2 rounded-full border border-gray-300 p-2"
              href="https://github.com/shubhamku044/la-resume"
              target="_blank"
            >
              <LuGithub className="size-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
