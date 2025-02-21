interface NormalFieldProps {
  section: string;
  data: any;
  handleChange: (
    section: string,
    index: number | null,
    field: string,
    value: string
  ) => void;
}

const NormalField: React.FC<NormalFieldProps> = ({
  section,
  data,
  handleChange,
}) => {
  return typeof data === "object" ? (
    Object.keys(data).map((field) => (
      <div key={field} className="mt-4">
        <label className="block text-sm font-medium text-gray-700 capitalize">
          {field}
        </label>
        <input
          type="text"
          value={data[field]}
          onChange={(e) => handleChange(section, null, field, e.target.value)}
          placeholder={`Enter ${field}`}
          className="w-full rounded-md border p-2"
        />
      </div>
    ))
  ) : (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 capitalize">
        {section}
      </label>
      <input
        type="text"
        value={data}
        onChange={(e) => handleChange(section, null, "", e.target.value)}
        placeholder={`Enter ${section}`}
        className="w-full rounded-md border p-2"
      />
    </div>
  );
};

export default NormalField;
