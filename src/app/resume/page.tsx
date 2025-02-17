'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import type { UserDetails, Experience } from '@/types/userDetails';
import { X } from 'lucide-react';
import { ResumeData } from '@/types/resume';

const initialResumeData: UserDetails = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    title: '',
    address: '',
    summary: '',
    linkedin: '',
    github: '',
    portfolio: '',
    twitter: '',
    languages: [],
    interests: [],
  },
  skills: [],
  education: [],
  experience: [],
  accomplishments: [],
  certifications: [],
  projects: [],
};

const sampleResumeData: ResumeData = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  phone: '+1 (555) 123-4567',
  experience: [
    {
      position: 'Software Engineer',
      company: 'TechCorp Inc.',
      duration: 'Jan 2020 - Present',
    },
    {
      position: 'Frontend Developer',
      company: 'Web Solutions Ltd.',
      duration: 'Jul 2018 - Dec 2019',
    },
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of California, Berkeley',
      year: '2018',
    },
  ],
  skills: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Go',
    'Blockchain Development',
    'Solidity',
    'Foundry',
    'Tailwind CSS',
    'AWS',
    'Docker',
  ],
};

const ResumePage = () => {
  const [resumeData, setResumeData] = useState<UserDetails>(initialResumeData);
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [currentExperience, setCurrentExperience] = useState<Experience>({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    responsibilities: [],
    location: '',
  });

  useEffect(() => {
    const mydata: string | null = localStorage.getItem('userDetails');

    if (mydata) {
      setResumeData(JSON.parse(mydata));
      console.log('mydata', JSON.parse(mydata));
    }
  }, []);

  const updatePersonalInfo = (field: keyof UserDetails['personalInfo'], value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const addExperience = () => {
    if (currentExperience.company && currentExperience.role) {
      setResumeData((prev) => ({
        ...prev,
        experience: [...(prev.experience || []), currentExperience],
      }));
      setCurrentExperience({
        company: '',
        role: '',
        startDate: '',
        endDate: '',
        responsibilities: [],
        location: '',
      });
    }
  };

  const handleDownloadLatex = async () => {
    try {
      const response = await fetch('/api/export-latex', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sampleResumeData),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.tex';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Failed to download latex', error);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const response = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sampleResumeData),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Failed to download pdf', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Panel - Form */}
      <div className="w-1/2 overflow-y-auto p-6">
        <div className="space-y-6">
          {/* Navigation Tabs */}
          <div className="mb-6 flex space-x-2">
            {['personalInfo', 'experience', 'education', 'skills'].map((section) => (
              <Button
                key={section}
                variant={activeSection === section ? 'default' : 'outline'}
                onClick={() => setActiveSection(section)}
                className="capitalize"
              >
                {section.replace(/([A-Z])/g, ' $1').trim()}
              </Button>
            ))}
            <Button onClick={handleDownloadLatex}>Download latex</Button>
            <Button onClick={handleDownloadPdf}>Download pdf</Button>
          </div>

          {/* Personal Info Form */}
          {activeSection === 'personalInfo' && (
            <Card className="space-y-4 p-6">
              <h2 className="mb-4 text-xl font-bold">Personal Information</h2>

              <div className="space-y-4">
                {Object.keys(resumeData.personalInfo).map((field) => {
                  console.log('field', field);
                  return (
                    <div key={field}>
                      <Label className="capitalize">
                        {field.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      <Input
                        value={
                          resumeData.personalInfo[field as keyof typeof resumeData.personalInfo]
                        }
                        onChange={(e) =>
                          updatePersonalInfo(
                            field as keyof UserDetails['personalInfo'],
                            e.target.value
                          )
                        }
                        placeholder={`Enter your ${field.toLowerCase()}`}
                        className="mt-1"
                      />
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Experience Form */}
          {activeSection === 'experience' && (
            <Card className="space-y-4 p-6">
              <h2 className="mb-4 text-xl font-bold">Add Experience</h2>

              <div className="space-y-4">
                <div>
                  <Label>Company</Label>
                  <Input
                    value={currentExperience.company}
                    onChange={(e) =>
                      setCurrentExperience((prev) => ({
                        ...prev,
                        company: e.target.value,
                      }))
                    }
                    placeholder="Enter company name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Position</Label>
                  <Input
                    value={currentExperience.role}
                    onChange={(e) =>
                      setCurrentExperience((prev) => ({
                        ...prev,
                        position: e.target.value,
                      }))
                    }
                    placeholder="Enter position"
                    className="mt-1"
                  />
                </div>

                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={currentExperience.startDate}
                      onChange={(e) =>
                        setCurrentExperience((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                      className="mt-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={currentExperience.endDate}
                      onChange={(e) =>
                        setCurrentExperience((prev) => ({
                          ...prev,
                          endDate: e.target.value,
                        }))
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={currentExperience.responsibilities}
                    onChange={(e) =>
                      setCurrentExperience((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Enter job description"
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <Button onClick={addExperience} className="w-full">
                  Add Experience
                </Button>
              </div>

              {/* Experience List */}
              <div className="mt-6">
                <h3 className="mb-3 text-lg font-semibold">Added Experiences</h3>
                <div className="space-y-3">
                  {resumeData.experience?.map((exp, index) => (
                    <Card key={index} className="relative p-4">
                      <div
                        className="absolute right-0 top-0 flex size-6 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-600"
                        onClick={() => {
                          setResumeData((prev) => ({
                            ...prev,
                            experience: prev.experience?.filter((_, i) => i !== index),
                          }));
                        }}
                      >
                        <X className="text-white" size={18} />
                      </div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold">{exp.company}</h4>
                        <p className="text-sm text-gray-600">{exp.location}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>{exp.role}</p>
                        <p className="text-end text-xs text-gray-500">
                          {exp.startDate} - {exp.endDate}
                        </p>
                      </div>
                      <ul className="ml-6 mt-4 list-disc">
                        {typeof exp.responsibilities === 'object' &&
                          exp.responsibilities.map((res) => {
                            return (
                              <li key={res} className="text-xs">
                                {res}
                              </li>
                            );
                          })}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Education secion */}
          {activeSection === 'education' && (
            <Card className="space-y-4 p-6">
              <h2 className="mb-4 text-xl font-bold">Add Experience</h2>

              <div className="space-y-4">
                <div>
                  <Label>Company</Label>
                  <Input
                    value={currentExperience.company}
                    onChange={(e) =>
                      setCurrentExperience((prev) => ({
                        ...prev,
                        company: e.target.value,
                      }))
                    }
                    placeholder="Enter company name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Position</Label>
                  <Input
                    value={currentExperience.role}
                    onChange={(e) =>
                      setCurrentExperience((prev) => ({
                        ...prev,
                        position: e.target.value,
                      }))
                    }
                    placeholder="Enter position"
                    className="mt-1"
                  />
                </div>

                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={currentExperience.startDate}
                      onChange={(e) =>
                        setCurrentExperience((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                      className="mt-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={currentExperience.endDate}
                      onChange={(e) =>
                        setCurrentExperience((prev) => ({
                          ...prev,
                          endDate: e.target.value,
                        }))
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={currentExperience.responsibilities}
                    onChange={(e) =>
                      setCurrentExperience((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Enter job description"
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <Button onClick={addExperience} className="w-full">
                  Add Experience
                </Button>
              </div>

              {/* Experience List */}
              <div className="mt-6">
                <h3 className="mb-3 text-lg font-semibold">Added Experiences</h3>
                <div className="space-y-3">
                  {resumeData.experience?.map((exp, index) => (
                    <Card key={index} className="p-4">
                      <h4 className="font-bold">{exp.company}</h4>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                      <p className="text-xs text-gray-500">
                        {exp.startDate} - {exp.endDate}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="w-1/2 bg-white p-6">
        <Card className="h-full p-6">
          <h1 className="mb-2 text-2xl font-bold">
            {resumeData.personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="mb-4 text-gray-600">{resumeData.personalInfo.title || 'Your Title'}</p>

          <div className="mb-6 space-y-2 text-sm text-gray-600">
            {resumeData.personalInfo.email && <p>📧 {resumeData.personalInfo.email}</p>}
            {resumeData.personalInfo.phone && <p>📱 {resumeData.personalInfo.phone}</p>}
            {resumeData.personalInfo.address && <p>📍 {resumeData.personalInfo.address}</p>}
            {resumeData.personalInfo.linkedin && (
              <p>🔗 LinkedIn: {resumeData.personalInfo.linkedin}</p>
            )}
            {resumeData.personalInfo.github && <p>💻 GitHub: {resumeData.personalInfo.github}</p>}
          </div>

          {resumeData.experience?.length && (
            <div className="mb-6">
              <h2 className="mb-3 text-xl font-bold">Experience</h2>
              <div className="space-y-4">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="border-b pb-4">
                    <h3 className="font-bold">{exp.company}</h3>
                    <p className="text-gray-600">{exp.responsibilities}</p>
                    <p className="text-sm text-gray-500">
                      {exp.startDate} - {exp.endDate}
                    </p>
                    <p className="mt-2 text-sm">{exp.responsibilities}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {resumeData.education?.length && (
            <div className="mt-2">
              <h2 className="mb-3 text-xl font-bold">Education</h2>
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="border-b pb-4">
                    <h3 className="font-bold">{edu.school}</h3>
                    <p className="text-gray-600">{edu.degree}</p>
                    <p className="text-sm text-gray-500">
                      {edu.startYear} - {edu.endYear}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResumePage;
