import type { deedyResumeData } from './deedy';
import { deedy, deedySampleResumeData } from './deedy';
import type { MTeckResumeData } from './mteck';
import { mteck, mteckResumeSampleData } from './mteck';
import type { Sb2novResumeData } from './sb2nov';
import { sb2nov, sb2novResumeSampleData } from './sb2nov';
import { techPro, TechProResumeData, techProResumeSampleData } from './techpro';

export {
  deedy,
  deedySampleResumeData,
  mteck,
  mteckResumeSampleData,
  sb2nov,
  sb2novResumeSampleData,
};
export type { deedyResumeData, MTeckResumeData, Sb2novResumeData };

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
  techpro: {
    templateType: {} as TechProResumeData,
    templateSampleData: techProResumeSampleData,
    templateFunction: techPro,
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
