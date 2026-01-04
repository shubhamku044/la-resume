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
import { useState } from 'react';

interface PositionsOfResponsibilityProps {
  data: deedyResumeData['positionsOfResponsibility'];
  setTempData: React.Dispatch<React.SetStateAction<deedyResumeData>>;
  setIsChangesSaved?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PositionsOfResponsibilitySection = ({
  data,
  setTempData,
  setIsChangesSaved,
}: PositionsOfResponsibilityProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempEntry, setTempEntry] = useState<{
    id: string;
    title: string;
    organization: string;
    duration: string;
  }>({
    id: '',
    title: '',
    organization: '',
    duration: '',
  });

  // Handle reordering positions of responsibility
  const handleReorder = (newOrder: deedyResumeData['positionsOfResponsibility']) => {
    setTempData((prev) => ({ ...prev, positionsOfResponsibility: newOrder }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Open modal for editing
  const handleOpenModal = (index: number) => {
    setEditingIndex(index);
    setTempEntry(data[index]);
    setModalOpen(true);
  };

  // Save position of responsibility changes
  const handleSave = () => {
    setTempData((prev) => {
      const updatedPositions = [...prev.positionsOfResponsibility];
      if (editingIndex !== null) {
        updatedPositions[editingIndex] = tempEntry;
      } else {
        updatedPositions.push({ ...tempEntry, id: Date.now().toString() });
      }
      return { ...prev, positionsOfResponsibility: updatedPositions };
    });

    setModalOpen(false);
    setEditingIndex(null);
    setTempEntry({
      id: '',
      title: '',
      organization: '',
      duration: '',
    });
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Remove a position of responsibility entry
  const handleRemove = (index: number) => {
    setTempData((prev) => ({
      ...prev,
      positionsOfResponsibility: prev.positionsOfResponsibility.filter((_, i) => i !== index),
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
                  <h3 className="text-base font-bold">{entry.title || 'Untitled Position'}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {entry.organization || 'No Organization'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {entry.duration || 'No Duration Provided'}
                  </p>
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
              organization: '',
              duration: '',
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
                organization: '',
                duration: '',
              });
              setModalOpen(true);
            }}
          >
            Add Position of Responsibility
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[calc(100vh-10rem)] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingIndex !== null
                ? 'Edit Position of Responsibility'
                : 'Add Position of Responsibility'}
            </DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            value={tempEntry.title}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Position Title"
          />
          <Input
            type="text"
            value={tempEntry.organization}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, organization: e.target.value }))}
            placeholder="Organization"
          />
          <Input
            type="text"
            value={tempEntry.duration}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, duration: e.target.value }))}
            placeholder="Duration (e.g., Jan 2020 - Dec 2022)"
          />
          <Button onClick={handleSave} className="bg-green-500 text-white">
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PositionsOfResponsibilitySection;
