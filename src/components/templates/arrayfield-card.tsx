import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PencilIcon, TrashIcon } from 'lucide-react';

interface ArrayFieldCardProps {
  entry: Record<string, string>;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ArrayFieldCard({ entry, onEdit, onDelete }: ArrayFieldCardProps) {
  const fields = Object.keys(entry);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{entry[fields[1]] || 'Untitled Entry'}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div>
          {fields.slice(1, 3).map((field) => (
            <p key={field} className="text-sm text-muted-foreground">
              {entry[field] || 'No details'}
            </p>
          ))}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <PencilIcon className="size-4" />
          </Button>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            <TrashIcon className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
