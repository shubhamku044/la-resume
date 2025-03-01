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
import { Pencil, Trash } from 'lucide-react'; // Import icons

interface AchievementsProps {
  data: deedyResumeData['achievements'];
  setTempData: React.Dispatch<React.SetStateAction<deedyResumeData>>;
}

const AchievementsSection = ({ data, setTempData }: AchievementsProps) => {
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

  // Handle reordering achievements
  const handleReorder = (newOrder: deedyResumeData['achievements']) => {
    setTempData((prev) => ({ ...prev, achievements: newOrder }));
  };

  // Open modal for editing
  const handleOpenModal = (index: number) => {
    setEditingIndex(index);
    setTempEntry(data[index]);
    setModalOpen(true);
  };

  // Save achievement changes
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
  };

  // Remove an achievement entry
  const handleRemove = (index: number) => {
    setTempData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-4">
      {/* Reorderable Achievements List */}
      <Reorder.Group values={data} onReorder={handleReorder} className="space-y-3">
        {data.map((entry, index) => (
          <Reorder.Item key={entry.id} value={entry}>
            <Card className="flex items-center justify-between p-4">
              <div>
                <h3 className="text-xl font-semibold">{entry.title || 'Untitled Achievement'}</h3>
                {entry.link && (
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Achievement
                  </a>
                )}
              </div>
              <div className="flex space-x-2">
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

      {/* Add Achievement Button */}
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
