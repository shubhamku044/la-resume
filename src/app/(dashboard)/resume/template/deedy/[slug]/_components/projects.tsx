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
  const handleRemoveTool = (toolValue: string) => {
    setTempEntry((prev) => ({
      ...prev,
      tools: prev.tools.filter((t) => t !== toolValue),
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
  const handleRemoveHighlight = (highlightValue: string) => {
    setTempEntry((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((h) => h !== highlightValue),
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Reorder tools
  const handleReorderTools = (newOrder: string[]) => {
    setTempEntry((prev) => ({
      ...prev,
      tools: newOrder,
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Reorder highlights
  const handleReorderHighlights = (newOrder: string[]) => {
    setTempEntry((prev) => ({
      ...prev,
      highlights: newOrder,
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
            <Reorder.Group
              axis="y"
              values={tempEntry.tools}
              onReorder={handleReorderTools}
              className="space-y-2"
            >
              {tempEntry.tools.map((tool) => (
                <Reorder.Item key={tool} value={tool}>
                  <div className="flex items-center gap-2 rounded-md border border-gray-300 bg-gray-50 p-2">
                    <GripVertical size={16} className="cursor-grab text-gray-400" />
                    <span className="flex-1 text-sm">{tool}</span>
                    <button
                      onClick={() => handleRemoveTool(tool)}
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
                value={newTool}
                onChange={(e) => setNewTool(e.target.value)}
                placeholder="Add a tool"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTool();
                  }
                }}
              />
              <Button onClick={handleAddTool} className="bg-green-500 text-white">
                Add
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">Highlights</p>
            <Reorder.Group
              axis="y"
              values={tempEntry.highlights}
              onReorder={handleReorderHighlights}
              className="space-y-2"
            >
              {tempEntry.highlights.map((highlight) => (
                <Reorder.Item key={highlight} value={highlight}>
                  <div className="flex items-center gap-2 rounded-md border border-gray-300 bg-gray-50 p-2">
                    <GripVertical size={16} className="cursor-grab text-gray-400" />
                    <span className="flex-1 text-sm">{highlight}</span>
                    <button
                      onClick={() => handleRemoveHighlight(highlight)}
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
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                placeholder="Add a highlight"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddHighlight();
                  }
                }}
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
