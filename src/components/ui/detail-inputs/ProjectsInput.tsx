import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Project } from '@/types/userDetails'

interface ProjectsInputProps {
  projects: Project[]
  onChange: (projects: Project[]) => void
}

// ✅ Heading Component (Separated for Clarity)
export function ProjectsSectionHeading() {
  return <h2 className="mb-3 text-lg font-semibold">Projects</h2>
}

export default function ProjectsInput({ projects, onChange }: ProjectsInputProps) {
  const addProject = () => {
    onChange([...projects, { title: '', description: '', technologies: [], link: '' }])
  }

  const updateProject = <K extends keyof Project>(index: number, key: K, value: Project[K]) => {
    const updatedProjects = [...projects]
    updatedProjects[index] = { ...updatedProjects[index], [key]: value }
    onChange(updatedProjects)
  }

  const removeProject = (index: number) => {
    onChange(projects.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      ;(e.target as HTMLInputElement).blur()
    }
  }

  return (
    <div>
      {projects.map((project, index) => (
        <div key={index} className="relative mb-3 rounded border p-4">
          <button
            onClick={() => removeProject(index)}
            className="absolute right-2 top-2 text-red-500"
          >
            <X size={16} />
          </button>

          {/* ✅ Field Labels Placed Outside */}
          <label className="text-sm font-medium">Project Title</label>
          <input
            type="text"
            value={project.title}
            onChange={(e) => updateProject(index, 'title', e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter project title"
            className="mb-2 w-full rounded border p-2"
          />

          <label className="text-sm font-medium">Project Description</label>
          <textarea
            value={project.description}
            onChange={(e) => updateProject(index, 'description', e.target.value)}
            placeholder="Enter project description"
            className="mb-2 w-full rounded border p-2"
            rows={3}
          />

          <label className="text-sm font-medium">Technologies</label>
          <StringListInput
            items={project.technologies}
            placeholder="Add a technology"
            onChange={(value) => updateProject(index, 'technologies', value)}
          />

          <label className="text-sm font-medium">Project Link (Optional)</label>
          <input
            type="text"
            value={project.link || ''}
            onChange={(e) => updateProject(index, 'link', e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter project link"
            className="mb-2 w-full rounded border p-2"
          />
        </div>
      ))}

      <button onClick={addProject} className="mt-2 rounded bg-blue-500 px-3 py-2 text-white">
        <Plus size={16} className="mr-2 inline" /> Add Project
      </button>
    </div>
  )
}

// ✅ Reusable String List Input for Technologies
function StringListInput({
  items,
  placeholder,
  onChange,
}: {
  items: string[]
  placeholder: string
  onChange: (items: string[]) => void
}) {
  const [newItem, setNewItem] = useState('')

  const addItem = () => {
    if (newItem.trim() && !items.includes(newItem.trim())) {
      onChange([...items, newItem.trim()])
      setNewItem('')
    }
  }

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItem()
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          className="w-full rounded border p-2"
        />
        <button onClick={addItem} className="rounded bg-gray-500 px-3 py-2 text-white">
          <Plus size={16} />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span key={index} className="flex items-center gap-1 rounded bg-gray-200 px-3 py-1">
            {item}
            <button onClick={() => removeItem(index)} className="text-red-500">
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}
