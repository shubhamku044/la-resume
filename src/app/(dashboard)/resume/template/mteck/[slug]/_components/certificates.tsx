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
import { Trash, Plus, Pencil } from 'lucide-react';
import { MTeckResumeData } from '@/lib/templates/mteck';

interface CertificatesProps {
  data: MTeckResumeData['certificates'];
  setTempData: React.Dispatch<React.SetStateAction<MTeckResumeData>>;
}

const CertificatesSection = ({ data, setTempData }: CertificatesProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempCertificate, setTempCertificate] = useState('');

  // Handle reordering certificates
  const handleReorder = (newOrder: string[]) => {
    setTempData((prev) => ({ ...prev, certificates: newOrder }));
  };

  // Open modal for editing
  const handleOpenModal = (index: number) => {
    setEditingIndex(index);
    setTempCertificate(data[index]);
    setModalOpen(true);
  };

  // Save certificate changes
  const handleSave = () => {
    if (!tempCertificate.trim()) return; // Prevent empty certificates

    setTempData((prev) => {
      const updatedCertificates = [...prev.certificates];
      if (editingIndex !== null) {
        updatedCertificates[editingIndex] = tempCertificate; // Update existing certificate
      } else {
        updatedCertificates.push(tempCertificate); // Add new certificate
      }
      return { ...prev, certificates: updatedCertificates };
    });

    setModalOpen(false);
    setEditingIndex(null);
    setTempCertificate('');
  };

  // Remove a certificate
  const handleRemove = (index: number) => {
    setTempData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-4">
      {/* Reorderable Certificates List */}
      <Reorder.Group values={data} onReorder={handleReorder} className="space-y-3">
        {data.map((certificate, index) => (
          <Reorder.Item key={index} value={certificate}>
            <Card className="rounded-lg border border-gray-300 p-5 shadow-sm">
              <div className="flex items-start justify-between">
                {/* Left Section: Certificate Details */}
                <div className="w-full space-y-2">
                  <h3 className="text-lg font-semibold">{certificate || 'Untitled Certificate'}</h3>
                </div>

                {/* Right Section: Edit & Delete Buttons */}
                <div className="flex space-x-3">
                  <Button size="icon" variant="outline" onClick={() => handleOpenModal(index)}>
                    <Pencil size={18} />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => handleRemove(index)}>
                    <Trash size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Add Certificate Button */}
      <Dialog
        open={modalOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            // Reset state when closing
            setEditingIndex(null);
            setTempCertificate('');
          }
          setModalOpen(isOpen);
        }}
      >
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setEditingIndex(null);
              setTempCertificate('');
              setModalOpen(true);
            }}
          >
            <Plus size={18} className="mr-2" />
            Add Certificate
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingIndex !== null ? 'Edit Certificate' : 'Add Certificate'}
            </DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            value={tempCertificate}
            onChange={(e) => setTempCertificate(e.target.value)}
            placeholder="Certificate Name"
          />
          <Button onClick={handleSave} className="bg-green-500 text-white">
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificatesSection;
