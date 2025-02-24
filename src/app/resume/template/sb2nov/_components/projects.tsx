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

interface ProjectsProps {
  data: Sb2novResumeData['projects'];
  setTempData: React.Dispatch<React.SetStateAction<Sb2novResumeData>>;
}

const ProjectsSection = ({ data, setTempData }: ProjectsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempEntry, setTempEntry] = useState<{
    id: string;
    title: string;
    url: string;
    urlLabel: string;
    accomplishments: string[];
  }>({
    id: '',
    title: '',
    url: '',
    urlLabel: '',
    accomplishments: [],
  });
  const [newAccomplishment, setNewAccomplishment] = useState('');

  // Handle reordering projects
  const handleReorder = (newOrder: Sb2novResumeData['projects']) => {
    setTempData((prev) => ({ ...prev, projects: newOrder }));
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
      url: '',
      urlLabel: '',
      accomplishments: [],
    });
  };

  // Remove a project entry
  const handleRemove = (index: number) => {
    setTempData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  // Add an accomplishment
  const handleAddAccomplishment = () => {
    if (!newAccomplishment.trim()) return;
    setTempEntry((prev) => ({
      ...prev,
      accomplishments: [...prev.accomplishments, newAccomplishment],
    }));
    setNewAccomplishment('');
  };

  // Remove an accomplishment
  const handleRemoveAccomplishment = (accIndex: number) => {
    setTempEntry((prev) => ({
      ...prev,
      accomplishments: prev.accomplishments.filter((_, i) => i !== accIndex),
    }));
  };

  return (
    <div className="space-y-4">
      {/* Reorderable Projects List */}
      <Reorder.Group values={data} onReorder={handleReorder} className="space-y-3">
        {data.map((entry, index) => (
          <Reorder.Item key={entry.id} value={entry}>
            <Card className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-semibold">{entry.title || 'Untitled Project'}</h3>
                <p className="text-sm text-gray-500">{entry.urlLabel || 'No URL Label'}</p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleOpenModal(index)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleRemove(index)}>
                  Delete
                </Button>
              </div>
            </Card>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Add Project Button */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setEditingIndex(null);
              setTempEntry({
                id: '',
                title: '',
                url: '',
                urlLabel: '',
                accomplishments: [],
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
            value={tempEntry.url}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, url: e.target.value }))}
            placeholder="Project URL"
          />
          <Input
            type="text"
            value={tempEntry.urlLabel}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, urlLabel: e.target.value }))}
            placeholder="URL Label"
          />

          {/* Accomplishments Section */}
          <div className="space-y-2">
            <p className="font-semibold">Accomplishments</p>
            <div className="flex flex-wrap gap-2">
              {tempEntry.accomplishments.map((acc, i) => (
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

export default ProjectsSection;
