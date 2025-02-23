import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ArrayFieldModalProps {
  open: boolean;
  onClose: () => void;
  fields: string[];
  formData: Record<string, string | string[]>; // Allow arrays
  onChange: (field: string, value: string | string[]) => void;
  onSave: () => void;
}

export default function ArrayFieldModal({
  open,
  onClose,
  fields,
  formData,
  onChange,
  onSave,
}: ArrayFieldModalProps) {
  // Handle normal input change
  const handleInputChange = (field: string, value: string) => {
    onChange(field, value);
  };

  // Handle array input change (for fields like `accomplishments`)
  const handleArrayChange = (field: string, index: number, value: string) => {
    const updatedArray = [...(formData[field] as string[])]; // Copy array
    updatedArray[index] = value;
    onChange(field, updatedArray);
  };

  // Add a new entry in an array field
  const handleAddArrayEntry = (field: string) => {
    const updatedArray = [...(formData[field] as string[]), '']; // Add empty string
    onChange(field, updatedArray);
  };

  // Remove an entry from an array field
  const handleRemoveArrayEntry = (field: string, index: number) => {
    const updatedArray = [...(formData[field] as string[])];
    updatedArray.splice(index, 1); // Remove item
    onChange(field, updatedArray);
  };

  if (!open) return null;

  return (
    // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Edit Entry</h2>

        {fields.map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-sm font-medium">{field}</label>

            {/* Handle string array fields */}
            {Array.isArray(formData[field]) ? (
              <div className="space-y-2">
                {(formData[field] as string[]).map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={item}
                      onChange={(e) => handleArrayChange(field, index, e.target.value)}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveArrayEntry(field, index)}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => handleAddArrayEntry(field)}>
                  + Add Entry
                </Button>
              </div>
            ) : (
              <Input
                value={formData[field] as string}
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
            )}
          </div>
        ))}

        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save</Button>
        </div>
      </div>
    </div>
  );
}
