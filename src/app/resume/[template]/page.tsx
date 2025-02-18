import { resumes } from '@/data/resumes'
import { notFound } from 'next/navigation'
import ResumeForm from '@/components/templates/ResumeForm'
import ResumePreview from '@/components/templates/ResumePreview'

export default function ResumeTemplatePage({ params }: { params: { template: string } }) {
  const templateData = resumes[params.template as keyof typeof resumes]

  if (!templateData) return notFound() // If template doesn't exist, return 404

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {/* Render the Resume Form */}
      <ResumeForm sections={templateData.sections} />

      {/* Render the Resume Preview */}
      <ResumePreview template={params.template} />
    </div>
  )
}
