import { sb2nov } from './sb2nov';
import { sb2novResumeSampleData } from './sb2nov';
import type { Sb2novResumeData } from './sb2nov';
import { deedy } from './deedy';
import { deedySampleResumeData } from './deedy';
import type { deedyResumeData } from './deedy';

export { sb2nov };
export { sb2novResumeSampleData };
export type { Sb2novResumeData };
export { deedy };
export { deedySampleResumeData };
export type { deedyResumeData };

export const resumesMap = {
  sb2nov: {
    templateType: {} as Sb2novResumeData,
    templateSampleData: sb2novResumeSampleData,
    templateFunction: sb2nov,
  },
  deedy: {
    templateType: {} as deedyResumeData,
    templateSampleData: deedySampleResumeData,
    templateFunction: deedy,
  },
};
export const getResumeTemplateType = (resumeName: keyof typeof resumesMap) => {
  return resumesMap[resumeName]?.templateType || null;
};
export const getResumeTemplateSampleData = (resumeName: keyof typeof resumesMap) => {
  return resumesMap[resumeName]?.templateSampleData || null;
};
