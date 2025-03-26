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
  StatsSection,
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
      <StatsSection />
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
