import { Button } from '@/components/ui/button';
import { EducationCard, EducationModal } from '../_components';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeEducation } from '@/store/slices';
import { Education } from '@/types';

export default function EducationSection() {
  const educations = useAppSelector((state) => state.education);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | undefined>();

  const handleEdit = (education: Education) => {
    setEditingEducation(education);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    dispatch(removeEducation(id));
  };

  return (
    <div>
      <div>
        <h2 className="mb-4 text-xl font-bold">Education</h2>
        <Button onClick={() => setIsOpen(true)}>
          <Plus size={16} className="mr-2 inline" />
          Add Education
        </Button>
      </div>
      <div className="space-y-4">
        {educations.map((education) => (
          <EducationCard
            key={education.id}
            education={education}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <EducationModal
        initialData={editingEducation}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
