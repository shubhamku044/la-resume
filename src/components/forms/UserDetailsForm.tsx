import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SheetClose } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Invalid phone number'),
  summary: z.string().max(500, 'Summary too long').optional(),
  skills: z.string().optional(),
  education: z.string().optional(),
  experience: z.string().optional(),
  accomplishments: z.string().optional(),
  address: z.string().optional(),
  dob: z.string().optional(),
  linkedin: z.string().url('Invalid URL').optional(),
  github: z.string().url('Invalid URL').optional(),
})

type FormData = z.infer<typeof formSchema>

export default function UserDetailsForm({
  setUserDetails,
}: {
  setUserDetails: (data: FormData) => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormData) => {
    setUserDetails(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Details */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Basic Details</h3>
        <Label htmlFor="fullName">Full Name</Label>
        <Input {...register('fullName')} id="fullName" />
        {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}

        <Label htmlFor="email" className="mt-2">
          Email
        </Label>
        <Input {...register('email')} id="email" />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

        <Label htmlFor="phone" className="mt-2">
          Phone
        </Label>
        <Input {...register('phone')} id="phone" />
        {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
      </div>

      {/* About */}
      <div>
        <h3 className="text-lg font-semibold mb-2">About</h3>
        <Label htmlFor="summary">Summary</Label>
        <Textarea {...register('summary')} id="summary" rows={3} />
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Skills</h3>
        <Label htmlFor="skills">List your skills</Label>
        <Textarea {...register('skills')} id="skills" rows={2} />
      </div>

      {/* Education */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Education</h3>
        <Label htmlFor="education">Educational Background</Label>
        <Textarea {...register('education')} id="education" rows={2} />
      </div>

      {/* Work Experience */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Work Experience</h3>
        <Label htmlFor="experience">Your past work experiences</Label>
        <Textarea {...register('experience')} id="experience" rows={3} />
      </div>

      {/* Accomplishments & Initiatives */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Accomplishments & Initiatives</h3>
        <Label htmlFor="accomplishments">Notable Achievements</Label>
        <Textarea {...register('accomplishments')} id="accomplishments" rows={3} />
      </div>

      {/* Personal Details */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Personal Details</h3>
        <Label htmlFor="address">Address</Label>
        <Input {...register('address')} id="address" />

        <Label htmlFor="dob" className="mt-2">
          Date of Birth
        </Label>
        <Input {...register('dob')} id="dob" type="date" />
      </div>

      {/* Social Links */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Social Links</h3>
        <Label htmlFor="linkedin">LinkedIn</Label>
        <Input {...register('linkedin')} id="linkedin" />
        {errors.linkedin && <span className="text-red-500 text-sm">{errors.linkedin.message}</span>}

        <Label htmlFor="github" className="mt-2">
          GitHub
        </Label>
        <Input {...register('github')} id="github" />
        {errors.github && <span className="text-red-500 text-sm">{errors.github.message}</span>}
      </div>

      <SheetClose asChild>
        <Button type="submit" className="w-full mt-4">
          Save Changes
        </Button>
      </SheetClose>
    </form>
  )
}
