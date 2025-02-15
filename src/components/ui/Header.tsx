import Link from 'next/link'

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
      {/* Clickable Logo */}
      <Link href="/" className="text-lg font-semibold hover:opacity-80 transition">
        Logo
      </Link>

      {/* Navigation Links */}
      <nav className="flex gap-6">
        <Link href="/templates" className="text-gray-700 hover:text-black">
          Templates
        </Link>
        <Link href="/user-details" className="text-gray-700 hover:text-black">
          User Details
        </Link>
      </nav>
    </header>
  )
}

export default Header
