import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ArrayFieldCard from './arrayfield-card';
import ArrayFieldModal from './arrayfield-modal';

interface ArrayFieldProps<T extends Record<string, unknown>> {
  section: keyof T;
  data: Array<Record<string, string>>;
  handleChange: (section: keyof T, index: number, field: string, value: string) => void;
  handleAddEntry: (section: keyof T, newEntry: Record<string, string>) => void;
  handleRemoveEntry: (section: keyof T, index: number) => void;
}

export default function ArrayField<T extends Record<string, unknown>>({
  section,
  data,
  handleChange,
  handleAddEntry,
  handleRemoveEntry,
}: ArrayFieldProps<T>) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Record<string, string | string[]>>({});

  const fields = data.length > 0 ? Object.keys(data[0]) : ['title', 'description']; // Default fields

  const openModal = (index?: number) => {
    if (index !== undefined) {
      setEditingIndex(index);
      setFormData(data[index]);
    } else {
      setEditingIndex(null);
      // Ensure formData has fields initialized with empty values
      setFormData(Object.fromEntries(fields.map((f) => [f, ''])));
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFieldChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === 'string') {
          handleChange(section, editingIndex, key, value);
        } else {
          console.warn(`Skipping field ${key} as it contains an array:`, value);
        }
      });
    } else {
      const sanitizedData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          typeof value === 'string' ? value : value.join(', '), // Convert arrays to comma-separated strings
        ])
      );

      handleAddEntry(section, sanitizedData as Record<string, string>);
    }

    setTimeout(() => {
      closeModal();
    }, 100);
  };

  return (
    <div className="space-y-4">
      {data.map((entry, index) => (
        <ArrayFieldCard
          key={index}
          entry={entry}
          onEdit={() => openModal(index)}
          onDelete={() => handleRemoveEntry(section, index)}
        />
      ))}

      <Button onClick={() => openModal()}>Add Entry</Button>

      <ArrayFieldModal
        open={modalOpen}
        onClose={closeModal}
        fields={fields}
        formData={formData}
        onChange={handleFieldChange}
        onSave={handleSave}
      />
    </div>
  );
}
