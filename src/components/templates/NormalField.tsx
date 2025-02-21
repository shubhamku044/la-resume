interface NormalFieldProps<T extends Record<string, unknown>> {
  section: keyof T;
  data: string | Record<string, string>;
  handleChange: (section: keyof T, index: null, field: string, value: string) => void;
}

const NormalField = <T extends Record<string, unknown>>({
  section,
  data,
  handleChange,
}: NormalFieldProps<T>) => {
  if (typeof data === 'object' && data !== null) {
    return (
      <>
        {Object.keys(data).map((field) => (
          <div key={field} className="mt-4">
            <label className="block text-sm font-medium capitalize text-gray-700">{field}</label>
            <input
              type="text"
              value={data[field as keyof typeof data]}
              onChange={(e) => handleChange(section, null, field, e.target.value)}
              placeholder={`Enter ${field}`}
              className="w-full rounded-md border p-2"
            />
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium capitalize text-gray-700">
        {String(section)}
      </label>
      <input
        type="text"
        value={data}
        onChange={(e) => handleChange(section, null, '', e.target.value)}
        placeholder={`Enter ${String(section)}`}
        className="w-full rounded-md border p-2"
      />
    </div>
  );
};

export default NormalField;
