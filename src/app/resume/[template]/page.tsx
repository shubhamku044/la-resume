"use client";
import { resumes } from "@/lib/templates/index";
import { use, useState } from "react";
import ResumeForm from "@/components/templates/ResumeForm";
import ResumePreview from "@/components/templates/ResumePreview";

export default function ResumeTemplatePage({
  params,
}: {
  params: Promise<{ template: string }>;
}) {
  const { template } = use(params); // ✅ Unwrap the params Promise
  const templatePackage = resumes[template as keyof typeof resumes];
  const {
    templateFunction: resumeFunc,
    templateSampleData: resumeSampleData,
  } = templatePackage;

  const [imageUrl, setImageUrl] = useState<string | null>(null); // ✅ Hook at top level
  const [latexData, setLatexData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // ✅ Manage loading state here

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {/* Left: Resume Form */}
      <ResumeForm
        onUpdate={setImageUrl}
        setLoading={setLoading}
        setLatexData={setLatexData}
        templateSampleData={resumeSampleData}
        templateFunction={resumeFunc}
      />

      {/* Right: Resume Preview */}
      <ResumePreview
        imageUrl={imageUrl}
        latexData={latexData}
        loading={loading}
      />
    </div>
  );
}
