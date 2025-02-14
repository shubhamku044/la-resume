'use client'

import { useState } from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/ui/AppSidebar'
import PersonalInfoSection from './sections/PersonalInfo'
import SkillsSection from './sections/Skills'
import EducationSection from './sections/Education'
import ExperienceSection from './sections/Experience'
import AccomplishmentsSection from './sections/Accomplishments'
import ProjectsSection from './sections/Projects'
import { UserDetails } from '@/types/userDetails'

export default function UserDetailsPage() {
  const [selectedSection, setSelectedSection] = useState<string>('personal')

  const [userDetails, setUserDetails] = useState<UserDetails>({
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
      languages: [], // ✅ Ensure it's always an array
    },
    skills: [],
    education: [],
    experience: [],
    accomplishments: [],
    certifications: [],
    projects: [],
  })

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <AppSidebar selected={selectedSection} onSelect={setSelectedSection} />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <SidebarTrigger />

          {/* Render Section Dynamically */}
          {selectedSection === 'personal' && (
            <PersonalInfoSection userDetails={userDetails} setUserDetails={setUserDetails} />
          )}
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
  )
}
