'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import UserDetailsForm from '@/components/forms/UserDetailsForm'

type UserDetails = {
  fullName: string
  email: string
  phone: string
  summary?: string
  skills?: string
  education?: string
  experience?: string
  accomplishments?: string
  address?: string
  dob?: string
  linkedin?: string
  github?: string
}

export default function UserDetailsPage() {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    fullName: '',
    email: '',
    phone: '',
  })

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white text-center">
      <h2 className="text-2xl font-semibold mb-4">Your Details</h2>
      {/* Always show fields, even if empty */}
      {/* Always show fields, even if empty */}
      <div className="border rounded-md p-4 bg-gray-100 min-h-[150px] text-left space-y-2">
        <p>
          <strong>Full Name:</strong>{' '}
          {userDetails.fullName || <span className="text-gray-400">Not set</span>}
        </p>
        <p>
          <strong>Email:</strong>{' '}
          {userDetails.email || <span className="text-gray-400">Not set</span>}
        </p>
        <p>
          <strong>Phone:</strong>{' '}
          {userDetails.phone || <span className="text-gray-400">Not set</span>}
        </p>
        <p>
          <strong>Summary:</strong>{' '}
          {userDetails.summary || <span className="text-gray-400">Not set</span>}
        </p>
        <p>
          <strong>Skills:</strong>{' '}
          {userDetails.skills || <span className="text-gray-400">Not set</span>}
        </p>
        <p>
          <strong>Education:</strong>{' '}
          {userDetails.education || <span className="text-gray-400">Not set</span>}
        </p>
        <p>
          <strong>Experience:</strong>{' '}
          {userDetails.experience || <span className="text-gray-400">Not set</span>}
        </p>
        <p>
          <strong>Accomplishments:</strong>{' '}
          {userDetails.accomplishments || <span className="text-gray-400">Not set</span>}
        </p>
        <p>
          <strong>Address:</strong>{' '}
          {userDetails.address || <span className="text-gray-400">Not set</span>}
        </p>
        <p>
          <strong>Date of Birth:</strong>{' '}
          {userDetails.dob || <span className="text-gray-400">Not set</span>}
        </p>
        <p>
          <strong>LinkedIn:</strong>{' '}
          {userDetails.linkedin || <span className="text-gray-400">Not set</span>}
        </p>
        <p>
          <strong>GitHub:</strong>{' '}
          {userDetails.github || <span className="text-gray-400">Not set</span>}
        </p>
      </div>
      {/* Edit Button & Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="mt-4">Edit Details</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription>Update your details and save them.</SheetDescription>
          </SheetHeader>
          <UserDetailsForm setUserDetails={setUserDetails} />
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
