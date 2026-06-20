import type { Metadata } from 'next';
import { FooterSection, Header, TeamSection } from '@/components/landing';

export const metadata: Metadata = {
  title: 'About La-Resume — Free, Open-Source Resume Builder',
  description:
    'La-Resume is a free, open-source resume builder that helps job seekers create ATS-friendly, LaTeX-quality resumes. Meet the team behind the project.',
  alternates: { canonical: 'https://la-resume.com/about' },
  openGraph: {
    title: 'About La-Resume — Free, Open-Source Resume Builder',
    description:
      'A free, open-source resume builder for ATS-friendly, LaTeX-quality resumes. Meet the team.',
    url: 'https://la-resume.com/about',
    siteName: 'La-Resume',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <TeamSection />
      </main>
      <FooterSection />
    </>
  );
}
