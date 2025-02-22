'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Project } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { addProject, updateProject } from '@/store/slices';
import { v4 as uuidv4 } from 'uuid';

type ProjectModalProps = {
  open: boolean;
  onClose: () => void;
  initialData?: Project;
};

export default function ProjectModal({ open, onClose, initialData }: ProjectModalProps) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Project>({
    id: '',
    title: '',
    description: [''],
    technologies: [''],
    link: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData, id: initialData.id });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newDescription = [...formData.description];
    newDescription[index] = value;
    setFormData((prev) => ({
      ...prev,
      description: newDescription,
    }));
  };

  const handleTechnologyChange = (index: number, value: string) => {
    const newTechnologies = [...formData.technologies];
    newTechnologies[index] = value;
    setFormData((prev) => ({
      ...prev,
      technologies: newTechnologies,
    }));
  };

  const addDescription = () => {
    setFormData((prev) => ({
      ...prev,
      description: [...prev.description, ''],
    }));
  };

  const removeDescription = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      description: prev.description.filter((_, i) => i !== index),
    }));
  };

  const addTechnology = () => {
    setFormData((prev) => ({
      ...prev,
      technologies: [...prev.technologies, ''],
    }));
  };

  const removeTechnology = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (initialData) {
      dispatch(updateProject(formData));
    } else {
      dispatch(
        addProject({
          ...formData,
          id: uuidv4(),
        })
      );
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Project' : 'Add Project'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter project title"
            />
          </div>

          <div>
            <Label>Description</Label>
            {formData.description.map((desc, index) => (
              <div key={index} className="mt-2 flex gap-2">
                <Textarea
                  value={desc}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  placeholder={`Description point ${index + 1}`}
                  className="min-h-[100px]"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeDescription(index)}
                  disabled={formData.description.length === 1}
                >
                  ×
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addDescription} className="mt-2">
              Add Description Point
            </Button>
          </div>

          <div>
            <Label>Technologies Used</Label>
            <div className="space-y-2">
              {formData.technologies.map((tech, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={tech}
                    onChange={(e) => handleTechnologyChange(index, e.target.value)}
                    placeholder={`Technology ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeTechnology(index)}
                    disabled={formData.technologies.length === 1}
                  >
                    ×
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addTechnology} className="mt-2">
                Add Technology
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="link">Project Link (Optional)</Label>
            <Input
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="Enter project URL"
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
