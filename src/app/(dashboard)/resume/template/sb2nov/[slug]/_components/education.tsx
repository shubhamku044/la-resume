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
import { Sb2novResumeData } from '@/lib/templates/sb2nov';
import { Pencil, Trash, GripVertical } from 'lucide-react';

interface EducationProps {
  data: Sb2novResumeData['education'];
  setTempData: React.Dispatch<React.SetStateAction<Sb2novResumeData>>;
  setIsChangesSaved?: React.Dispatch<React.SetStateAction<boolean>>;
}

const EducationSection = ({ data, setTempData, setIsChangesSaved }: EducationProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempEntry, setTempEntry] = useState<{
    id: string;
    institution: string;
    location: string;
    degree: string;
    startDate: string;
    endDate: string;
    marks: string;
  }>({
    id: '',
    institution: '',
    location: '',
    degree: '',
    startDate: '',
    endDate: '',
    marks: '',
  });

  const handleReorder = (newOrder: Sb2novResumeData['education']) => {
    setTempData((prev) => ({ ...prev, education: newOrder }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleOpenModal = (index: number) => {
    setEditingIndex(index);
    setTempEntry(data[index]);
    setModalOpen(true);
  };

  const handleSave = () => {
    setTempData((prev) => {
      const updatedEducation = [...prev.education];
      if (editingIndex !== null) {
        updatedEducation[editingIndex] = {
          ...tempEntry,
          endDate: tempEntry.endDate.trim() === '' ? 'Present' : tempEntry.endDate,
        };
      } else {
        updatedEducation.push({
          ...tempEntry,
          id: Date.now().toString(),
          endDate: tempEntry.endDate.trim() === '' ? 'Present' : tempEntry.endDate,
        });
      }
      return { ...prev, education: updatedEducation };
    });
    setModalOpen(false);
    setEditingIndex(null);
    setTempEntry({
      id: '',
      institution: '',
      location: '',
      degree: '',
      startDate: '',
      endDate: '',
      marks: '',
    });
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

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
                  <h3 className="text-base font-bold">{entry.institution || 'Untitled Degree'}</h3>
                  <p className="text-sm text-gray-600">{entry.degree || 'No Institution'}</p>
                  <p className="text-sm text-gray-500">
                    {entry.startDate} - {entry.endDate || 'Present'}
                  </p>
                  {entry.marks && <p className="text-sm text-gray-700">{entry.marks}</p>}
                </div>
              </div>
              <div className="flex space-x-3">
                <Button size="icon" variant="outline" onClick={() => handleOpenModal(index)}>
                  <Pencil size={16} />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => handleRemove(index)}>
                  <Trash size={16} />
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
                institution: '',
                location: '',
                degree: '',
                startDate: '',
                endDate: '',
                marks: '',
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
            value={tempEntry.institution}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, institution: e.target.value }))}
            placeholder="Institution Name"
          />
          <Input
            type="text"
            value={tempEntry.location}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, location: e.target.value }))}
            placeholder="Location"
          />
          <Input
            type="text"
            value={tempEntry.degree}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, degree: e.target.value }))}
            placeholder="Degree"
          />
          <Input
            type="text"
            value={tempEntry.startDate}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, startDate: e.target.value }))}
            placeholder="Start Date"
          />
          <Input
            type="text"
            value={tempEntry.endDate}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, endDate: e.target.value }))}
            placeholder="End Date (leave blank if present)"
          />
          <Input
            type="text"
            value={tempEntry.marks}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, marks: e.target.value }))}
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
