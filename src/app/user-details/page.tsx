'use client';

import { useState, useEffect } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/AppSidebar';
import PersonalInfoSection from './sections/personal-info';
import SkillsSection from './sections/skills';
import EducationSection from './sections/education';
import ExperienceSection from './sections/experience';
import AccomplishmentsSection from './sections/Accomplishments';
import ProjectsSection from './sections/projects';
import { SelectedSection, UserDetails } from '@/types/userDetails';

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
  const [selectedSection, setSelectedSection] = useState<SelectedSection>(SelectedSection.PERSONAL);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const [userDetails, setUserDetails] = useState<UserDetails>(() =>
    getUserDetailsFromLocalStorage()
  );

  useEffect(() => {
    setUserDetailsToLocalStorage(userDetails);
  }, [userDetails]);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen">
        <AppSidebar isOpen={sidebarOpen} selected={selectedSection} onSelect={setSelectedSection} />

        <main className="flex-1 p-6">
          <SidebarTrigger
            onClick={() => {
              setSidebarOpen((sidebar) => !sidebar);
            }}
          />
          {selectedSection === SelectedSection.PERSONAL && <PersonalInfoSection />}
          {selectedSection === SelectedSection.SKILLS && <SkillsSection />}
          {selectedSection === SelectedSection.EDUCATION && <EducationSection />}
          {selectedSection === SelectedSection.EXPERIENCE && <ExperienceSection />}
          {selectedSection === SelectedSection.ACCOMPLISHMENTS && (
            <AccomplishmentsSection userDetails={userDetails} setUserDetails={setUserDetails} />
          )}
          {selectedSection === SelectedSection.PROJECTS && <ProjectsSection />}
        </main>
      </div>
    </SidebarProvider>
  );
}
