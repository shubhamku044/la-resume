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
import { deedyResumeData } from '@/lib/templates/deedy';
import { GripVertical, Pencil, Trash } from 'lucide-react'; // Import icons

interface CertificationsProps {
  data: deedyResumeData['certifications'];
  setTempData: React.Dispatch<React.SetStateAction<deedyResumeData>>;
  setIsChangesSaved?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CertificationsSection = ({ data, setTempData, setIsChangesSaved }: CertificationsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempEntry, setTempEntry] = useState<{
    id: string;
    name: string;
    issuingOrganization: string;
    link?: string;
    date: string;
  }>({
    id: '',
    name: '',
    issuingOrganization: '',
    link: '',
    date: '',
  });

  // Handle reordering certifications
  const handleReorder = (newOrder: deedyResumeData['certifications']) => {
    setTempData((prev) => ({ ...prev, certifications: newOrder }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Open modal for editing
  const handleOpenModal = (index: number) => {
    setEditingIndex(index);
    setTempEntry(data[index]);
    setModalOpen(true);
  };

  // Save certification changes
  const handleSave = () => {
    setTempData((prev) => {
      const updatedCertifications = [...prev.certifications];
      if (editingIndex !== null) {
        updatedCertifications[editingIndex] = tempEntry;
      } else {
        updatedCertifications.push({ ...tempEntry, id: Date.now().toString() });
      }
      return { ...prev, certifications: updatedCertifications };
    });

    setModalOpen(false);
    setEditingIndex(null);
    setTempEntry({
      id: '',
      name: '',
      issuingOrganization: '',
      link: '',
      date: '',
    });
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Remove a certification entry
  const handleRemove = (index: number) => {
    setTempData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  return (
    <div className="space-y-4">
      <Reorder.Group values={data} onReorder={handleReorder} className="space-y-3">
        {data.map((entry, index) => (
          <Reorder.Item key={entry.id} value={entry}>
            <Card className="flex justify-between rounded-lg border border-gray-300 p-4 shadow-sm">
              <div className="flex w-full gap-3">
                <GripVertical size={20} className="mt-1 cursor-grab opacity-65" />

                <div className="space-y-2">
                  <h3 className="text-base font-bold">{entry.name || 'Untitled Certification'}</h3>
                  <p className="text-sm text-gray-600">
                    {entry.issuingOrganization || 'No Organization'}
                  </p>
                  <p className="text-sm text-gray-500">{entry.date || 'No Date Provided'}</p>

                  {entry.link && (
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View Certification
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
              name: '',
              issuingOrganization: '',
              link: '',
              date: '',
            });
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
                name: '',
                issuingOrganization: '',
                link: '',
                date: '',
              });
              setModalOpen(true);
            }}
          >
            Add Certification
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingIndex !== null ? 'Edit Certification' : 'Add Certification'}
            </DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            value={tempEntry.name}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Certification Name"
          />
          <Input
            type="text"
            value={tempEntry.issuingOrganization}
            onChange={(e) =>
              setTempEntry((prev) => ({ ...prev, issuingOrganization: e.target.value }))
            }
            placeholder="Issuing Organization"
          />
          <Input
            type="text"
            value={tempEntry.link || ''}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, link: e.target.value }))}
            placeholder="Certification Link (optional)"
          />
          <Input
            type="text"
            value={tempEntry.date}
            onChange={(e) => setTempEntry((prev) => ({ ...prev, date: e.target.value }))}
            placeholder="Date (e.g., Jan 2023)"
          />
          <Button onClick={handleSave} className="bg-green-500 text-white">
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificationsSection;
