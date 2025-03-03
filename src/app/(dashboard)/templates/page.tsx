'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TemplatesPage() {
  const router = useRouter();

  // Redirect to `/templates/resume-templates` by default
  useEffect(() => {
    router.replace('/templates/resume-templates');
  }, [router]);

  return null; // Render nothing while redirecting
}
