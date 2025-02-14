'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const sections = [
  { key: 'personal-info', label: 'Personal Info' },
  { key: 'skills', label: 'Skills' },
  { key: 'education', label: 'Education' },
  { key: 'experience', label: 'Experience' },
  { key: 'accomplishments-certifications', label: 'Accomplishments & Certifications' },
  { key: 'projects', label: 'Projects' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const currentPath = pathname.split('/').pop()

  return (
    <aside className="w-64 min-h-screen bg-gray-100 p-4 border-r">
      <nav className="space-y-2">
        {sections.map(({ key, label }) => (
          <Link key={key} href={`/user-details/${key}`} className="block">
            <span
              className={clsx(
                'block p-2 rounded text-gray-700 hover:bg-gray-200 transition',
                currentPath === key && 'bg-blue-500 text-white font-semibold'
              )}
            >
              {label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
