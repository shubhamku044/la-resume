import { useState } from 'react';
import { Reorder } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { GripVertical, Pencil, Plus, Trash } from 'lucide-react';
import { MTeckResumeData } from '@/lib/templates/mteck';

interface EducationProps {
  data: MTeckResumeData['education'];
  setTempData: React.Dispatch<React.SetStateAction<MTeckResumeData>>;
  setIsChangesSaved?: React.Dispatch<React.SetStateAction<boolean>>;
}

const EducationSection = ({ data, setTempData, setIsChangesSaved }: EducationProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempEntry, setTempEntry] = useState<{
    id: string;
    institution: string;
    degree: string;
  }>({
    id: '',
    institution: '',
    degree: '',
  });

  const validateForm = () => {
    const newErrors: { institution?: string; degree?: string } = {};
    if (!tempEntry.institution) newErrors.institution = 'Institution is required';
    if (!tempEntry.degree) newErrors.degree = 'Degree is required';
    return Object.keys(newErrors).length === 0;
  };

  const handleReorder = (newOrder: MTeckResumeData['education']) => {
    setTempData((prev) => ({ ...prev, education: newOrder }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleOpenModal = (index: number) => {
    setEditingIndex(index);
    setTempEntry(data[index]);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!validateForm()) return;

    setTempData((prev) => {
      const updatedEducation = [...prev.education];
      if (editingIndex !== null) {
        updatedEducation[editingIndex] = { ...tempEntry };
      } else {
        updatedEducation.push({ ...tempEntry, id: Date.now().toString() });
      }
      return { ...prev, education: updatedEducation };
    });

    setModalOpen(false);
    setEditingIndex(null);
    setTempEntry({ id: '', institution: '', degree: '' });
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Remove an education entry
  const handleRemove = (index: number) => {
    setTempData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  return (
    <div className="space-y-4">
      <Reorder.Group values={data} onReorder={handleReorder} className="space-y-3">
        {data.map((entry, index) => (
          <Reorder.Item key={entry.id} value={entry}>
            <Card className="flex justify-between p-4">
              <div className="flex gap-2">
                <GripVertical size={20} className="mt-1 cursor-grab opacity-65" />
                <div>
                  <h3 className="text-base font-bold">
                    {entry.institution || 'Untitled Institution'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {entry.degree || 'No Degree'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button size="icon" variant="outline" onClick={() => handleOpenModal(index)}>
                  <Pencil size={18} />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => handleRemove(index)}>
                  <Trash size={18} />
                </Button>
              </div>
            </Card>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <Dialog
        open={modalOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setEditingIndex(null);
            setTempEntry({ id: '', institution: '', degree: '' });
          }
          setModalOpen(isOpen);
        }}
      >
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setEditingIndex(null);
              setTempEntry({ id: '', institution: '', degree: '' });
              setModalOpen(true);
            }}
          >
            <Plus size={18} className="mr-2" />
            Add Education
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingIndex !== null ? 'Edit Education' : 'Add Education'}</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            value={tempEntry.institution}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, institution: e.target.value }))}
            placeholder="Institution Name"
          />
          <Input
            type="text"
            value={tempEntry.degree}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, degree: e.target.value }))}
            placeholder="Degree"
          />
          <Button onClick={handleSave} className="bg-green-500 text-white">
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EducationSection;
