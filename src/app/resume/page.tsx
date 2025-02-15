'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import type { UserDetails } from '@/types/userDetails'

const initialResumeData: UserDetails = {
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
    interests: [],
  },
  skills: [],
  education: [],
  experience: [],
  accomplishments: [],
  certifications: [],
  projects: [],
}

const ResumePage = () => {
  const [resumeData, setResumeData] = useState<UserDetails>(initialResumeData)
  const [activeSection, setActiveSection] = useState('personalInfo')
  const [currentExperience, setCurrentExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
  })

  useEffect(() => {
    const mydata: string | null = localStorage.getItem('userDetails')

    if (mydata) {
      setResumeData(JSON.parse(mydata))
    }
  }, [])

  useEffect(() => {
    console.log('Resume data', resumeData)
  }, [resumeData])

  const updatePersonalInfo = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }))
  }

  const addExperience = () => {
    if (currentExperience.company && currentExperience.position) {
      setResumeData((prev) => ({
        ...prev,
        experience: [...prev.experience, currentExperience],
      }))
      setCurrentExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
      })
    }
  }

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
          </div>

          {/* Personal Info Form */}
          {activeSection === 'personalInfo' && (
            <Card className="space-y-4 p-6">
              <h2 className="mb-4 text-xl font-bold">Personal Information</h2>

              <div className="space-y-4">
                {Object.keys(resumeData.personalInfo).map((field) => (
                  <div key={field}>
                    <Label className="capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</Label>
                    <Input
                      value={resumeData.personalInfo[field]}
                      onChange={(e) => updatePersonalInfo(field, e.target.value)}
                      placeholder={`Enter your ${field.toLowerCase()}`}
                      className="mt-1"
                    />
                  </div>
                ))}
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
                    value={currentExperience.position}
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
                    value={currentExperience.description}
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
                  {resumeData.experience.map((exp, index) => (
                    <Card key={index} className="p-4">
                      <h4 className="font-bold">{exp.company}</h4>
                      <p className="text-sm text-gray-600">{exp.position}</p>
                      <p className="text-xs text-gray-500">
                        {exp.startDate} - {exp.endDate}
                      </p>
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
                    value={currentExperience.position}
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
                    value={currentExperience.description}
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
                  {resumeData.experience.map((exp, index) => (
                    <Card key={index} className="p-4">
                      <h4 className="font-bold">{exp.company}</h4>
                      <p className="text-sm text-gray-600">{exp.position}</p>
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
          <h1 className="mb-2 text-2xl font-bold">{resumeData.personalInfo.name || 'Your Name'}</h1>
          <p className="mb-4 text-gray-600">{resumeData.personalInfo.title || 'Your Title'}</p>

          <div className="mb-6 space-y-2 text-sm text-gray-600">
            {resumeData.personalInfo.email && <p>📧 {resumeData.personalInfo.email}</p>}
            {resumeData.personalInfo.phone && <p>📱 {resumeData.personalInfo.phone}</p>}
            {resumeData.personalInfo.location && <p>📍 {resumeData.personalInfo.location}</p>}
            {resumeData.personalInfo.linkedin && (
              <p>🔗 LinkedIn: {resumeData.personalInfo.linkedin}</p>
            )}
            {resumeData.personalInfo.github && <p>💻 GitHub: {resumeData.personalInfo.github}</p>}
          </div>

          {resumeData.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-3 text-xl font-bold">Experience</h2>
              <div className="space-y-4">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="border-b pb-4">
                    <h3 className="font-bold">{exp.company}</h3>
                    <p className="text-gray-600">{exp.position}</p>
                    <p className="text-sm text-gray-500">
                      {exp.startDate} - {exp.endDate}
                    </p>
                    <p className="mt-2 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {resumeData.education.length > 0 && (
            <div className="mt-2">
              <h2 className="mb-3 text-xl font-bold">Education</h2>
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="border-b pb-4">
                    <h3 className="font-bold">{edu.school}</h3>
                    <p className="text-gray-600">{edu.degree}</p>
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default ResumePage