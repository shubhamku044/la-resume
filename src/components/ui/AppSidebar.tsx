import clsx from 'clsx'
import { userDetailSections } from '@/lib/sections'

interface SidebarProps {
  selected: string
  onSelect: (key: string) => void
}

export function AppSidebar({ selected, onSelect }: SidebarProps) {
  return (
    <aside className="w-64 min-h-screen bg-gray-100 p-4 border-r">
      <nav className="space-y-2">
        {userDetailSections.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={clsx(
              'block w-full text-left p-2 rounded text-gray-700 hover:bg-gray-200 transition',
              selected === key && 'bg-blue-500 text-white font-semibold'
            )}
          >
            {label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
