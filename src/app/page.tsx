import {
  CompaniesSection,
  ContactSection,
  FAQSection,
  FeaturesSection,
  FooterSection,
  Header,
  HeroSection,
  HowItWorksSection,
  StatsBanner,
  TeamSection,
  TestimonialsSection,
} from '@/components/landing';
import React from 'react';

const Page = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <StatsBanner />
      <HeroSection />
      <CompaniesSection />

      <FeaturesSection />
      <HowItWorksSection />
      <TeamSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Page;
