import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import { useGetResumeBySlugQuery } from '@/store/services/templateApi';
import {
  deedyResumeData,
  resumesMap,
  Sb2novResumeData,
  MTeckResumeData,
} from '@/lib/templates/index';
import { OldSb2novResumeData } from '@/lib/templates/sb2nov';

function migrateResumeData(oldData: OldSb2novResumeData): Sb2novResumeData {
  // Migrate heading
  const heading = {
    name: oldData.heading.name,
    phone: oldData.heading.phone,
    email: oldData.heading.email,
    location: oldData.heading.location,
    socials: [
      { name: 'Portfolio', url: oldData.heading.portfolio || '' },
      { name: 'GitHub', url: oldData.heading.github || '' },
      { name: 'LinkedIn', url: oldData.heading.linkedin || '' },
      { name: 'LeetCode', url: oldData.heading.leetcode || '' },
      { name: 'Codeforces', url: oldData.heading.codeforces || '' },
    ].filter((social) => social.url), // Remove socials with empty URLs
  };

  // Migrate education
  const education = {
    sectionTitle: 'Education',
    entries: oldData.education,
  };

  // Migrate skills
  const skills = {
    sectionTitle: 'Skills',
    entries: Object.keys(oldData.skills).map((category) => ({
      category,
      items: oldData.skills[category],
    })),
  };

  // Migrate experience
  const experience = {
    sectionTitle: 'Experience',
    entries: oldData.experience,
  };

  // Migrate projects
  const projects = {
    sectionTitle: 'Projects',
    entries: oldData.projects,
  };

  // Migrate honorsAndAwards
  const honorsAndAwards = {
    sectionTitle: 'Honors & Awards',
    entries: oldData.honorsAndAwards,
  };

  // Migrate sectionOrder (if it exists)
  const sectionOrder = oldData.sectionOrder;

  // Return the migrated data
  return {
    heading,
    education,
    skills,
    experience,
    projects,
    honorsAndAwards,
    sectionOrder,
  };
}

function isNewSb2novResumeData(data: unknown): data is Sb2novResumeData {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  const resumeData = data as Partial<Sb2novResumeData>;
  return (
    resumeData.heading?.socials !== undefined &&
    resumeData.education?.sectionTitle !== undefined &&
    resumeData.skills?.sectionTitle !== undefined &&
    resumeData.experience?.sectionTitle !== undefined &&
    resumeData.projects?.sectionTitle !== undefined &&
    resumeData.honorsAndAwards?.sectionTitle !== undefined
  );
}

export function useResumeData(templateKey: keyof typeof resumesMap) {
  const templatePackage = resumesMap[templateKey];
  const { templateFunction: resumeFunc, templateSampleData: resumeSampleData } = templatePackage;

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [latexData, setLatexData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const clerkId = user?.id;
  const params = useParams();
  const { slug } = params;

  const {
    data: existingResume,
    isLoading: isFetching,
    isError,
  } = useGetResumeBySlugQuery(
    { clerk_id: clerkId!, slug: slug as string },
    { skip: !clerkId, refetchOnMountOrArgChange: true }
  );

  const initialData = existingResume?.data
    ? (existingResume.data as
        | deedyResumeData
        | Sb2novResumeData
        | MTeckResumeData
        | OldSb2novResumeData)
    : resumeSampleData;
  let finaldata = initialData;
  console.log('initialData', initialData);
  if (templateKey === 'sb2nov' && !isNewSb2novResumeData(initialData)) {
    finaldata = migrateResumeData(initialData as OldSb2novResumeData);
  }
  console.log('finaldata', finaldata);

  return {
    resumeFunc,
    finaldata,
    existingResume,
    isFetching,
    isError,
    imageUrl,
    latexData,
    loading,
    setImageUrl,
    setLatexData,
    setLoading,
    slug,
    resumeSampleData,
  };
}
