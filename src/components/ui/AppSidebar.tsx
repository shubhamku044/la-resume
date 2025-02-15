import clsx from 'clsx'
import { userDetailSections } from '@/lib/sections'

interface SidebarProps {
  selected: string
  onSelect: (key: string) => void
  isOpen: boolean
}

export function AppSidebar({ selected, onSelect, isOpen }: SidebarProps) {
  return (
    <aside
      className={`${isOpen ? 'w-64 p-4' : 'w-0 p-0'} min-h-screen overflow-hidden border-r bg-gray-100 duration-200`}
    >
      <nav className="space-y-2">
        {userDetailSections.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={clsx(
              'block w-full rounded p-2 text-left text-gray-700 transition hover:bg-gray-200',
              selected === key && 'bg-blue-500 font-semibold text-white'
            )}
          >
            {label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
