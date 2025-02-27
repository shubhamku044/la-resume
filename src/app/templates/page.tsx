'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { templates } from '@/lib/templates';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function TemplatesPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Mobile Select Dropdown */}
      <div className="mb-6 sm:hidden">
        <Select defaultValue="/templates" onValueChange={(value) => router.push(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Page" defaultValue="/templates" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="/templates">Resume Templates</SelectItem>
            <SelectItem value="/made-by-you">Resumes Made by You</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Navigation Buttons */}
      <div className="mb-6 hidden justify-center gap-3 sm:flex">
        <Button className="max-w-xs flex-1">
          <Link href="/templates" className="block w-full px-4 py-2 text-center text-white">
            Resume Templates
          </Link>
        </Button>
        <Button className="max-w-xs flex-1">
          <Link href="/made-by-you" className="block w-full px-4 py-2 text-center text-white">
            Resumes Made by You
          </Link>
        </Button>
      </div>

      <h1 className="mb-4 text-center text-xl font-bold sm:text-2xl">Choose a Resume Template</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {templates.slice(0, 6).map((template) => (
          <Link href={`/resume/template/${template.id}`} key={template.id} className="block">
            <div className="flex flex-col items-center rounded-lg border p-3 shadow-md transition hover:shadow-lg">
              <div className="w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={template.image}
                  alt={template.name}
                  width={210}
                  height={297}
                  className="h-auto w-full rounded-lg object-cover"
                />
              </div>

              <h2 className="mt-2 text-center text-base font-semibold sm:text-lg">
                {template.name}
              </h2>
              <p className="text-center text-sm text-gray-600">{template.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
