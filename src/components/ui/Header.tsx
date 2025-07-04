'use client';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { LuGithub } from 'react-icons/lu';
import LanguageSelectorDropdown from '../language-selector-dropdown';
import { Button } from './button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const hideHeader = pathname !== '/';
  const t = useTranslations();

  if (hideHeader) return null;

  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between border-b p-4 md:px-6">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="La-Resume Logo" width={120} height={40} />
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <SignedIn>
            <Link href="/pricing" className="text-gray-700 hover:text-black">
              {t('header.pricing')}
            </Link>
            <Link href="/templates" className="text-gray-700 hover:text-black">
              {t('header.templates')}
            </Link>
            <Link href="/user-details" className="text-gray-700 hover:text-black">
              {t('header.userProfile')}
            </Link>
            <UserButton afterSignOutUrl="/" afterSwitchSessionUrl="/templates" />
          </SignedIn>
          <SignedOut>
            <div className="flex gap-2">
              <Link href="/sign-in">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/sign-in">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </SignedOut>
          <Link
            className="rounded-full border border-gray-300 p-2"
            href="https://github.com/shubhamku044/la-resume"
            target="_blank"
          >
            <LuGithub className="size-4" />
          </Link>
          <LanguageSelectorDropdown showLabel={false} />
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
                {t('header.templates')}
              </Link>
              <Link
                href="/user-details"
                className="text-gray-700 hover:text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.userProfile')}
              </Link>
              <UserButton afterSignOutUrl="/" afterSwitchSessionUrl="/templates" />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/sign-in">
                <Button>Sign Up</Button>
              </Link>
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
