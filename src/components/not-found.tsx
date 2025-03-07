'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 flex justify-center">
            <svg
              className="size-48 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="mb-4 text-9xl font-bold text-gray-900"
          >
            404
          </motion.h1>

          <h2 className="mb-4 text-3xl font-semibold text-gray-800 sm:text-4xl">
            Oops! Page Not Found
          </h2>

          <p className="mb-8 text-lg text-gray-600">
            The resume page you&apos;re looking for has either been moved or doesn&apos;t exist.
            Let&apos;s get you back to building amazing resumes!
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={() => router.back()}
              className="w-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl sm:w-auto"
            >
              Go Back
            </Button>
            <span className="text-gray-500">or</span>
            <Link href="/" legacyBehavior passHref>
              <Button
                variant="secondary"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:from-purple-700 hover:to-blue-700 hover:shadow-xl sm:w-auto"
              >
                Return Home
              </Button>
            </Link>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-sm text-gray-500"
          >
            Still lost? Contact us at{' '}
            <a
              href="mailto:shubhamku044@gmail.com"
              className="text-blue-600 underline hover:text-blue-700"
            >
              here
            </a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
