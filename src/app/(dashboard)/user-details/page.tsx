'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserDetails } from '@/types/userDetails';
import { useGetUserDetailsQuery } from '@/store/services/userDetailsApi';
import { useUser } from '@clerk/nextjs';

const getUserDetailsFromLocalStorage = (): UserDetails => {
  if (typeof window === 'undefined') {
    return {
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        dob: '',
        address: '',
        summary: '',
        linkedin: '',
        github: '',
        portfolio: '',
        twitter: '',
        languages: [],
      },
      skills: [],
      education: [],
      experience: [],
      accomplishments: [],
      certifications: [],
      projects: [],
    };
  }
  const storedData = localStorage.getItem('userDetails');
  return storedData
    ? JSON.parse(storedData)
    : {
        personalInfo: {
          fullName: '',
          email: '',
          phone: '',
          dob: '',
          address: '',
          summary: '',
          linkedin: '',
          github: '',
          portfolio: '',
          twitter: '',
          languages: [],
        },
        skills: [],
        education: [],
        experience: [],
        accomplishments: [],
        certifications: [],
        projects: [],
      };
};

const setUserDetailsToLocalStorage = (userDetails: UserDetails): void => {
  localStorage.setItem('userDetails', JSON.stringify(userDetails));
};

export default function UserDetailsPage() {
  const router = useRouter();
  const { user, isLoaded: isClerkLoaded } = useUser();
  const clerkId = user?.id;

  const { isLoading } = useGetUserDetailsQuery(clerkId || '', {
    skip: !clerkId,
  });

  const [userDetails] = useState<UserDetails>(() => getUserDetailsFromLocalStorage());

  useEffect(() => {
    setUserDetailsToLocalStorage(userDetails);
  }, [userDetails]);

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
