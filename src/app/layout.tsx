import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Provider } from '@/store';
import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import type { Viewport } from 'next';
import Favicon from '@/components/favicon';
import { ThemeProvider } from '@/components/landing/theme-provider';
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
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-dark.ico" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-light.ico" media="(prefers-color-scheme: dark)" />
        <link rel="shortcut icon" href="/favicon-dark.ico" />
      </head>
      <body>
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ClerkProvider
            afterSignOutUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL || '/'}
            afterMultiSessionSingleSignOutUrl={
              process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL || '/'
            }
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          >
            <ThemeProvider>
              <Favicon />
              <Provider>
                <NextIntlClientProvider messages={messages}>
                  <main>{children}</main>
                  <Toaster />
                </NextIntlClientProvider>
              </Provider>
            </ThemeProvider>
          </ClerkProvider>
        </div>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-DQR3LS5N69" />
      </body>
    </html>
  );
}
