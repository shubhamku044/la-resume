import { sb2nov } from './sb2nov';
import { sb2novResumeSampleData } from './sb2nov';
import type { Sb2novResumeData } from './sb2nov';

export { sb2nov };
export { sb2novResumeSampleData };
export type { Sb2novResumeData };

export const resumes = {
  sb2nov: {
    templateType: {} as Sb2novResumeData,
    templateSampleData: sb2novResumeSampleData,
    templateFunction: sb2nov,
  },
};
