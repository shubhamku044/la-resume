import {
  CompaniesSection,
  ContactSection,
  FAQSection,
  FeaturesSection,
  FooterSection,
  Header,
  HeroSection,
  HowItWorksSection,
  PricingSection,
  StatsBanner,
  TeamSection,
  TestimonialsSection,
} from '@/components/landing';

const Page = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <StatsBanner />
      <HeroSection />
      <CompaniesSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TeamSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Page;
