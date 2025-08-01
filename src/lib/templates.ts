import { deedySampleResumeData } from './templates/deedy';
import { mteckResumeSampleData } from './templates/mteck';
import { sb2novResumeSampleData } from './templates/sb2nov';
import { techProResumeSampleData } from './templates/techpro';
export const templates = [
  {
    id: 'sb2nov',
    name: 'RenderCV Resume',
    description: 'A CV/resume theme of RenderCV.',
    image: '/templates/sb2nov.webp',
    sampleData: sb2novResumeSampleData,
    imageUrl: 'https://laresume.s3.us-west-1.amazonaws.com/templates/sb2nov.webp',
  },
  {
    id: 'techpro',
    name: 'TechPro Resume',
    description: 'A modern resume template for tech professionals.',
    image: '/templates/techpro.webp',
    sampleData: techProResumeSampleData,
    imageUrl: 'https://laresume.s3.us-west-1.amazonaws.com/templates/techpro.webp',
  },
  {
    id: 'deedy',
    name: 'Deedy Resume',
    description: 'Professional Resume for Engineering Students.',
    image: '/templates/deedy.webp',
    sampleData: deedySampleResumeData,
    imageUrl: 'https://laresume.s3.us-west-1.amazonaws.com/templates/deedy.webp',
  },
  {
    id: 'mteck',
    name: 'MTeck Resume',
    description: 'A LaTeX resume template for software engineers.',
    image: '/templates/mteck.webp',
    sampleData: mteckResumeSampleData,
    imageUrl: 'https://laresume.s3.us-west-1.amazonaws.com/templates/mteck.webp',
  },
];
