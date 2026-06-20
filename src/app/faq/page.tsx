import type { Metadata } from 'next';
import { FAQSection, FooterSection, Header } from '@/components/landing';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | La-Resume',
  description:
    'Answers about La-Resume: is it free, are the templates ATS-friendly, do you need to know LaTeX, how PDF export works, and more.',
  alternates: { canonical: 'https://la-resume.com/faq' },
  openGraph: {
    title: 'Frequently Asked Questions | La-Resume',
    description: 'Answers about pricing, ATS-friendliness, LaTeX, and PDF export.',
    url: 'https://la-resume.com/faq',
    siteName: 'La-Resume',
    type: 'website',
  },
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <FAQSection />
      </main>
      <FooterSection />
    </>
  );
}
