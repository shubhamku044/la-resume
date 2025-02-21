import { sb2nov } from './sb2nov';
import { sb2novResumeSampleData } from  './sb2nov';
import type { Sb2novResumeData } from './sb2nov';

export { sb2nov };
export { sb2novResumeSampleData };
export type { Sb2novResumeData };

export const resumes = {
    sb2nov: {
      templateType: {} as Sb2novResumeData, // ✅ Type placeholder
      templateSampleData: sb2novResumeSampleData, // ✅ Sample data
      templateFunction: sb2nov, // ✅ Function
    },
  };  