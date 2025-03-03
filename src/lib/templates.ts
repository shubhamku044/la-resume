import { sb2novResumeSampleData } from './templates/sb2nov';
import { deedySampleResumeData } from './templates/deedy';
export const templates = [
  {
    id: 'sb2nov',
    name: 'RenderCV Resume',
    description: 'A CV/resume theme of RenderCV.',
    image: '/templates/sb2nov.webp',
    sampleData: sb2novResumeSampleData,
  },
  {
    id: 'deedy',
    name: 'Deedy Resume',
    description: 'Professional Resume for Engineering Students.',
    image: '/templates/deedy.webp',
    sampleData: deedySampleResumeData,
  },
];
