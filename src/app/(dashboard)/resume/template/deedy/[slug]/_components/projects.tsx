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
import { GripVertical, X } from 'lucide-react';
import { Pencil, Trash } from 'lucide-react';

interface ProjectsProps {
  data: deedyResumeData['projects'];
  setTempData: React.Dispatch<React.SetStateAction<deedyResumeData>>;
  setIsChangesSaved?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectsSection = ({ data, setTempData, setIsChangesSaved }: ProjectsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempEntry, setTempEntry] = useState<{
    id: string;
    title: string;
    tools: string[];
    duration: string;
    link: string;
    highlights: string[];
  }>({
    id: '',
    title: '',
    tools: [],
    duration: '',
    link: '',
    highlights: [],
  });

  const [newTool, setNewTool] = useState('');
  const [newHighlight, setNewHighlight] = useState('');

  // Handle reordering projects
  const handleReorder = (newOrder: deedyResumeData['projects']) => {
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
      tools: [],
      duration: '',
      link: '',
      highlights: [],
    });
    setNewTool('');
    setNewHighlight('');
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Remove a project entry
  const handleRemove = (index: number) => {
    setTempData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  // Add a tool
  const handleAddTool = () => {
    if (!newTool.trim()) return;
    setTempEntry((prev) => ({
      ...prev,
      tools: [...prev.tools, newTool],
    }));
    setNewTool('');
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Remove a tool
  const handleRemoveTool = (toolIndex: number) => {
    setTempEntry((prev) => ({
      ...prev,
      tools: prev.tools.filter((_, i) => i !== toolIndex),
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Add a highlight
  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    setTempEntry((prev) => ({
      ...prev,
      highlights: [...prev.highlights, newHighlight],
    }));
    setNewHighlight('');
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Remove a highlight
  const handleRemoveHighlight = (highlightIndex: number) => {
    setTempEntry((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== highlightIndex),
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
              <div className="flex w-full gap-3">
                <GripVertical size={20} className="mt-1 cursor-grab opacity-65" />

                <div className="w-full space-y-2">
                  <h3 className="text-base font-bold">{entry.title || 'Untitled Project'}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {entry.duration || 'No Duration Provided'}
                  </p>

                  {entry.tools.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {entry.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}

                  {entry.highlights.length > 0 && (
                    <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      {entry.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  )}

                  {entry.link && (
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View Project
                    </a>
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
              tools: [],
              duration: '',
              link: '',
              highlights: [],
            });
            setNewTool('');
            setNewHighlight('');
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
                tools: [],
                duration: '',
                link: '',
                highlights: [],
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
          <Input
            type="text"
            value={tempEntry.link}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, link: e.target.value }))}
            placeholder="Project Link"
          />

          <div className="space-y-2">
            <p className="font-semibold">Tools</p>
            <div className="flex flex-wrap gap-2">
              {tempEntry.tools.map((tool, i) => (
                <span key={i} className="flex items-center rounded-md bg-gray-200 px-2 py-1">
                  {tool}
                  <button onClick={() => handleRemoveTool(i)} className="ml-2 text-red-500">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={newTool}
                onChange={(e) => setNewTool(e.target.value)}
                placeholder="Add a tool"
              />
              <Button onClick={handleAddTool} className="bg-green-500 text-white">
                Add
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">Highlights</p>
            <div className="flex flex-wrap gap-2">
              {tempEntry.highlights.map((highlight, i) => (
                <span key={i} className="flex items-center rounded-md bg-gray-200 px-2 py-1">
                  {highlight}
                  <button onClick={() => handleRemoveHighlight(i)} className="ml-2 text-red-500">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                placeholder="Add a highlight"
              />
              <Button onClick={handleAddHighlight} className="bg-green-500 text-white">
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
