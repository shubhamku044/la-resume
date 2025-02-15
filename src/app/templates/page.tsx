'use client';

import Link from 'next/link';
import { templates } from '@/lib/templates';
import Image from 'next/image';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

export default function TemplatesPage() {
  return (
    <div className="container mx-auto p-6">
      {/* Navigation Bar */}
      <div className="mb-6 flex justify-center gap-4">
        <HoverBorderGradient containerClassName="p-1">
          <Link href="/templates" className="block px-4 py-1 text-white">
            Resume Templates
          </Link>
        </HoverBorderGradient>
        <HoverBorderGradient containerClassName="p-1">
          <Link href="/made-by-you" className="block px-4 py-1 text-white">
            Resumes Made by You
          </Link>
        </HoverBorderGradient>
      </div>

      <h1 className="mb-4 text-center text-2xl font-bold">Choose a Resume Template</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {templates.slice(0, 6).map((template) => (
          <Link href={`/resume/`} key={template.id}>
            <div className="flex flex-col items-center rounded-lg border p-4 shadow-md transition hover:shadow-lg">
              <div className="aspect-[210/297] w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={template.image}
                  alt={template.name}
                  width={210}
                  height={297}
                  className="size-full rounded-lg object-cover"
                />
              </div>

              <h2 className="text-md mt-2 text-center font-semibold">{template.name}</h2>
              <p className="text-center text-sm text-gray-600">{template.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
