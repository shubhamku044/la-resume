'use client';

import { Experience } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';

interface ExperienceCardProps {
  experience: Experience;
  onEdit: (experience: Experience) => void;
  onDelete: (id: string) => void;
}
function formatDate(dateString?: string) {
  if (!dateString) return 'Present';
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
  });
}
export default function ExperienceCard({ experience, onEdit, onDelete }: ExperienceCardProps) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{experience.company}</h3>
          <p className="text-sm text-muted-foreground">
            {formatDate(experience.startDate)} -{' '}
            {experience.endDate ? formatDate(experience.endDate) : 'Present'}
          </p>
          <p className="text-sm font-medium">{experience.role}</p>
          <p className="text-sm text-muted-foreground">{experience.location}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(experience)} className="size-8">
            <Edit className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(experience.id)}
            className="size-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="list-inside list-disc text-sm text-muted-foreground">
          {experience.responsibilities.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
