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
import { Trash, Plus, Pencil, GripVertical } from 'lucide-react';
import { MTeckResumeData } from '@/lib/templates/mteck';
interface CertificatesProps {
  data: MTeckResumeData['certificates'];
  setTempData: React.Dispatch<React.SetStateAction<MTeckResumeData>>;
  setIsChangesSaved?: React.Dispatch<React.SetStateAction<boolean>>;
}
console.log('CertificatesSection Rendered');

const CertificatesSection = ({ data, setTempData, setIsChangesSaved }: CertificatesProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempCertificate, setTempCertificate] = useState('');
  const handleReorder = (newOrder: MTeckResumeData['certificates']) => {
    setTempData((prev) => ({ ...prev, certificates: newOrder }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };
  console.log(data);
  // Open modal for editing
  const handleOpenModal = (index: number) => {
    setEditingIndex(index);
    setTempCertificate(data[index].name);
    setModalOpen(true);
  };

  // Save certificate changes
  const handleSave = () => {
    if (!tempCertificate.trim()) return; // Prevent empty certificates

    setTempData((prev) => {
      const updatedCertificates = [...prev.certificates];
      if (editingIndex !== null) {
        updatedCertificates[editingIndex] = {
          ...updatedCertificates[editingIndex],
          name: tempCertificate,
        };
      } else {
        updatedCertificates.push({ id: Date.now().toString(), name: tempCertificate }); // Assign a unique ID
      }
      return { ...prev, certificates: updatedCertificates };
    });

    setModalOpen(false);
    setEditingIndex(null);
    setTempCertificate('');
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  // Remove a certificate
  const handleRemove = (index: number) => {
    setTempData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index),
    }));
    if (setIsChangesSaved) setIsChangesSaved(false);
  };

  return (
    <div className="space-y-4">
      <Reorder.Group values={data} onReorder={handleReorder} className="space-y-3">
        {data.map((certificate, index) => (
          <Reorder.Item key={certificate.id} value={certificate}>
            <Card className="flex justify-between p-4">
              <div className="flex gap-2">
                <GripVertical size={20} className="mt-1 cursor-grab opacity-65" />
                <div>
                  <h3 className="text-base font-bold">
                    {certificate.name || 'Untitled Certificate'}
                  </h3>
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
