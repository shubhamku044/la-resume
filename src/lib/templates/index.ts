import { sb2nov } from './sb2nov';
import { sb2novResumeSampleData } from './sb2nov';
import type { Sb2novResumeData } from './sb2nov';
import { deedy } from './deedy';
import { deedySampleResumeData } from './deedy';
import type { deedyResumeData } from './deedy';
import { mteck } from './mteck';
import { mteckResumeSampleData } from './mteck';
import type { MTeckResumeData } from './mteck';

export { sb2nov };
export { sb2novResumeSampleData };
export type { Sb2novResumeData };
export { deedy };
export { deedySampleResumeData };
export type { deedyResumeData };
export { mteck };
export { mteckResumeSampleData };
export type { MTeckResumeData };

export const resumesMap = {
  sb2nov: {
    templateType: {} as Sb2novResumeData,
    templateSampleData: sb2novResumeSampleData,
    templateFunction: sb2nov,
    productIdTest: 'pdt_D8nbWGw6pi5S1FeF0G6aF',
    productIdProd: 'pdt_HLHC44tfJsjupURvheCIP',
    productPrice: '$0.99',
  },
  deedy: {
    templateType: {} as deedyResumeData,
    templateSampleData: deedySampleResumeData,
    templateFunction: deedy,
    productIdTest: 'pdt_kLLhZZkt28DKo80XTPzDC',
    productIdProd: 'pdt_ileV2fM1WoWxTnLuz5qu5',
    productPrice: '$0.99',
  },
  mteck: {
    templateType: {} as MTeckResumeData,
    templateSampleData: mteckResumeSampleData,
    templateFunction: mteck,
    productIdTest: 'pdt_aaNRJ8MCUeQAX3fnyrwOG',
    productIdProd: 'pdt_txAMSeuDTE1zZigM8DfI7',
    productPrice: '$0.99',
  },
};

export const getResumeTemplateType = (resumeName: keyof typeof resumesMap) => {
  return resumesMap[resumeName]?.templateType || null;
};
export const getResumeTemplateSampleData = (resumeName: keyof typeof resumesMap) => {
  return resumesMap[resumeName]?.templateSampleData || null;
};
