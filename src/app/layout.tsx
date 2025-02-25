import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Provider } from '@/store';
import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Viewport } from 'next';
import Header from '@/components/ui/Header';

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
    url: 'https://la-resume.tech',
    siteName: 'La-Resume',
    images: [
      {
        url: 'https://la-resume.tech/og-image.png',
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
    images: ['https://la-resume.tech/og-image.png'],
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
    canonical: 'https://la-resume.tech',
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Provider>
            <Header />
            <main>{children}</main>
            <Toaster />
          </Provider>
          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics gaId="G-DQR3LS5N69" />
        </body>
      </html>
    </ClerkProvider>
  );
}
