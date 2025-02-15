'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const sections = [
  { key: 'personal-info', label: 'Personal Info' },
  { key: 'skills', label: 'Skills' },
  { key: 'education', label: 'Education' },
  { key: 'experience', label: 'Experience' },
  { key: 'accomplishments-certifications', label: 'Accomplishments & Certifications' },
  { key: 'projects', label: 'Projects' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const currentPath = pathname.split('/').pop();

  return (
    <aside className="min-h-screen w-64 border-r bg-gray-100 p-4">
      <nav className="space-y-2">
        {sections.map(({ key, label }) => (
          <Link key={key} href={`/user-details/${key}`} className="block">
            <span
              className={clsx(
                'block rounded p-2 text-gray-700 transition hover:bg-gray-200',
                currentPath === key && 'bg-blue-500 font-semibold text-white'
              )}
            >
              {label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
