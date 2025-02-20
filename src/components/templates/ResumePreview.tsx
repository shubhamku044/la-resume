'use client';
import Image from 'next/image';

interface IProps {
  imageUrl: string | null;
  latexData: string | null;
}

const ResumePreview = ({ imageUrl, latexData }: IProps) => {
  const handleDownload = async () => {
    if (!latexData) return;

    try {
      const latexBlob = new Blob([latexData], { type: 'text/plain' });
      const formData = new FormData();
      formData.append('latex', latexBlob, 'resume.tex');

      const response = await fetch('http://3.107.202.62:8080/generate-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const pdfBlob = await response.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);

      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `resume-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div className="w-full rounded-md border p-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">Resume Preview</h2>
        <button onClick={handleDownload}>Download</button>
      </div>
      <div className="relative mt-2 aspect-[1/1.414] w-full overflow-hidden rounded-md border">
        {imageUrl ? (
          <Image src={imageUrl} alt="Resume Preview" fill className="object-contain" />
        ) : (
          <p className="absolute inset-0 flex items-center justify-center text-gray-500">
            Preview will appear here...
          </p>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
