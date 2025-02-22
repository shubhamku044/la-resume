import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ExperienceModal } from '../_components';
import { useState } from 'react';

export default function ExperienceSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>
        <h2 className="mb-4 text-xl font-bold">Work Experience</h2>
        <Button onClick={() => setIsOpen(true)}>
          <Plus size={16} className="mr-2 inline" />
          Add Experience
        </Button>
      </div>
      <ExperienceModal open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
