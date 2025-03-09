import { useState } from 'react';
import { Reorder } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { MTeckResumeData } from '@/lib/templates/mteck';
import { Pencil, Trash } from 'lucide-react'; // Import icons

interface SkillsProps {
  data: MTeckResumeData['skills'];
  setTempData: React.Dispatch<React.SetStateAction<MTeckResumeData>>;
}

const SkillsSection = ({ data, setTempData }: SkillsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [tempCategory, setTempCategory] = useState('');
  const [tempSkills, setTempSkills] = useState('');

  // Update skill categories and values
  const updateSkills = (updatedSkills: Record<string, string[]>) => {
    setTempData((prev) => ({ ...prev, skills: updatedSkills }));
  };

  // Handle reordering
  const handleReorder = (newOrder: string[]) => {
    const reorderedSkills = newOrder.reduce(
      (acc, key) => {
        acc[key] = data[key];
        return acc;
      },
      {} as Record<string, string[]>
    );
    updateSkills(reorderedSkills);
  };

  // Open modal for editing
  const handleOpenModal = (category: string) => {
    setEditingCategory(category);
    setTempCategory(category);
    setTempSkills(data[category].join(', '));
    setModalOpen(true);
  };

  // Save edited category
  const handleSaveCategory = () => {
    if (!tempCategory.trim()) return;
    setTempData((prev) => {
      const updatedSkills = { ...prev.skills };
      if (editingCategory !== tempCategory) {
        updatedSkills[tempCategory] = updatedSkills[editingCategory!];
        delete updatedSkills[editingCategory!];
      }
      updatedSkills[tempCategory] = tempSkills.split(', ').filter(Boolean);
      return { ...prev, skills: updatedSkills };
    });
    setModalOpen(false);
  };

  // Remove a category
  const handleRemoveCategory = (category: string) => {
    setTempData((prev) => {
      const updatedSkills = { ...prev.skills };
      delete updatedSkills[category];
      return { ...prev, skills: updatedSkills };
    });
  };

  // Add a new category
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = () => {
    if (!newCategoryName.trim() || data[newCategoryName]) return;
    setTempData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [newCategoryName]: [] },
    }));
    setNewCategoryName('');
    setAddModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Skill Categories with Reordering */}
      <Reorder.Group values={Object.keys(data)} onReorder={handleReorder} className="space-y-3">
        {Object.keys(data).map((category) => (
          <Reorder.Item key={category} value={category}>
            <Card className="flex items-center justify-between p-4">
              <div>
                <h3 className="text-xl font-semibold">{category}</h3>
                <p className="text-lg text-gray-500">{data[category].join(', ')}</p>
              </div>
              <div className="flex space-x-2">
                <Button size="icon" variant="outline" onClick={() => handleOpenModal(category)}>
                  <Pencil size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleRemoveCategory(category)}
                >
                  <Trash size={16} />
                </Button>
              </div>
            </Card>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Add Category Button */}
      {/* Add Category Modal */}
      <Dialog
        open={addModalOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setNewCategoryName('');
          }
          setAddModalOpen(isOpen);
        }}
      >
        <DialogTrigger asChild>
          <Button>Add New Category</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            placeholder="Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <Button onClick={handleAddCategory} className="bg-green-500 text-white">
            Add
          </Button>
        </DialogContent>
      </Dialog>

      {/* Edit Category Modal */}
      <Dialog
        open={modalOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setEditingCategory(null);
            setTempCategory('');
            setTempSkills('');
          }
          setModalOpen(isOpen);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            value={tempCategory}
            onChange={(e) => setTempCategory(e.target.value)}
            placeholder="Category Name"
          />
          <Input
            type="text"
            value={tempSkills}
            onChange={(e) => setTempSkills(e.target.value)}
            placeholder="Skills (comma-separated)"
          />
          <Button onClick={handleSaveCategory} className="bg-blue-500 text-white">
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SkillsSection;
