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
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface HonorsAwardsProps {
  data: Sb2novResumeData['honorsAndAwards'];
  setTempData: React.Dispatch<React.SetStateAction<Sb2novResumeData>>;
  setIsChangesSaved?: React.Dispatch<React.SetStateAction<boolean>>;
}

const HonorsAwardsSection = ({ data, setTempData, setIsChangesSaved }: HonorsAwardsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempEntry, setTempEntry] = useState<{
    id: string;
    description: string;
    url?: string;
    urlLabel?: string;
  }>({
    id: '',
    description: '',
    url: '',
    urlLabel: '',
  });
  const t = useTranslations();

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
      honorsAndAwards: {
        ...prev.honorsAndAwards,
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
        honorsAndAwards: {
          ...prev.honorsAndAwards,
          sectionTitle: sectionTitle.trim() || data.sectionTitle,
        },
      }));
      if (setIsChangesSaved) setIsChangesSaved(false);
    }
  };

  const handleReorder = (newOrder: Sb2novResumeData['honorsAndAwards']['entries']) => {
    setTempData((prev) => ({
      ...prev,
      honorsAndAwards: {
        ...prev.honorsAndAwards,
        entries: newOrder,
      },
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleOpenModal = (index: number | null = null) => {
    setEditingIndex(index);
    if (index !== null) {
      setTempEntry(data.entries[index]);
    } else {
      setTempEntry({
        id: '',
        description: '',
        url: '',
        urlLabel: '',
      });
    }
    setModalOpen(true);
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleSaveEntry = () => {
    setTempData((prev) => {
      const updatedEntries = [...prev.honorsAndAwards.entries];
      if (editingIndex !== null) {
        updatedEntries[editingIndex] = tempEntry;
      } else {
        const newEntry = {
          ...tempEntry,
          id: tempEntry.id || Date.now().toString(),
        };
        updatedEntries.push(newEntry);
      }
      return {
        ...prev,
        honorsAndAwards: {
          ...prev.honorsAndAwards,
          entries: updatedEntries,
        },
      };
    });
    setModalOpen(false);
    setEditingIndex(null);
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleRemoveEntry = (index: number) => {
    setTempData((prev) => ({
      ...prev,
      honorsAndAwards: {
        ...prev.honorsAndAwards,
        entries: prev.honorsAndAwards.entries.filter((_, i) => i !== index),
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
            <Card className="flex items-start justify-between rounded-lg border border-gray-300 p-5 shadow-sm">
              <div className="flex gap-2">
                <GripVertical size={20} className="mt-1 cursor-grab opacity-65" />
                <div className="w-full space-y-2">
                  <p className="text-base text-gray-800 dark:text-gray-200">
                    {entry.description || 'No Description'}
                  </p>
                  {entry.url && (
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {entry.urlLabel || 'Link'}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex space-x-3">
                <Button size="icon" variant="outline" onClick={() => handleOpenModal(index)}>
                  <Pencil size={18} />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => handleRemoveEntry(index)}>
                  <Trash size={18} />
                </Button>
              </div>
            </Card>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => handleOpenModal(null)}>Add Honor / Award</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingIndex !== null ? 'Edit Honor / Award' : 'Add Honor / Award'}
            </DialogTitle>
          </DialogHeader>

          <Input
            type="text"
            value={tempEntry.description}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Description"
          />
          <Input
            type="text"
            value={tempEntry.url}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, url: e.target.value }))}
            placeholder="URL (optional)"
          />
          <Input
            type="text"
            value={tempEntry.urlLabel}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, urlLabel: e.target.value }))}
            placeholder="URL Label (optional)"
          />

          <Button onClick={handleSaveEntry} className="bg-green-500 text-white">
            {t('common.save')}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HonorsAwardsSection;
