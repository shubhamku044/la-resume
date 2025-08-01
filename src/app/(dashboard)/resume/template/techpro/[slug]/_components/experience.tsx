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
import { TechProResumeData } from '@/lib/templates/techpro';
import { Reorder } from 'framer-motion';
import { GripVertical, Pencil, Trash, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface ExperienceProps {
  data: TechProResumeData['experience'];
  setTempData: React.Dispatch<React.SetStateAction<TechProResumeData>>;
  setIsChangesSaved?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExperienceSection = ({ data, setTempData, setIsChangesSaved }: ExperienceProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempEntry, setTempEntry] = useState<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    location: string;
    skills: string[];
    accomplishments: string[];
  }>({
    id: '',
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    location: '',
    skills: [],
    accomplishments: [],
  });

  const [newAccomplishment, setNewAccomplishment] = useState('');

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
      experience: {
        ...prev.experience,
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
        experience: {
          ...prev.experience,
          sectionTitle: sectionTitle.trim() || data.sectionTitle,
        },
      }));
      if (setIsChangesSaved) setIsChangesSaved(false);
    }
  };

  const handleReorder = (newOrder: TechProResumeData['experience']['entries']) => {
    setTempData((prev) => ({
      ...prev,
      experience: {
        ...prev.experience,
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
      const updatedEntries = [...prev.experience.entries];
      if (editingIndex !== null) {
        updatedEntries[editingIndex] = tempEntry;
      } else {
        updatedEntries.push({ ...tempEntry, id: Date.now().toString() });
      }
      return {
        ...prev,
        experience: {
          ...prev.experience,
          entries: updatedEntries,
        },
      };
    });

    setModalOpen(false);
    setEditingIndex(null);
    setTempEntry({
      id: '',
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      skills: [],
      accomplishments: [],
    });
    setNewAccomplishment('');
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleRemove = (index: number) => {
    setTempData((prev) => ({
      ...prev,
      experience: {
        ...prev.experience,
        entries: prev.experience.entries.filter((_, i) => i !== index),
      },
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleAddAccomplishment = () => {
    if (!newAccomplishment.trim()) return;
    setTempEntry((prev) => ({
      ...prev,
      accomplishments: [...(prev.accomplishments as string[]), newAccomplishment],
    }));
    setNewAccomplishment('');
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleRemoveAccomplishment = (accIndex: number) => {
    setTempEntry((prev) => ({
      ...prev,
      accomplishments: (prev.accomplishments as string[]).filter((_, i) => i !== accIndex),
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
            <Card className="rounded-lg border border-gray-300 p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex gap-2">
                  <GripVertical size={20} className="cursor-grab opacity-65" />
                  <div className="w-full space-y-2">
                    <h3 className="text-base font-semibold">
                      {entry.position || 'Untitled Accomplishment'}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {entry.startDate || 'No Date Provided'}
                    </p>

                    {entry.accomplishments && entry.accomplishments.length > 0 && (
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        {entry.accomplishments.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    )}
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
            setTempEntry({
              id: '',
              company: '',
              position: '',
              startDate: '',
              endDate: '',
              location: '',
              skills: [],
              accomplishments: [],
            });
            setNewAccomplishment('');
          }
          setModalOpen(isOpen);
        }}
      >
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setEditingIndex(null);
              setTempEntry({
                id: '',
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                location: '',
                skills: [],
                accomplishments: [],
              });
              setModalOpen(true);
            }}
          >
            Add Experience
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingIndex !== null ? 'Edit Experience' : 'Add Experience'}
            </DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            value={tempEntry.company}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, company: e.target.value }))}
            placeholder="Company Name"
          />
          <Input
            type="text"
            value={tempEntry.position}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, position: e.target.value }))}
            placeholder="Position"
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
            placeholder="End Date"
          />
          <Input
            type="text"
            value={tempEntry.location}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, location: e.target.value }))}
            placeholder="Location"
          />
          <Input
            type="text"
            value={tempEntry.skills.join(', ')}
            onChange={(e) =>
              setTempEntry((prev) => ({
                ...prev,
                skills: e.target.value.split(',').map((skill) => skill.trim()),
              }))
            }
            placeholder="Skills (comma-separated)"
          />
          <div className="space-y-2">
            <p className="font-semibold">Accomplishments</p>
            <div className="flex flex-wrap gap-2">
              {(tempEntry.accomplishments as string[]).map((acc, i) => (
                <span key={i} className="flex items-center rounded-md bg-gray-200 px-2 py-1">
                  {acc}
                  <button
                    onClick={() => handleRemoveAccomplishment(i)}
                    className="ml-2 text-red-500"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={newAccomplishment}
                onChange={(e) => setNewAccomplishment(e.target.value)}
                placeholder="Add an accomplishment"
              />
              <Button onClick={handleAddAccomplishment} className="bg-green-500 text-white">
                Add
              </Button>
            </div>
          </div>

          <Button onClick={handleSave} className="bg-green-500 text-white">
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExperienceSection;
