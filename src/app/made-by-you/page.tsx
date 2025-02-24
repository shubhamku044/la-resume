'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function MadeByYouPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex justify-center gap-4">
        <Button>
          <Link href="/templates" className="block px-4 py-1 text-white">
            Resume Templates
          </Link>
        </Button>
        <Button>
          <Link href="/made-by-you" className="block px-4 py-1 text-white">
            Resumes Made by You
          </Link>
        </Button>
      </div>

      <h1 className="mb-4 text-center text-2xl font-bold">Your Created Resumes</h1>
      <p className="text-center text-gray-500">You haven&apos;t created any resumes yet.</p>
    </div>
  );
}
