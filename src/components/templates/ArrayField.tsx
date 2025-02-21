import { Plus, Trash } from "lucide-react";

interface ArrayFieldProps {
  section: string;
  data: any[];
  handleChange: (
    section: string,
    index: number,
    field: string,
    value: string
  ) => void;
  handleAddEntry: (section: string) => void;
  handleRemoveEntry: (section: string, index: number) => void;
}

const ArrayField: React.FC<ArrayFieldProps> = ({
  section,
  data,
  handleChange,
  handleAddEntry,
  handleRemoveEntry,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold capitalize flex justify-between items-center">
        {section}
        <button
          className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-md text-sm"
          onClick={() => handleAddEntry(section)}
        >
          <Plus size={16} />
          Add Entry
        </button>
      </h3>

      <div className="space-y-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-sm bg-gray-50 relative"
          >
            <h4 className="text-md font-semibold text-gray-800 flex justify-between items-center">
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
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {field}
                  </label>
                  <input
                    type="text"
                    value={item[field]}
                    onChange={(e) =>
                      handleChange(section, index, field, e.target.value)
                    }
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
