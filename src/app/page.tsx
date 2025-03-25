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
  const stats = {
    stars: 1250,
    signups: 8750,
    resumes: 12500,
  };

  return (
    <div className="min-h-screen">
      <Header />
      <StatsBanner stats={stats} />
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
