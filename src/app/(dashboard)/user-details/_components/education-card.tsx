'use client';

import { Education } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';

interface EducationCardProps {
  education: Education;
  onEdit: (education: Education) => void;
  onDelete: (id: string) => void;
}

export default function EducationCard({ education, onEdit, onDelete }: EducationCardProps) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{education.school}</h3>
          <p className="text-sm text-muted-foreground">
            {education.startYear} - {education.endYear}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(education)} className="size-8">
            <Edit className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(education.id)}
            className="size-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex flex-col">
            <span className="font-medium">{education.degree}</span>
            <span className="text-sm text-muted-foreground">{education.fieldOfStudy}</span>
          </div>
          <p className="text-sm">{education.location}</p>
          {education.gpa !== undefined && <p className="text-sm">GPA: {education.gpa}</p>}
          {education.percentage !== undefined && (
            <p className="text-sm">Percentage: {education.percentage}%</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
