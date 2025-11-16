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
import { Check, GripVertical, Pencil, Trash, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface ProjectsProps {
  data: TechProResumeData['projects'];
  setTempData: React.Dispatch<React.SetStateAction<TechProResumeData>>;
  setIsChangesSaved?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectsSection = ({ data, setIsChangesSaved, setTempData }: ProjectsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempEntry, setTempEntry] = useState<{
    id: string;
    title: string;
    skills: string[];
    accomplishments: string[];
    urls: {
      label: string;
      url: string;
    }[];
  }>({
    id: '',
    title: '',
    skills: [],
    accomplishments: [],
    urls: [],
  });
  const [newAccomplishment, setNewAccomplishment] = useState('');
  const t = useTranslations();

  const [sectionTitle, setSectionTitle] = useState(data.sectionTitle);
  const [isEditingSectionTitle, setIsEditingSectionTitle] = useState(false);
  const [newSocialName, setNewSocialName] = useState('');
  const [newSocialUrl, setNewSocialUrl] = useState('');
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
      projects: {
        ...prev.projects,
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
        projects: {
          ...prev.projects,
          sectionTitle: sectionTitle.trim() || data.sectionTitle,
        },
      }));
      if (setIsChangesSaved) setIsChangesSaved(false);
    }
  };

  const handleReorder = (newOrder: TechProResumeData['projects']['entries']) => {
    setTempData((prev) => ({
      ...prev,
      projects: {
        ...prev.projects,
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
      const updatedEntries = [...prev.projects.entries];
      if (editingIndex !== null) {
        updatedEntries[editingIndex] = tempEntry;
      } else {
        updatedEntries.push({ ...tempEntry, id: Date.now().toString() });
      }
      return {
        ...prev,
        projects: {
          ...prev.projects,
          entries: updatedEntries,
        },
      };
    });

    setModalOpen(false);
    setEditingIndex(null);
    setTempEntry({
      id: '',
      title: '',
      skills: [],
      accomplishments: [],
      urls: [],
    });
    setNewAccomplishment('');
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleRemove = (index: number) => {
    setTempData((prev) => ({
      ...prev,
      projects: {
        ...prev.projects,
        entries: prev.projects.entries.filter((_, i) => i !== index),
      },
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };
  const handleSocialChange = (index: number, field: 'label' | 'url', value: string) => {
    setTempEntry((prev) => ({
      ...prev,
      urls: prev.urls.map((social, i) => (i === index ? { ...social, [field]: value } : social)),
    }));
  };

  const handleAddSocial = () => {
    if (!tempEntry.urls.some((url) => url.label === '' && url.url === '')) {
      setTempEntry((prev) => ({
        ...prev,
        urls: [...prev.urls, { label: '', url: '' }],
      }));
    } else {
      toast.error('Please fill in the social label and URL before adding a new one.');
    }
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleRemoveSocial = (index: number) => {
    setTempEntry((prev) => ({
      ...prev,
      urls: prev.urls.filter((_, i) => i !== index),
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleAddAccomplishment = () => {
    if (!newAccomplishment.trim()) return;
    if (tempEntry.accomplishments.includes(newAccomplishment)) {
      toast.error('This accomplishment already exists');
      return;
    }
    setTempEntry((prev) => ({
      ...prev,
      accomplishments: [...prev.accomplishments, newAccomplishment],
    }));
    setNewAccomplishment('');
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleRemoveAccomplishment = (accIndex: number) => {
    setTempEntry((prev) => ({
      ...prev,
      accomplishments: prev.accomplishments.filter((_, i) => i !== accIndex),
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Reorder accomplishments
  const handleReorderAccomplishments = (newOrder: string[]) => {
    setTempEntry((prev) => ({
      ...prev,
      accomplishments: newOrder,
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
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold">
                        {entry.title || 'Untitled Project'}
                      </h3>
                    </div>
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

      {/* Add Project Button */}
      <Dialog
        open={modalOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            // Reset state when closing
            setEditingIndex(null);
            setTempEntry({
              id: '',
              title: '',
              skills: [],
              accomplishments: [],
              urls: [],
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
                title: '',
                skills: [],
                accomplishments: [],
                urls: [],
              });
              setModalOpen(true);
            }}
          >
            Add Project
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingIndex !== null ? 'Edit Project' : 'Add Project'}</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            value={tempEntry.title}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Project Title"
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
            placeholder="Project Skills"
          />

          <div className="space-y-2">
            <p className="font-semibold">Urls</p>
            <div className="flex flex-wrap gap-2 w-full">
              {tempEntry.urls?.map((social, index) => (
                <div
                  key={index}
                  className="flex w-full flex-col sm:flex-row items-start sm:items-center gap-2"
                >
                  <input
                    type="text"
                    value={social.label}
                    onChange={(e) => handleSocialChange(index, 'label', e.target.value)}
                    placeholder="Social Label"
                    className="w-full sm:w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-gray-200"
                  />
                  <input
                    type="text"
                    value={social.url}
                    onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                    placeholder="Social URL"
                    className="w-full sm:w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-gray-200"
                  />
                  <button
                    onClick={() => handleRemoveSocial(index)}
                    className="self-end sm:self-auto text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <div className="flex w-full flex-col sm:flex-row items-start sm:items-center gap-2">
                <input
                  type="text"
                  value={newSocialName}
                  onChange={(e) => setNewSocialName(e.target.value)}
                  placeholder="New Social Name"
                  className="w-full sm:flex-1 rounded-md border border-gray-300 p-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-gray-200"
                />
                <input
                  type="text"
                  value={newSocialUrl}
                  onChange={(e) => setNewSocialUrl(e.target.value)}
                  placeholder="New Social URL"
                  className="w-full sm:flex-1 rounded-md border border-gray-300 p-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-gray-200"
                />
                <button
                  onClick={handleAddSocial}
                  className="self-end sm:self-auto text-green-500 hover:text-green-700"
                >
                  <Check size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Accomplishments Section */}
          <div className="space-y-2">
            <p className="font-semibold">Accomplishments</p>
            <Reorder.Group
              axis="y"
              values={tempEntry.accomplishments}
              onReorder={handleReorderAccomplishments}
              className="space-y-2"
            >
              {tempEntry.accomplishments.map((acc, i) => (
                <Reorder.Item key={acc} value={acc}>
                  <div className="flex items-center gap-2 rounded-md border border-gray-300 bg-gray-50 p-2">
                    <GripVertical size={16} className="cursor-grab text-gray-400" />
                    <span className="flex-1 text-sm">{acc}</span>
                    <button
                      onClick={() => handleRemoveAccomplishment(i)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={newAccomplishment}
                onChange={(e) => setNewAccomplishment(e.target.value)}
                placeholder="Add an accomplishment"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddAccomplishment();
                  }
                }}
              />
              <Button onClick={handleAddAccomplishment} className="bg-green-500 text-white">
                Add
              </Button>
            </div>
          </div>

          <Button onClick={handleSave} className="bg-green-500 text-white">
            {t('common.save')}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsSection;
