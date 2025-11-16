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
import { MTeckResumeData } from '@/lib/templates/mteck';
import { Reorder } from 'framer-motion';
import { GripVertical, Pencil, Trash, X } from 'lucide-react';
import { useState } from 'react';

interface ProjectsProps {
  data: MTeckResumeData['projects'];
  setTempData: React.Dispatch<React.SetStateAction<MTeckResumeData>>;
  setIsChangesSaved?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DetailItem {
  id: string;
  text: string;
}

const ProjectsSection = ({ data, setTempData, setIsChangesSaved }: ProjectsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempEntry, setTempEntry] = useState<{
    id: string;
    title: string;
    duration: string;
    details: DetailItem[];
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
    const project = data[index];
    setTempEntry({
      ...project,
      details: project.details.map((detail) => ({
        id: Date.now().toString() + Math.random(),
        text: detail,
      })),
    });
    setModalOpen(true);
  };

  // Save project changes
  const handleSave = () => {
    setTempData((prev) => {
      const updatedProjects = [...prev.projects];
      const projectToSave = {
        ...tempEntry,
        details: tempEntry.details.map((d) => d.text),
      };
      if (editingIndex !== null) {
        updatedProjects[editingIndex] = projectToSave;
      } else {
        updatedProjects.push({ ...projectToSave, id: Date.now().toString() });
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
      details: [...prev.details, { id: Date.now().toString() + Math.random(), text: newDetail }],
    }));
    setNewDetail('');
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Remove a detail
  const handleRemoveDetail = (detailValue: string) => {
    setTempEntry((prev) => ({
      ...prev,
      details: prev.details.filter((d) => d !== detailValue),
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Reorder details
  const handleReorderDetails = (newOrder: DetailItem[]) => {
    setTempEntry((prev) => ({
      ...prev,
      details: newOrder,
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

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {entry.duration || 'No Duration Provided'}
                  </p>

                  {entry.details.length > 0 && (
                    <ul className="mt-1 list-inside list-disc text-sm text-gray-700 dark:text-gray-300">
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
            <Reorder.Group
              axis="y"
              values={tempEntry.details}
              onReorder={handleReorderDetails}
              className="space-y-2"
            >
              {tempEntry.details.map((detail, i) => (
                <Reorder.Item key={detail.id} value={detail}>
                  <div className="flex items-center gap-2 rounded-md border border-gray-300 bg-gray-50 p-2">
                    <GripVertical size={16} className="cursor-grab text-gray-400" />
                    <span className="flex-1 text-sm">{detail.text}</span>
                    <button
                      onClick={() => handleRemoveDetail(detail)}
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
                value={newDetail}
                onChange={(e) => setNewDetail(e.target.value)}
                placeholder="Add a detail"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddDetail();
                  }
                }}
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
