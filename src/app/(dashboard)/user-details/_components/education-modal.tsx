'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/store/hooks';
import { addEducation, updateEducation } from '@/store/slices';
import { Education } from '@/types';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

type EducationModalProps = {
  open: boolean;
  onClose: () => void;
  editEducationId?: string;
  initialData?: Education;
};

const defaultEducation: Education = {
  id: '',
  school: '',
  degree: '',
  fieldOfStudy: '',
  startYear: '',
  endYear: '',
  location: '',
  gpa: 0,
};

export default function EducationModal({ open, onClose, initialData }: EducationModalProps) {
  const dispatch = useAppDispatch();

  // Initialize state directly without effects
  const [formData, setFormData] = useState<Education>(() => initialData || defaultEducation);
  const [startDate, setStartDate] = useState<Date | undefined>(() =>
    initialData?.startYear ? new Date(initialData.startYear) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(() =>
    initialData?.endYear ? new Date(initialData.endYear) : undefined
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    if (date) {
      setFormData((prev) => ({
        ...prev,
        startYear: date.toDateString(),
      }));
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date);
    if (date) {
      setFormData((prev) => ({
        ...prev,
        endYear: date.toDateString(),
      }));
    }
  };

  const handleSubmit = () => {
    if (initialData) {
      dispatch(
        updateEducation({
          ...formData,
          id: initialData.id,
        })
      );
      toast('✅Education updated successfully');
    } else {
      dispatch(
        addEducation({
          ...formData,
          id: uuidv4(),
        })
      );
      toast('✅Education added successfully');
    }
    onClose();
  };

  return (
    <Dialog
      key={initialData?.id || 'new'}
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent aria-describedby="Eduction add">
        <DialogHeader>
          <DialogTitle>Add Education</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="school">School Name</Label>
            <Input
              id="school"
              name="school"
              placeholder="Enter school name"
              value={formData.school}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="degree">Degree</Label>
            <Input
              id="degree"
              name="degree"
              placeholder="Enter degree"
              value={formData.degree}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="fieldOfStudy">Field of Study</Label>
            <Input
              id="fieldOfStudy"
              name="fieldOfStudy"
              placeholder="Enter field of study"
              value={formData.fieldOfStudy}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="Enter location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Start Year</Label>
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
            <Label>End Year</Label>
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
            <Label htmlFor="gpa">GPA (if applicable)</Label>
            <Input
              id="gpa"
              name="gpa"
              type="number"
              placeholder="Enter GPA"
              value={formData.gpa ?? ''}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="percentage">Percentage (if applicable)</Label>
            <Input
              id="percentage"
              name="percentage"
              type="number"
              placeholder="Enter percentage"
              value={formData.percentage ?? ''}
              onChange={handleChange}
            />
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
