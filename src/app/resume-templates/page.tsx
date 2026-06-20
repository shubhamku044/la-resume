import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { Header, FooterSection } from '@/components/landing';
import { templates } from '@/lib/templates';
import { getAssetUrl } from '@/lib/assets';

const BUILDER_URL = '/templates/resume-templates';
const CANONICAL_URL = 'https://la-resume.com/resume-templates';

export const metadata: Metadata = {
  title: 'Professional ATS-Friendly Resume Templates | La-Resume',
  description:
    'Browse professional, ATS-friendly resume templates. Recruiter-approved, LaTeX-powered designs you can customize in minutes and export to a clean PDF. Open-source resume templates for any role.',
  keywords: [
    'resume templates',
    'ATS resume templates',
    'professional resume templates',
    'LaTeX resume templates',
    'recruiter-approved resume',
    'PDF resume',
    'open-source resume templates',
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: 'Professional ATS-Friendly Resume Templates | La-Resume',
    description:
      'Browse professional, ATS-friendly resume templates. Recruiter-approved, LaTeX-powered designs you can customize in minutes and export to a clean PDF.',
    url: CANONICAL_URL,
    siteName: 'La-Resume',
    type: 'website',
    images: [
      {
        url: 'https://la-resume.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'La-Resume ATS-friendly resume templates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional ATS-Friendly Resume Templates | La-Resume',
    description:
      'Browse professional, ATS-friendly resume templates. Recruiter-approved, LaTeX-powered designs you can customize in minutes and export to a clean PDF.',
    images: ['https://la-resume.com/og-image.png'],
  },
};

const faqs = [
  {
    question: 'Are these resume templates ATS-friendly?',
    answer:
      'Yes. Every template uses a clean, single-column-friendly structure with standard headings and selectable text, so applicant tracking systems can parse your name, experience, and skills without errors.',
  },
  {
    question: 'Can I export my resume to PDF?',
    answer:
      'Absolutely. Each template is rendered with LaTeX under the hood, giving you pixel-perfect typography and a crisp PDF export that looks identical on every device and printer.',
  },
  {
    question: 'Do I need to know LaTeX to use these templates?',
    answer:
      'No. You edit your resume through a simple form-based builder. We handle the LaTeX compilation for you, so you get professional typesetting without writing a single line of code.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Building and previewing your resume is free. Downloading and exporting the final PDF requires a one-time unlock, so there are no recurring subscriptions to worry about.',
  },
];

const valueProps = [
  {
    title: 'ATS-friendly by design',
    description:
      'Clean structure and standard headings mean applicant tracking systems read your resume correctly, every time.',
  },
  {
    title: 'Recruiter-approved layouts',
    description:
      'Each template is built around what hiring managers actually scan first, so your strengths land in seconds.',
  },
  {
    title: 'LaTeX-quality PDF export',
    description:
      'Professional typesetting powered by LaTeX gives you sharp, print-ready PDFs without touching any code.',
  },
];

export default function ResumeTemplatesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Professional ATS-Friendly Resume Templates',
    'description':
      'A collection of professional, ATS-friendly, LaTeX-powered resume templates you can customize and export to PDF.',
    'url': CANONICAL_URL,
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': templates.map((template, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': template.name,
        'description': template.description,
        'url': `https://la-resume.com${BUILDER_URL}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <div className="bg-background text-foreground">
        {/* Hero */}
        <section className="container mx-auto px-4 pb-10 pt-16 sm:px-6 lg:pt-20">
          <div className="animate-fade-in mx-auto max-w-3xl space-y-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
              <Sparkles className="size-4" />
              {templates.length} professional templates
            </span>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Professional, ATS-Friendly Resume Templates
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Choose from recruiter-approved, ATS-friendly resume templates powered by LaTeX.
              Customize the content in minutes and export a pixel-perfect PDF that gets past
              applicant tracking systems and onto a hiring manager&apos;s desk.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={BUILDER_URL}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-base font-semibold text-white shadow-elegant transition-shadow hover:shadow-glow"
              >
                Start building your resume
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="#templates"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-base font-semibold text-foreground shadow-card transition-colors hover:border-primary/40"
              >
                Browse templates
              </Link>
            </div>
          </div>
        </section>

        {/* Templates grid */}
        <section id="templates" className="container mx-auto scroll-mt-20 px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template, index) => (
              <article
                key={template.id}
                className="animate-fade-in group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Link
                  href={BUILDER_URL}
                  aria-label={`Use the ${template.name} template`}
                  className="block"
                >
                  <div className="relative aspect-8.5/11 overflow-hidden border-b border-border/60 bg-secondary">
                    <Image
                      src={getAssetUrl(template.imageUrl)}
                      alt={`${template.name} – ATS-friendly resume template preview`}
                      width={420}
                      height={544}
                      className="h-full w-full rounded-t-2xl object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      unoptimized
                    />
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">
                    {template.name}
                  </h2>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {template.description}
                  </p>
                  <Link
                    href={BUILDER_URL}
                    className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-shadow hover:shadow-glow"
                  >
                    Use this template
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Value props */}
        <section className="container mx-auto px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Why job seekers choose these templates
            </h2>
            <p className="mt-3 text-muted-foreground">
              Built for real hiring pipelines, from the first automated scan to the final recruiter
              review.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {valueProps.map((prop) => (
              <div
                key={prop.title}
                className="rounded-2xl border border-border/70 bg-card p-6 shadow-card"
              >
                <CheckCircle2 className="size-6 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">{prop.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
              Resume template FAQs
            </h2>
            <div className="mt-8 space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-border/70 bg-card p-6 shadow-card"
                >
                  <h3 className="text-base font-semibold text-foreground">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="container mx-auto px-4 pb-20 pt-4 sm:px-6">
          <div className="mx-auto max-w-3xl rounded-3xl border border-border/70 bg-card p-10 text-center shadow-elegant">
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-sm">
              <FileText className="size-6" />
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
              Ready to build your resume?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Pick a template, fill in your details, and preview your resume for free. Export a
              clean, ATS-friendly PDF whenever you&apos;re ready.
            </p>
            <Link
              href={BUILDER_URL}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-7 py-3 text-base font-semibold text-white shadow-elegant transition-shadow hover:shadow-glow"
            >
              Use a template now
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </div>
      <FooterSection />
    </>
  );
}
