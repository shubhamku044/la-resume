import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Sb2novResumeData } from '@/lib/templates/sb2nov';
import { Reorder } from 'framer-motion';
import { GripVertical, Pencil, Trash } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

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

  const [sectionTitle, setSectionTitle] = useState(data.sectionTitle);
  const [isEditingSectionTitle, setIsEditingSectionTitle] = useState(false);
  const [isHoveringSectionTitle, setIsHoveringSectionTitle] = useState(false);
  const sectionTitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingSectionTitle && sectionTitleInputRef.current) {
      sectionTitleInputRef.current.focus();
      sectionTitleInputRef.current.select();
    }
  }, [isEditingSectionTitle]);

  const handleSectionTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSectionTitle(e.target.value);
  };

  const handleSectionTitleBlur = () => {
    if (!sectionTitle.trim()) {
      toast.error('Section title cannot be empty');
      setSectionTitle(data.sectionTitle);
    }
    setIsEditingSectionTitle(false);
    setTempData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        sectionTitle: sectionTitle.trim() || data.sectionTitle,
      },
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleSectionTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!sectionTitle.trim()) {
        toast.error('Section title cannot be empty');
        setSectionTitle(data.sectionTitle);
      }
      setIsEditingSectionTitle(false);
      setTempData((prev) => ({
        ...prev,
        education: {
          ...prev.education,
          sectionTitle: sectionTitle.trim() || data.sectionTitle,
        },
      }));
      if (setIsChangesSaved) setIsChangesSaved(false);
    }
  };

  const handleReorder = (newOrder: Sb2novResumeData['education']['entries']) => {
    setTempData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        entries: newOrder,
      },
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleOpenModal = (index: number) => {
    setEditingIndex(index);
    setTempEntry(data.entries[index]);
    setModalOpen(true);
  };

  const handleSave = () => {
    setTempData((prev) => {
      const updatedEducation = [...prev.education.entries];
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
      return {
        ...prev,
        education: {
          ...prev.education,
          entries: updatedEducation,
        },
      };
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
      education: {
        ...prev.education,
        entries: prev.education.entries.filter((_, i) => i !== index),
      },
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  return (
    <div className="space-y-4">
      <div
        className="group relative flex items-center gap-2"
        onMouseEnter={() => setIsHoveringSectionTitle(true)}
        onMouseLeave={() => setIsHoveringSectionTitle(false)}
      >
        {isEditingSectionTitle ? (
          <Input
            ref={sectionTitleInputRef}
            type="text"
            value={sectionTitle}
            onChange={handleSectionTitleChange}
            onBlur={handleSectionTitleBlur}
            onKeyDown={handleSectionTitleKeyDown}
            className="text-xl font-bold transition-all"
            placeholder="Section Title"
          />
        ) : (
          <div className="relative cursor-text" onClick={() => setIsEditingSectionTitle(true)}>
            <h1 className="text-xl font-bold transition-all group-hover:opacity-80">
              {sectionTitle}
            </h1>
            <Pencil
              className={`absolute -right-6 top-1/2 size-4 -translate-y-1/2 transition-opacity ${
                isHoveringSectionTitle ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        )}
      </div>

      <Reorder.Group values={data.entries} onReorder={handleReorder} className="space-y-3">
        {data.entries.map((entry, index) => (
          <Reorder.Item key={entry.id} value={entry}>
            <Card className="flex justify-between p-4">
              <div className="flex gap-2">
                <GripVertical size={20} className="mt-1 cursor-grab opacity-65" />
                <div>
                  <h3 className="text-base font-bold">{entry.institution || 'Untitled Degree'}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {entry.degree || 'No Institution'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {entry.startDate} - {entry.endDate || 'Present'}
                  </p>
                  {entry.marks && (
                    <p className="text-sm text-gray-700 dark:text-gray-200">{entry.marks}</p>
                  )}
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

      {/* Add Education Dialog */}
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
        <DialogContent className="max-h-[calc(100vh-10rem)] overflow-y-auto">
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
