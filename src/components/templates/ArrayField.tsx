import { Plus, Trash } from 'lucide-react';

interface ArrayFieldProps<T extends Record<string, unknown>> {
  section: keyof T;
  data: Array<Record<string, string>>;
  handleChange: (section: keyof T, index: number, field: string, value: string) => void;
  handleAddEntry: (section: keyof T) => void;
  handleRemoveEntry: (section: keyof T, index: number) => void;
}

const ArrayField = <T extends Record<string, unknown>>({
  section,
  data,
  handleChange,
  handleAddEntry,
  handleRemoveEntry,
}: ArrayFieldProps<T>) => {
  return (
    <div>
      <h3 className="flex items-center justify-between text-lg font-semibold capitalize">
        {String(section)}
        <button
          className="flex items-center gap-2 rounded-md bg-green-600 px-3 py-1 text-sm text-white"
          onClick={() => handleAddEntry(section)}
        >
          <Plus size={16} />
          Add Entry
        </button>
      </h3>

      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="relative rounded-lg border bg-gray-50 p-4 shadow-sm">
            <h4 className="flex items-center justify-between text-lg font-semibold text-gray-800">
              Entry {index + 1}
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handleRemoveEntry(section, index)}
              >
                <Trash size={16} />
              </button>
            </h4>
            <div className="mt-2 space-y-2">
              {Object.keys(item).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium capitalize text-gray-700">
                    {field}
                  </label>
                  <input
                    type="text"
                    value={item[field]}
                    onChange={(e) => handleChange(section, index, field, e.target.value)}
                    placeholder={`Enter ${field}`}
                    className="w-full rounded-md border p-2"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArrayField;
