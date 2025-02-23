import Link from 'next/link';
import { LuGithub } from 'react-icons/lu';

const Header = () => {
  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between border-b px-6 py-4">
        <Link href="/" className="text-lg font-semibold transition hover:opacity-80">
          La Resume
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/templates" className="text-gray-700 hover:text-black">
            Templates
          </Link>
          <Link href="/user-details" className="text-gray-700 hover:text-black">
            User Details
          </Link>
          <Link
            className="rounded-full border-1 border-gray-300 p-2"
            href="https://github.com/shubhamku044/la-resume"
            target="_blank"
          >
            <LuGithub className="size-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
