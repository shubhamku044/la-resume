'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Experience } from '@/types';
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
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { addExperience, updateExperience } from '@/store/slices';
import { v4 as uuidv4 } from 'uuid';

type ExperienceModalProps = {
  open: boolean;
  onClose: () => void;
  initialData?: Experience;
};

export default function ExperienceModal({ open, onClose, initialData }: ExperienceModalProps) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Experience & { id: string }>({
    id: '',
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    responsibilities: [''],
    location: '',
  });

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData, id: initialData.id });
      setStartDate(new Date(initialData.startDate));
      setEndDate(initialData.endDate ? new Date(initialData.endDate) : undefined);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResponsibilityChange = (index: number, value: string) => {
    const newResponsibilities = [...formData.responsibilities];
    newResponsibilities[index] = value;
    setFormData((prev) => ({
      ...prev,
      responsibilities: newResponsibilities,
    }));
  };

  const addResponsibility = () => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: [...prev.responsibilities, ''],
    }));
  };

  const removeResponsibility = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }));
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    if (date) {
      setFormData((prev) => ({
        ...prev,
        startDate: date.toISOString(),
      }));
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date);
    if (date) {
      setFormData((prev) => ({
        ...prev,
        endDate: date.toISOString(),
      }));
    }
  };

  const handleSubmit = () => {
    if (initialData) {
      dispatch(updateExperience(formData));
    } else {
      dispatch(
        addExperience({
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
          <DialogTitle>{initialData ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="company">Company</Label>
            <Input id="company" name="company" value={formData.company} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Input id="role" name="role" value={formData.role} onChange={handleChange} />
          </div>

          <div>
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !startDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 size-4" />
                  {startDate ? format(startDate, 'PPP') : <span>Pick start date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !endDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 size-4" />
                  {endDate ? format(endDate, 'PPP') : <span>Pick end date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={handleEndDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Responsibilities</Label>
            {formData.responsibilities.map((responsibility, index) => (
              <div key={index} className="mt-2 flex gap-2">
                <Textarea
                  value={responsibility}
                  onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                  placeholder={`Responsibility ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeResponsibility(index)}
                  disabled={formData.responsibilities.length === 1}
                >
                  ×
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addResponsibility} className="mt-2">
              Add Responsibility
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
