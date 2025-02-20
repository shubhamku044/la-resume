import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
const Header = () => {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      {/* Clickable Logo */}
      <Link href="/" className="text-lg font-semibold transition hover:opacity-80">
        Logo
      </Link>

      {/* Navigation Links */}
      <nav className="flex items-center gap-6">
        <Link href="/templates" className="text-gray-700 hover:text-black">
          Templates
        </Link>
        <Link href="/user-details" className="text-gray-700 hover:text-black">
          User Details
        </Link>
        <Link href="https://github.com/shubhamku044/la-resume" target="_blank">
          <FaGithub className="size-8" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
