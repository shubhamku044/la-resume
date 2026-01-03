import Favicon from '@/components/favicon';
import JsonLd from '@/components/json-ld';
import I18nProvider from '@/components/providers/i18n-provider';
import ThemeProvider from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { getLocale, getMessages } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import Head from 'next/head';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'La-Resume: Free ATS-Optimized Resume Builder with LaTeX Export',
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
    'la-resume',
    'la-resume.tech',
    'laresume',
    'la resume',
    'la resume tech',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-dark.ico', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-light.ico', media: '(prefers-color-scheme: dark)' },
    ],
    shortcut: '/favicon-dark.ico',
  },
  openGraph: {
    title: 'La-Resume: Free ATS-Optimized Resume Builder with LaTeX Export',
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
    title: 'La-Resume: Free ATS-Optimized Resume Builder with LaTeX Export',
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
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#ffffff',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <ClerkProvider
      afterSignOutUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL || '/'}
      afterMultiSessionSingleSignOutUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL || '/'}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang={locale}>
        <Head>
          <JsonLd />
        </Head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider>
            <Favicon />
            <I18nProvider locale={locale} messages={messages}>
              <main>{children}</main>
              <Toaster />
            </I18nProvider>
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics gaId="G-DQR3LS5N69" />
        </body>
      </html>
    </ClerkProvider>
  );
}
