import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { FooterSection, Header } from '@/components/landing';
import { templates } from '@/lib/templates';
import { getAssetUrl } from '@/lib/assets';

const BUILDER_URL = '/templates/resume-templates';
const BASE = 'https://la-resume.com/resume-templates';

interface TemplateDetail {
  tagline: string;
  intro: string;
  bestFor: string[];
}

const details: Record<string, TemplateDetail> = {
  sb2nov: {
    tagline: 'A clean, single-column CV theme based on RenderCV.',
    intro:
      'The RenderCV template is a minimal, single-column resume that puts your content first. Its standard headings and generous whitespace make it effortless for applicant tracking systems to parse, while staying elegant enough for human reviewers. It is a great fit when you want a timeless, no-frills CV that reads well on screen and in print.',
    bestFor: [
      'Academics, researchers, and PhD applicants',
      'Anyone who prefers a traditional, content-first layout',
      'Long-form CVs with publications or detailed experience',
    ],
  },
  techpro: {
    tagline: 'A modern resume template for tech professionals.',
    intro:
      'TechPro is built for software and tech roles. It surfaces your stack, skills, and quantified impact exactly where recruiters scan first, with a confident modern hierarchy. Every section is structured so an ATS reads your title, company, and achievements cleanly — no parsing surprises.',
    bestFor: [
      'Software engineers, data, and DevOps roles',
      'Showcasing tech stacks and measurable impact',
      'Candidates who want a contemporary, scannable look',
    ],
  },
  deedy: {
    tagline: 'Professional resume for engineering students.',
    intro:
      'The Deedy template is a popular two-column layout that fits a lot of signal on a single page. It is ideal for students and new grads who need to balance projects, skills, education, and achievements without spilling onto a second page, while keeping everything readable for both ATS and recruiters.',
    bestFor: [
      'Engineering students and new graduates',
      'Internship and new-grad applications',
      'Fitting projects, skills, and education on one page',
    ],
  },
  mteck: {
    tagline: 'A LaTeX resume template for software engineers.',
    intro:
      'MTeck is a compact, typography-forward LaTeX template optimized for dense technical content. It keeps tight, consistent spacing so experienced engineers can present deep experience without clutter — and because it is built on LaTeX, the exported PDF is pixel-perfect everywhere.',
    bestFor: [
      'Experienced software engineers',
      'Dense, detail-rich technical resumes',
      'Anyone who wants precise LaTeX typesetting',
    ],
  },
};

export function generateStaticParams() {
  return templates.map((template) => ({ id: template.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const template = templates.find((t) => t.id === id);
  if (!template) return {};
  const url = `${BASE}/${id}`;
  const title = `${template.name} — ATS-Friendly LaTeX Resume Template | La-Resume`;
  const description = `${template.description} Customize the ${template.name} in minutes and export a clean, ATS-friendly PDF — free to build with La-Resume.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'La-Resume',
      type: 'website',
      images: [{ url: 'https://la-resume.com/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function TemplateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const template = templates.find((t) => t.id === id);
  if (!template) notFound();

  const detail = details[id] ?? {
    tagline: template.description,
    intro: template.description,
    bestFor: [],
  };
  const others = templates.filter((t) => t.id !== id);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://la-resume.com' },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Resume Templates',
        'item': BASE,
      },
      { '@type': 'ListItem', 'position': 3, 'name': template.name, 'item': `${BASE}/${id}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <div className="bg-background text-foreground">
        <div className="container mx-auto px-4 py-10 sm:px-6 lg:py-14">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <ChevronRight className="size-3.5" aria-hidden />
              <li>
                <Link href="/resume-templates" className="hover:text-foreground">
                  Resume Templates
                </Link>
              </li>
              <ChevronRight className="size-3.5" aria-hidden />
              <li className="font-medium text-foreground" aria-current="page">
                {template.name}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
            {/* Preview */}
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-secondary shadow-elegant">
              <Image
                src={getAssetUrl(template.imageUrl)}
                alt={`${template.name} – ATS-friendly resume template preview`}
                width={850}
                height={1100}
                className="h-auto w-full"
                priority
              />
            </div>

            {/* Details */}
            <div className="lg:sticky lg:top-24">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {template.name}
                </span>
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">{detail.tagline}</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">{detail.intro}</p>

              {detail.bestFor.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                    Best for
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {detail.bestFor.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-muted-foreground">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link
                href={BUILDER_URL}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-7 py-3 text-base font-semibold text-white shadow-elegant transition-shadow hover:shadow-glow"
              >
                Use this template
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Other templates */}
          <section className="mt-16 border-t border-border/60 pt-12">
            <h2 className="text-2xl font-bold tracking-tight">Other resume templates</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {others.map((other) => (
                <Link
                  key={other.id}
                  href={`/resume-templates/${other.id}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
                >
                  <div className="relative aspect-8.5/11 overflow-hidden border-b border-border/60 bg-secondary">
                    <Image
                      src={getAssetUrl(other.imageUrl)}
                      alt={`${other.name} resume template preview`}
                      width={420}
                      height={544}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold tracking-tight">{other.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{other.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
      <FooterSection />
    </>
  );
}
