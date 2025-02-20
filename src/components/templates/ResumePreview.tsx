'use client';

const ResumePreview = ({ imageUrl }: { imageUrl: string | null }) => {
  return (
    <div className="w-full p-4 border rounded-md">
      <h2 className="text-lg font-semibold">Resume Preview</h2>
      {imageUrl ? (
        <img src={imageUrl} alt="Resume Preview" className="mt-2 rounded-md border" />
      ) : (
        <p className="text-gray-500 mt-2">Preview will appear here...</p>
      )}
    </div>
  );
};

export default ResumePreview;
