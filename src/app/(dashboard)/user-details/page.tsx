'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetUserDetailsQuery } from '@/store/services/userDetailsApi';
import { useUser } from '@clerk/nextjs';

export default function UserDetailsPage() {
  const router = useRouter();
  const { user, isLoaded: isClerkLoaded } = useUser();
  const clerkId = user?.id;

  const { isLoading } = useGetUserDetailsQuery(clerkId || '', {
    skip: !clerkId,
  });

  useEffect(() => {
    if (isClerkLoaded) {
      if (window.location.pathname === '/user-details') {
        router.replace('/user-details/personal-info');
      }
    }
  }, [isClerkLoaded, router]);

  if (!isClerkLoaded || (clerkId && isLoading)) {
    return <div>Loading...</div>;
  }
  if (!clerkId) {
    return <div>Error: User not authenticated</div>;
  }

  return null;
}
