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
import { GripVertical, X } from 'lucide-react';
import { Pencil, Trash } from 'lucide-react';
import { MTeckResumeData } from '@/lib/templates/mteck';

interface ProjectsProps {
  data: MTeckResumeData['projects'];
  setTempData: React.Dispatch<React.SetStateAction<MTeckResumeData>>;
  setIsChangesSaved?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectsSection = ({ data, setTempData, setIsChangesSaved }: ProjectsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempEntry, setTempEntry] = useState<{
    id: string;
    title: string;
    duration: string;
    details: string[];
  }>({
    id: '',
    title: '',
    duration: '',
    details: [],
  });

  const [newDetail, setNewDetail] = useState('');

  // Handle reordering projects
  const handleReorder = (newOrder: typeof data) => {
    setTempData((prev) => ({ ...prev, projects: newOrder }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Open modal for editing
  const handleOpenModal = (index: number) => {
    setEditingIndex(index);
    setTempEntry(data[index]);
    setModalOpen(true);
  };

  // Save project changes
  const handleSave = () => {
    setTempData((prev) => {
      const updatedProjects = [...prev.projects];
      if (editingIndex !== null) {
        updatedProjects[editingIndex] = tempEntry;
      } else {
        updatedProjects.push({ ...tempEntry, id: Date.now().toString() });
      }
      return { ...prev, projects: updatedProjects };
    });

    setModalOpen(false);
    setEditingIndex(null);
    setTempEntry({
      id: '',
      title: '',
      duration: '',
      details: [],
    });
    setNewDetail('');
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Remove a project entry
  const handleRemove = (index: number) => {
    setTempData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Add a detail
  const handleAddDetail = () => {
    if (!newDetail.trim()) return;
    setTempEntry((prev) => ({
      ...prev,
      details: [...prev.details, newDetail],
    }));
    setNewDetail('');
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Remove a detail
  const handleRemoveDetail = (detailIndex: number) => {
    setTempEntry((prev) => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== detailIndex),
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  return (
    <div className="space-y-4">
      {/* Reorderable Projects List */}
      <Reorder.Group values={data} onReorder={handleReorder} className="space-y-3">
        {data.map((entry, index) => (
          <Reorder.Item key={entry.id} value={entry}>
            <Card className="flex justify-between rounded-lg border border-gray-300 p-4 shadow-sm">
              <div className="flex gap-2">
                <GripVertical size={20} className="mt-1 cursor-grab opacity-65" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold">{entry.title || 'Untitled Project'}</h3>

                  <p className="text-sm text-gray-500">
                    {entry.duration || 'No Duration Provided'}
                  </p>

                  {entry.details.length > 0 && (
                    <ul className="mt-1 list-inside list-disc text-sm text-gray-700">
                      {entry.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
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
              duration: '',
              details: [],
            });
            setNewDetail('');
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
                duration: '',
                details: [],
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
            value={tempEntry.duration}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, duration: e.target.value }))}
            placeholder="Duration (e.g., Jan 2020 - Dec 2022)"
          />

          {/* Details Section */}
          <div className="space-y-2">
            <p className="font-semibold">Details</p>
            <div className="flex flex-wrap gap-2">
              {tempEntry.details.map((detail, i) => (
                <span key={i} className="flex items-center rounded-md bg-gray-200 px-2 py-1">
                  {detail}
                  <button onClick={() => handleRemoveDetail(i)} className="ml-2 text-red-500">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={newDetail}
                onChange={(e) => setNewDetail(e.target.value)}
                placeholder="Add a detail"
              />
              <Button onClick={handleAddDetail} className="bg-green-500 text-white">
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

export default ProjectsSection;
