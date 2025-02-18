import { FC } from 'react'

const ResumePreview: FC<{ template: string }> = ({ template }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Resume Preview</h2>
      <p>Preview for {template} template will be rendered here.</p>
    </div>
  )
}

export default ResumePreview
