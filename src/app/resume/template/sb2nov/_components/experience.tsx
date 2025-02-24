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
import { Sb2novResumeData } from '@/lib/templates/sb2nov';
import { X } from 'lucide-react';
import { Pencil, Trash } from 'lucide-react';

interface ExperienceProps {
  data: Sb2novResumeData['experience'];
  setTempData: React.Dispatch<React.SetStateAction<Sb2novResumeData>>;
}

const ExperienceSection = ({ data, setTempData }: ExperienceProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempEntry, setTempEntry] = useState<{
    id: string;
    title: string;
    date: string;
    accomplishments: string[];
  }>({
    id: '',
    title: '',
    date: '',
    accomplishments: [],
  });

  const [newAccomplishment, setNewAccomplishment] = useState('');

  // Handle reordering experiences
  const handleReorder = (newOrder: Sb2novResumeData['experience']) => {
    setTempData((prev) => ({ ...prev, experience: newOrder }));
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
    setTempEntry({ id: '', title: '', date: '', accomplishments: [] });
  };

  // Remove an experience entry
  const handleRemove = (index: number) => {
    setTempData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  // Add an accomplishment
  const handleAddAccomplishment = () => {
    if (!newAccomplishment.trim()) return;
    setTempEntry((prev) => ({
      ...prev,
      accomplishments: [...(prev.accomplishments as string[]), newAccomplishment],
    }));
    setNewAccomplishment('');
  };

  // Remove an accomplishment
  const handleRemoveAccomplishment = (accIndex: number) => {
    setTempEntry((prev) => ({
      ...prev,
      accomplishments: (prev.accomplishments as string[]).filter((_, i) => i !== accIndex),
    }));
  };

  return (
    <div className="space-y-4">
      {/* Reorderable Experience List */}
      <Reorder.Group values={data} onReorder={handleReorder} className="space-y-3">
        {data.map((entry, index) => (
          <Reorder.Item key={entry.id} value={entry}>
            <Card className="rounded-lg border border-gray-300 p-5 shadow-sm">
              <div className="flex items-start justify-between">
                {/* Left Section: Title & Accomplishments */}
                <div className="w-full space-y-2">
                  <h3 className="text-lg font-semibold">
                    {entry.title || 'Untitled Accomplishment'}
                  </h3>
                  <p className="text-lg text-gray-500">{entry.date || 'No Date Provided'}</p>

                  {/* Display all accomplishment points nicely */}
                  {entry.accomplishments && entry.accomplishments.length > 0 && (
                    <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700">
                      {entry.accomplishments.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Right Section: Edit & Delete Buttons */}
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

      {/* Add Experience Button */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setEditingIndex(null);
              setTempEntry({ id: '', title: '', date: '', accomplishments: [] });
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
            value={tempEntry.title}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Job Title / Role"
          />
          <Input
            type="text"
            value={tempEntry.date}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, date: e.target.value }))}
            placeholder="Date (e.g., 2021-2023)"
          />

          {/* Accomplishments Section */}
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
