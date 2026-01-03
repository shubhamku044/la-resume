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
import { GripVertical, Pencil, Trash } from 'lucide-react'; // Import icons
import Link from 'next/link';
import { useState } from 'react';

interface AchievementsProps {
  data: deedyResumeData['achievements'];
  setTempData: React.Dispatch<React.SetStateAction<deedyResumeData>>;
  setIsChangesSaved?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AchievementsSection = ({ data, setTempData, setIsChangesSaved }: AchievementsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempEntry, setTempEntry] = useState<{
    id: string;
    title: string;
    link?: string;
  }>({
    id: '',
    title: '',
    link: '',
  });

  const handleReorder = (newOrder: deedyResumeData['achievements']) => {
    setTempData((prev) => ({ ...prev, achievements: newOrder }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleOpenModal = (index: number) => {
    setEditingIndex(index);
    setTempEntry(data[index]);
    setModalOpen(true);
  };

  const handleSave = () => {
    setTempData((prev) => {
      const updatedAchievements = [...prev.achievements];
      if (editingIndex !== null) {
        updatedAchievements[editingIndex] = tempEntry;
      } else {
        updatedAchievements.push({ ...tempEntry, id: Date.now().toString() });
      }
      return { ...prev, achievements: updatedAchievements };
    });

    setModalOpen(false);
    setEditingIndex(null);
    setTempEntry({
      id: '',
      title: '',
      link: '',
    });
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleRemove = (index: number) => {
    setTempData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  return (
    <div className="space-y-4">
      <Reorder.Group values={data} onReorder={handleReorder} className="space-y-3">
        {data.map((entry, index) => (
          <Reorder.Item key={entry.id} value={entry}>
            <Card className="flex justify-between rounded-lg border border-gray-300 p-4 shadow-sm">
              <div className="flex w-full gap-3">
                <GripVertical size={20} className="mt-1 cursor-grab opacity-65" />

                <div className="space-y-2">
                  <h3 className="text-base font-bold">{entry.title || 'Untitled Achievement'}</h3>
                  {entry.link && (
                    <Link
                      href={entry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View Achievement
                    </Link>
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
              title: '',
              link: '',
            });
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
                link: '',
              });
              setModalOpen(true);
            }}
          >
            Add Achievement
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingIndex !== null ? 'Edit Achievement' : 'Add Achievement'}
            </DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            value={tempEntry.title}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Achievement Title"
          />
          <Input
            type="text"
            value={tempEntry.link || ''}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, link: e.target.value }))}
            placeholder="Achievement Link (optional)"
          />
          <Button onClick={handleSave}>Save</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AchievementsSection;
