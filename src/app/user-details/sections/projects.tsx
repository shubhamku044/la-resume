import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ProjectCard, ProjectModal } from '../_components';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Project } from '@/types';
import { removeProject } from '@/store/slices';

export default function ProjectsSection() {
  const projects = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    dispatch(removeProject(id));
  };

  return (
    <div>
      <div>
        <h2 className="mb-4 text-xl font-bold">Projects</h2>
        <Button onClick={() => setIsOpen(true)}>
          <Plus size={16} className="mr-2 inline" />
          Add Project
        </Button>
      </div>
      {projects.map((project) => {
        return (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      })}

      <ProjectModal
        initialData={editingProject}
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditingProject(undefined);
        }}
      />
    </div>
  );
}
