import { sb2novResumeSampleData } from './templates/sb2nov';
import { deedySampleResumeData } from './templates/deedy';
import { mteckResumeSampleData } from './templates/mteck';
export const templates = [
  {
    id: 'sb2nov',
    name: 'RenderCV Resume',
    description: 'A CV/resume theme of RenderCV.',
    image: '/templates/sb2nov.webp',
    sampleData: sb2novResumeSampleData,
    imageUrl: 'https://ik.imagekit.io/laresume/templates/sb2nov.webp?updatedAt=1741152480015',
  },
  {
    id: 'deedy',
    name: 'Deedy Resume',
    description: 'Professional Resume for Engineering Students.',
    image: '/templates/deedy.webp',
    sampleData: deedySampleResumeData,
    imageUrl: 'https://ik.imagekit.io/laresume/templates/deedy.webp?updatedAt=1741152479844',
  },
  {
    id: 'mteck',
    name: 'MTeck Resume',
    description: 'A LaTeX resume template for software engineers.',
    image: '/templates/mteck.webp',
    sampleData: mteckResumeSampleData,
    imageUrl: 'https://ik.imagekit.io/laresume/templates/mteck.webp?updatedAt=1741502621839',
  },
];
