'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function MadeByYouPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Mobile Select Dropdown */}
      <div className="mb-6 sm:hidden">
        <Select defaultValue="/made-by-you" onValueChange={(value) => router.push(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Page" defaultValue="/made-by-you" />
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

      <h1 className="mb-4 text-center text-xl font-bold sm:text-2xl">Your Created Resumes</h1>
      <p className="text-center text-gray-500">You haven&apos;t created any resumes yet.</p>
    </div>
  );
}
