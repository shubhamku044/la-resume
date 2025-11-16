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
import { deedyResumeData } from '@/lib/templates/deedy';
import { Reorder } from 'framer-motion';
import { GripVertical, Pencil, Trash, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ExperienceProps {
  data: deedyResumeData['experience'];
  setTempData: React.Dispatch<React.SetStateAction<deedyResumeData>>;
  setIsChangesSaved?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExperienceSection = ({ data, setTempData, setIsChangesSaved }: ExperienceProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempEntry, setTempEntry] = useState<{
    id: string;
    company: string;
    location: string;
    role: string;
    duration: string;
    achievements: string[];
    website?: string;
  }>({
    id: '',
    company: '',
    location: '',
    role: '',
    duration: '',
    achievements: [],
    website: '',
  });

  const [newAchievement, setNewAchievement] = useState('');

  // Handle reordering experiences
  const handleReorder = (newOrder: deedyResumeData['experience']) => {
    setTempData((prev) => ({ ...prev, experience: newOrder }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Open modal for editing
  const handleOpenModal = (index: number) => {
    setEditingIndex(index);
    setTempEntry(data[index]);
    setModalOpen(true);
  };

  // Save experience changes
  const handleSave = () => {
    setTempData((prev) => {
      const updatedExperience = [...prev.experience];
      if (editingIndex !== null) {
        updatedExperience[editingIndex] = tempEntry;
      } else {
        updatedExperience.push({ ...tempEntry, id: Date.now().toString() });
      }
      return { ...prev, experience: updatedExperience };
    });

    setModalOpen(false);
    setEditingIndex(null);
    setTempEntry({
      id: '',
      company: '',
      location: '',
      role: '',
      duration: '',
      achievements: [],
      website: '',
    });
    setNewAchievement('');
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Remove an experience entry
  const handleRemove = (index: number) => {
    setTempData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Add an achievement
  const handleAddAchievement = () => {
    if (!newAchievement.trim()) return;
    if (tempEntry.achievements.includes(newAchievement)) {
      toast.error('This achievement already exists');
      return;
    }
    setTempEntry((prev) => ({
      ...prev,
      achievements: [...prev.achievements, newAchievement],
    }));
    setNewAchievement('');
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Remove an achievement
  const handleRemoveAchievement = (achievementIndex: number) => {
    setTempEntry((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== achievementIndex),
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Reorder achievements
  const handleReorderAchievements = (newOrder: string[]) => {
    setTempEntry((prev) => ({
      ...prev,
      achievements: newOrder,
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  return (
    <div className="space-y-4">
      {/* Reorderable Experience List */}
      <Reorder.Group values={data} onReorder={handleReorder} className="space-y-3">
        {data.map((entry, index) => (
          <Reorder.Item key={entry.id} value={entry}>
            <Card className="flex justify-between rounded-lg border border-gray-300 p-4 shadow-sm">
              <div className="flex w-full gap-3">
                <GripVertical size={20} className="mt-1 cursor-grab opacity-65" />

                <div className="w-full space-y-2">
                  <h3 className="text-base font-bold">{entry.company || 'Untitled Company'}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {entry.role || 'No Role Specified'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {entry.duration || 'No Duration Provided'}
                  </p>

                  {entry.achievements.length > 0 && (
                    <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      {entry.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  )}

                  {entry.website && (
                    <a
                      href={entry.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View Website
                    </a>
                  )}
                </div>
              </div>

              {/* Right Section: Edit & Delete */}
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

      {/* Add Experience Button */}
      <Dialog
        open={modalOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setEditingIndex(null);
            setTempEntry({
              id: '',
              company: '',
              location: '',
              role: '',
              duration: '',
              achievements: [],
              website: '',
            });
            setNewAchievement('');
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
                location: '',
                role: '',
                duration: '',
                achievements: [],
                website: '',
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
            value={tempEntry.location}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, location: e.target.value }))}
            placeholder="Location"
          />
          <Input
            type="text"
            value={tempEntry.role}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, role: e.target.value }))}
            placeholder="Role"
          />
          <Input
            type="text"
            value={tempEntry.duration}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, duration: e.target.value }))}
            placeholder="Duration (e.g., Jan 2020 - Dec 2022)"
          />
          <Input
            type="text"
            value={tempEntry.website || ''}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, website: e.target.value }))}
            placeholder="Website (optional)"
          />

          {/* Achievements Section */}
          <div className="space-y-2">
            <p className="font-semibold">Achievements</p>
            <Reorder.Group
              axis="y"
              values={tempEntry.achievements}
              onReorder={handleReorderAchievements}
              className="space-y-2"
            >
              {tempEntry.achievements.map((achievement, i) => (
                <Reorder.Item key={achievement} value={achievement}>
                  <div className="flex items-center gap-2 rounded-md border border-gray-300 bg-gray-50 p-2">
                    <GripVertical size={16} className="cursor-grab text-gray-400" />
                    <span className="flex-1 text-sm">{achievement}</span>
                    <button
                      onClick={() => handleRemoveAchievement(i)}
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
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                placeholder="Add an achievement"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddAchievement();
                  }
                }}
              />
              <Button onClick={handleAddAchievement} className="bg-green-500 text-white">
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
