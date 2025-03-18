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
import { deedyResumeData } from '@/lib/templates/deedy';
import { GripVertical, Pencil, Trash } from 'lucide-react'; // Import icons

interface EducationProps {
  data: deedyResumeData['education'];
  setTempData: React.Dispatch<React.SetStateAction<deedyResumeData>>;
  setIsChangesSaved?: React.Dispatch<React.SetStateAction<boolean>>;
}

const EducationSection = ({ data, setTempData, setIsChangesSaved }: EducationProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempEntry, setTempEntry] = useState<{
    id: string;
    institute: string;
    degree: string;
    cgpa: string;
    year: string;
  }>({
    id: '',
    institute: '',
    degree: '',
    cgpa: '',
    year: '',
  });

  // Handle reordering education entries
  const handleReorder = (newOrder: deedyResumeData['education']) => {
    setTempData((prev) => ({ ...prev, education: newOrder }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Open modal for editing
  const handleOpenModal = (index: number) => {
    setEditingIndex(index);
    setTempEntry(data[index]);
    setModalOpen(true);
  };

  // Save education changes
  const handleSave = () => {
    setTempData((prev) => {
      const updatedEducation = [...prev.education];
      if (editingIndex !== null) {
        updatedEducation[editingIndex] = {
          ...tempEntry,
        };
      } else {
        updatedEducation.push({
          ...tempEntry,
          id: Date.now().toString(),
        });
      }
      return { ...prev, education: updatedEducation };
    });
    setModalOpen(false);
    setEditingIndex(null);
    setTempEntry({
      id: '',
      institute: '',
      degree: '',
      year: '',
      cgpa: '',
    });
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
                  <h3 className="text-base font-bold">{entry.institute || 'Untitled Degree'}</h3>
                  <p className="text-sm text-gray-600">{entry.degree || 'No Institution'}</p>
                  <p className="text-sm text-gray-500">{entry.year || ''}</p>
                  {entry.cgpa && <p className="text-sm text-gray-700">{entry.cgpa}</p>}
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

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setEditingIndex(null);
              setTempEntry({
                id: '',
                institute: '',
                degree: '',
                cgpa: '',
                year: '',
              });
              setModalOpen(true);
            }}
          >
            Add Education
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingIndex !== null ? 'Edit Education' : 'Add Education'}</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            value={tempEntry.institute}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, institute: e.target.value }))}
            placeholder="Institution Name"
          />
          <Input
            type="text"
            value={tempEntry.degree}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, degree: e.target.value }))}
            placeholder="Degree"
          />
          <Input
            type="text"
            value={tempEntry.year}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, year: e.target.value }))}
            placeholder="Duration (e.g., 2018 - 2022)"
          />
          <Input
            type="text"
            value={tempEntry.cgpa}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, cgpa: e.target.value }))}
            placeholder="Marks (e.g., 85% or 9.0 CGPA)"
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
