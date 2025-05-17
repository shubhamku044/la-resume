import { useState, useEffect, useRef } from 'react';
import { Reorder } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Sb2novResumeData } from '@/lib/templates/sb2nov';
import { GripVertical, Pencil, Trash } from 'lucide-react';
import { toast } from 'sonner';

interface SkillsProps {
  data: Sb2novResumeData['skills'];
  setTempData: React.Dispatch<React.SetStateAction<Sb2novResumeData>>;
  setIsChangesSaved?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SkillsSection = ({ data, setTempData, setIsChangesSaved }: SkillsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempCategory, setTempCategory] = useState('');
  const [tempSkills, setTempSkills] = useState('');

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
      skills: {
        ...prev.skills,
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
        skills: {
          ...prev.skills,
          sectionTitle: sectionTitle.trim() || data.sectionTitle,
        },
      }));
      if (setIsChangesSaved) setIsChangesSaved(false);
    }
  };

  const handleReorder = (newOrder: { category: string; items: string[] }[]) => {
    setTempData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        entries: newOrder,
      },
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleOpenModal = (index: number | null = null) => {
    setEditingIndex(index);
    if (index !== null) {
      setTempCategory(data.entries[index].category);
      setTempSkills(data.entries[index].items.join(', '));
    } else {
      setTempCategory('');
      setTempSkills('');
    }
    setModalOpen(true);
  };

  const handleSaveCategory = () => {
    if (!tempCategory.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }
    setTempData((prev) => {
      const updatedEntries = [...prev.skills.entries];
      if (editingIndex !== null) {
        updatedEntries[editingIndex] = {
          category: tempCategory,
          items: tempSkills.split(', ').filter(Boolean),
        };
      } else {
        updatedEntries.push({
          category: tempCategory,
          items: tempSkills.split(', ').filter(Boolean),
        });
      }
      return {
        ...prev,
        skills: {
          ...prev.skills,
          entries: updatedEntries,
        },
      };
    });
    setModalOpen(false);
    setEditingIndex(null);
    setTempCategory('');
    setTempSkills('');
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleRemoveCategory = (index: number) => {
    setTempData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        entries: prev.skills.entries.filter((_, i) => i !== index),
      },
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  return (
    <div className="space-y-4">
      {/* Section Title */}
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

      {/* Skills Entries */}
      <Reorder.Group values={data.entries} onReorder={handleReorder} className="space-y-3">
        {data.entries.map((entry, index) => (
          <Reorder.Item key={entry.category} value={entry}>
            <Card className="flex justify-between p-4">
              <div className="flex gap-2">
                <GripVertical size={20} className="mt-1 cursor-grab opacity-65" />
                <div>
                  <h3 className="text-base font-semibold">{entry.category}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {entry.items.join(', ')}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="icon" variant="outline" onClick={() => handleOpenModal(index)}>
                  <Pencil size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleRemoveCategory(index)}
                >
                  <Trash size={16} />
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
            setTempCategory('');
            setTempSkills('');
          }
          setModalOpen(isOpen);
        }}
      >
        <DialogTrigger asChild>
          <Button onClick={() => handleOpenModal(null)}>Add New Category</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingIndex !== null ? 'Edit Category' : 'Add Category'}</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            value={tempCategory}
            onChange={(e) => setTempCategory(e.target.value)}
            placeholder="Category Name"
            className="mb-4"
          />
          <Input
            type="text"
            value={tempSkills}
            onChange={(e) => setTempSkills(e.target.value)}
            placeholder="Skills (comma-separated)"
          />
          <Button onClick={handleSaveCategory}>
            {editingIndex !== null ? 'Save Changes' : 'Add Category'}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SkillsSection;
