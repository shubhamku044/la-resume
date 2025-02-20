'use client';

import { useState, useEffect } from 'react';

const ResumeForm = ({ onUpdate }: { onUpdate: (imageUrl: string) => void }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (name.trim()) {
        generateResumePreview();
      }
    }, 1000); // 1 second debounce

    return () => clearTimeout(timeout);
  }, [name]);

  const generateResumePreview = async () => {
    setLoading(true);

    try {
      // Fetch LaTeX file from public directory
      const latexResponse = await fetch('/pri.tex');
      if (!latexResponse.ok) throw new Error('Failed to load LaTeX file');
      const latexText = await latexResponse.text();

      // Create a Blob from the LaTeX file content
      const latexBlob = new Blob([latexText], { type: 'text/plain' });
      const formData = new FormData();
      formData.append('latex', latexBlob, 'pri.tex');

      const response = await fetch('http://3.107.202.62:8080/compile', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to generate resume preview');

      // Convert the response to a WebP image URL
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      onUpdate(imageUrl); // Pass WebP URL to parent
    } catch (error) {
      console.error('Error generating resume preview:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <label className="block text-sm font-medium">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="w-full p-2 mt-2 border rounded-md"
      />
      {loading && <p className="text-sm text-gray-500 mt-2">Generating preview...</p>}
    </div>
  );
};

export default ResumeForm;
