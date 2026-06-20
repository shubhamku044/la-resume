import type { Metadata } from 'next';
import { FeaturesSection, FooterSection, Header } from '@/components/landing';

export const metadata: Metadata = {
  title: 'Resume Builder Features — ATS, LaTeX & PDF Export | La-Resume',
  description:
    'Everything in the La-Resume builder: real-time preview, ATS-friendly templates, LaTeX-quality typesetting, one-click PDF export, and shareable links.',
  alternates: { canonical: 'https://la-resume.com/features' },
  openGraph: {
    title: 'Resume Builder Features — ATS, LaTeX & PDF Export | La-Resume',
    description:
      'Real-time preview, ATS-friendly templates, LaTeX-quality typesetting, one-click PDF export, and shareable links.',
    url: 'https://la-resume.com/features',
    siteName: 'La-Resume',
    type: 'website',
  },
};

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <FeaturesSection />
      </main>
      <FooterSection />
    </>
  );
}
