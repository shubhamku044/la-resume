import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/ui/Header';
import { Provider } from '@/store';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'La-Resume: Professional ATS-Optimized Resume Builder',
  description:
    'Create perfect, ATS-friendly resumes for free. Export to PDF or LaTeX instantly. No signup required.',
  keywords: [
    'resume builder',
    'ATS resume',
    'free resume maker',
    'LaTeX resume',
    'PDF resume',
    'job application',
    'shubhamku044',
    'prybruhta',
  ],
  openGraph: {
    title: 'La-Resume: Professional ATS-Optimized Resume Builder',
    description: 'Create perfect, ATS-friendly resumes for free. Export to PDF or LaTeX instantly.',
    url: 'https://la-resume.vercel.app',
    siteName: 'La-Resume',
    images: [
      {
        url: 'https://la-resume.vercel.app/la-resume-mockup.png',
        width: 1200,
        height: 630,
        alt: 'La-Resume Interface Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La-Resume: Professional ATS-Optimized Resume Builder',
    description: 'Free ATS-friendly resume builder with LaTeX export',
    images: ['https://la-resume.vercel.app/la-resume-mockup.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://la-resume.vercel.app',
  },
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          <Header />
          <main>{children}</main>
          <Toaster />
        </Provider>
        <Analytics />
      </body>
    </html>
  );
}
