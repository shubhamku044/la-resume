import { useState } from 'react';
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
import { Reorder } from 'framer-motion';
import { Sb2novResumeData } from '@/lib/templates/sb2nov';
import { GripVertical, Pencil, Trash } from 'lucide-react';

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

  const handleReorder = (newOrder: Sb2novResumeData['honorsAndAwards']) => {
    setTempData((prev) => ({ ...prev, honorsAndAwards: newOrder }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleOpenModal = (index: number | null = null) => {
    setEditingIndex(index);
    if (index !== null) {
      setTempEntry(data[index]);
    } else {
      setTempEntry({
        id: Date.now().toString(),
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
      const updatedHonors = [...prev.honorsAndAwards];
      if (editingIndex !== null) {
        updatedHonors[editingIndex] = tempEntry;
      } else {
        updatedHonors.push(tempEntry);
      }
      return { ...prev, honorsAndAwards: updatedHonors };
    });
    setModalOpen(false);
    setEditingIndex(null);
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  const handleRemoveEntry = (index: number) => {
    setTempData((prev) => ({
      ...prev,
      honorsAndAwards: prev.honorsAndAwards.filter((_, i) => i !== index),
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  return (
    <div className="space-y-4">
      <Reorder.Group values={data} onReorder={handleReorder} className="space-y-3">
        {data.map((entry, index) => (
          <Reorder.Item key={entry.id} value={entry}>
            <Card className="flex items-start justify-between rounded-lg border border-gray-300 p-5 shadow-sm">
              <div className="flex gap-2">
                <GripVertical size={20} className="mt-1 cursor-grab opacity-65" />
                <div className="w-full space-y-2">
                  <p className="text-base text-gray-800">{entry.description || 'No Description'}</p>
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
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HonorsAwardsSection;
