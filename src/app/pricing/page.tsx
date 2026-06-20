import type { Metadata } from 'next';
import { FooterSection, Header, PricingSection } from '@/components/landing';

export const metadata: Metadata = {
  title: 'Pricing — Free to Build, One-Time Unlock to Export | La-Resume',
  description:
    'Build and preview your resume for free. A single one-time payment unlocks unlimited PDF downloads, shareable links, and analytics — no subscriptions.',
  alternates: { canonical: 'https://la-resume.com/pricing' },
  openGraph: {
    title: 'Pricing — Free to Build, One-Time Unlock to Export | La-Resume',
    description:
      'Build and preview your resume for free. A single one-time payment unlocks unlimited PDF downloads — no subscriptions.',
    url: 'https://la-resume.com/pricing',
    siteName: 'La-Resume',
    type: 'website',
  },
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <PricingSection />
      </main>
      <FooterSection />
    </>
  );
}
