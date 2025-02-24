import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Experience } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeExperience } from '@/store/slices';
import { ExperienceCard, ExperienceModal } from '../_components';

export default function ExperienceSection() {
  const experiences = useAppSelector((state) => state.experience);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | undefined>();

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    dispatch(removeExperience(id));
  };

  return (
    <div>
      <div>
        <h2 className="mb-4 text-xl font-bold">Work Experience</h2>
        <Button onClick={() => setIsOpen(true)}>
          <Plus size={16} className="mr-2 inline" />
          Add Experience
        </Button>
      </div>
      <div className="space-y-4">
        {experiences.map((experience) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <ExperienceModal
        initialData={editingExperience}
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditingExperience(undefined);
        }}
      />
    </div>
  );
}
