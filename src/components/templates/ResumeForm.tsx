"use client";
import { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArrayField from "./ArrayField";
import NormalField from "./NormalField";
interface IProps<T> {
  setLatexData: React.Dispatch<React.SetStateAction<string | null>>;
  onUpdate: (imageUrl: string) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  templateSampleData: T; // ✅ Now dynamic!
  templateFunction: (data: T) => string; // ✅ Ensures correct function signature
}
const ResumeForm = <T,>({
  setLatexData,
  onUpdate,
  setLoading,
  templateSampleData,
  templateFunction,
}: IProps<T>) => {
  const [formData, setFormData] = useState<T>(templateSampleData ?? ({} as T)); // ✅ Strongly typed
  const [tempData, setTempData] = useState<T>(templateSampleData ?? ({} as T)); // ✅ Strongly typed

  // Function to handle field updates
  const handleChange = (
    section: string,
    index: number | null,
    field: string,
    value: string
  ) => {
    setTempData((prev: any) => {
      const updatedData = { ...prev };

      if (Array.isArray(updatedData[section])) {
        updatedData[section][index!] = {
          ...updatedData[section][index!],
          [field]: value,
        };
      } else if (typeof updatedData[section] === "object") {
        updatedData[section][field] = value;
      } else {
        updatedData[section] = value;
      }

      return updatedData;
    });
  };

  // Function to generate LaTeX preview
  const generateResumePreview = useCallback(async () => {
    setLoading(true);
    try {
      const latexText = templateFunction(formData);
      setLatexData(latexText);

      const latexBlob = new Blob([latexText], { type: "text/plain" });
      const formDataUpload = new FormData();
      formDataUpload.append("latex", latexBlob, "resume.tex");

      const response = await fetch("/api/compile", {
        method: "POST",
        body: formDataUpload,
      });

      if (!response.ok) throw new Error("Failed to generate resume preview");

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      onUpdate(imageUrl);
    } catch (error) {
      console.error("Error generating resume preview:", error);
    } finally {
      setLoading(false);
    }
  }, [onUpdate, setLatexData, formData]);
  const handleAddEntry = (
    section: string,
    emptyEntry: Record<string, string>
  ) => {
    setTempData((prevData) => ({
      ...prevData,
      [section]: [...prevData[section], emptyEntry], // Append new empty object
    }));
  };

  const handleRemoveEntry = (section: string, index: number) => {
    setTempData((prevData) => ({
      ...prevData,
      [section]: prevData[section].filter((_, i) => i !== index), // Remove entry at index
    }));
  };

  // Throttle: Update `formData` from `tempData` every 500ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFormData(tempData);
    }, 500); // ✅ Adjust throttle delay if needed

    return () => clearTimeout(timeout);
  }, [tempData]);

  // Automatically generate preview when `formData` updates
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      generateResumePreview();
    }
  }, [formData]); // ✅ Triggers only when `formData` changes

  return (
    <Tabs
      defaultValue={Object.keys(tempData)[0] || "section1"}
      className="p-6 border rounded-md space-y-6"
    >
      <TabsList className="flex flex-wrap gap-2">
        {Object.keys(tempData).map((section) => (
          <TabsTrigger key={section} value={section} className="capitalize">
            {section}
          </TabsTrigger>
        ))}
      </TabsList>

      {Object.keys(tempData).map((section) => (
        <TabsContent
          key={section}
          value={section}
          className="rounded-md border p-4"
        >
          {Array.isArray(tempData[section]) &&
          typeof tempData[section][0] === "object" ? (
            <ArrayField
              section={section}
              data={tempData[section]}
              handleChange={handleChange}
              handleAddEntry={handleAddEntry}
              handleRemoveEntry={handleRemoveEntry}
            />
          ) : (
            <NormalField
              section={section}
              data={tempData[section]}
              handleChange={handleChange}
            />
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ResumeForm;
