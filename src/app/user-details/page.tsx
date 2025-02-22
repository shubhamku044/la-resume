'use client';

import { useState, useEffect } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/AppSidebar';
import PersonalInfoSection from './sections/personal-info';
import SkillsSection from './sections/Skills';
import EducationSection from './sections/Education';
import ExperienceSection from './sections/Experience';
import AccomplishmentsSection from './sections/Accomplishments';
import ProjectsSection from './sections/Projects';
import { UserDetails } from '@/types/userDetails';

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

// Helper function to store user details in localStorage
const setUserDetailsToLocalStorage = (userDetails: UserDetails): void => {
  localStorage.setItem('userDetails', JSON.stringify(userDetails));
};

export default function UserDetailsPage() {
  const [selectedSection, setSelectedSection] = useState<string>('personal');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // State to hold the user details
  const [userDetails, setUserDetails] = useState<UserDetails>(() =>
    getUserDetailsFromLocalStorage()
  );

  // Whenever userDetails is updated, save it to localStorage
  useEffect(() => {
    setUserDetailsToLocalStorage(userDetails);
  }, [userDetails]);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <AppSidebar isOpen={sidebarOpen} selected={selectedSection} onSelect={setSelectedSection} />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <SidebarTrigger
            onClick={() => {
              setSidebarOpen((sidebar) => !sidebar);
            }}
          />

          {selectedSection === 'personal' && <PersonalInfoSection />}
          {selectedSection === 'skills' && (
            <SkillsSection userDetails={userDetails} setUserDetails={setUserDetails} />
          )}
          {selectedSection === 'education' && (
            <EducationSection userDetails={userDetails} setUserDetails={setUserDetails} />
          )}
          {selectedSection === 'experience' && (
            <ExperienceSection userDetails={userDetails} setUserDetails={setUserDetails} />
          )}
          {selectedSection === 'accomplishments' && (
            <AccomplishmentsSection userDetails={userDetails} setUserDetails={setUserDetails} />
          )}
          {selectedSection === 'projects' && (
            <ProjectsSection userDetails={userDetails} setUserDetails={setUserDetails} />
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}
