'use client'

import Link from 'next/link'
import { templates } from '@/lib/templates'
import Image from 'next/image'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'

export default function TemplatesPage() {
  return (
    <div className="container mx-auto p-6">
      {/* Navigation Bar */}
      <div className="flex justify-center gap-4 mb-6">
        <HoverBorderGradient containerClassName="p-1">
          <Link href="/templates" className="px-4 py-1 text-white block">
            Resume Templates
          </Link>
        </HoverBorderGradient>
        <HoverBorderGradient containerClassName="p-1">
          <Link href="/made-by-you" className="px-4 py-1 text-white block">
            Resumes Made by You
          </Link>
        </HoverBorderGradient>
      </div>

      <h1 className="text-2xl font-bold mb-4 text-center">Choose a Resume Template</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {templates.slice(0, 6).map((template) => (
          <div
            key={template.id}
            className="border p-4 rounded-lg shadow-md hover:shadow-lg transition flex flex-col items-center"
          >
            <div className="w-full aspect-[210/297] overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={template.image}
                alt={template.name}
                width={210}
                height={297}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h2 className="text-md font-semibold mt-2 text-center">{template.name}</h2>
            <p className="text-gray-600 text-sm text-center">{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
