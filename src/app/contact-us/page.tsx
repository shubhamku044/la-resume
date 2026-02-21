import type { Metadata } from 'next';
import ContactPageClient from './_components/contact-page-client';

export const metadata: Metadata = {
  title: 'Contact Us | La-Resume',
  description: 'Get in touch with the La-Resume team. Send us a message or find our contact information.',
  alternates: {
    canonical: 'https://la-resume.com/contactUs',
  },
};

const ContactPage = () => {
  return <ContactPageClient />
}

export default ContactPage;
