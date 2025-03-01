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
import { Pencil, Trash } from 'lucide-react'; // Import icons

interface HonorsAwardsProps {
  data: Sb2novResumeData['honorsAndAwards'];
  setTempData: React.Dispatch<React.SetStateAction<Sb2novResumeData>>;
}

const HonorsAwardsSection = ({ data, setTempData }: HonorsAwardsProps) => {
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

  // Handle reordering
  const handleReorder = (newOrder: Sb2novResumeData['honorsAndAwards']) => {
    setTempData((prev) => ({ ...prev, honorsAndAwards: newOrder }));
  };

  // Open modal for editing
  const handleOpenModal = (index: number | null = null) => {
    setEditingIndex(index);
    if (index !== null) {
      setTempEntry(data[index]); // Load existing entry
    } else {
      setTempEntry({
        id: Date.now().toString(),
        description: '',
        url: '',
        urlLabel: '',
      });
    }
    setModalOpen(true);
  };

  // Save new or updated entry
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
  };

  // Remove an entry
  const handleRemoveEntry = (index: number) => {
    setTempData((prev) => ({
      ...prev,
      honorsAndAwards: prev.honorsAndAwards.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-4">
      {/* Reorderable Honors & Awards List */}
      <Reorder.Group values={data} onReorder={handleReorder} className="space-y-3">
        {data.map((entry, index) => (
          <Reorder.Item key={entry.id} value={entry}>
            <Card className="flex items-start justify-between rounded-lg border border-gray-300 p-5 shadow-sm">
              {/* Left Section: Description & URL */}
              <div className="w-full space-y-2">
                {/* Description */}
                <p className="text-lg text-gray-800">{entry.description || 'No Description'}</p>

                {/* Clickable URL if available */}
                {entry.url && (
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {entry.urlLabel || 'Link'}
                  </a>
                )}
              </div>

              {/* Right Section: Edit & Delete Buttons */}
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

      {/* Add Honors & Awards Button */}
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
