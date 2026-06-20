import { Button } from '@/components/ui/button';
import { getAssetUrl } from '@/lib/assets';
import { Show } from '@clerk/nextjs';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { LuGithub } from 'react-icons/lu';

interface HeroInteractiveProps {
  title: React.ReactNode;
  description: string;
  startBuildingText: string;
  githubButtonText: string;
  stars: number;
  signups: number;
  resumes: number;
}

export const HeroInteractive = ({
  title,
  description,
  startBuildingText,
  githubButtonText,
  stars,
  signups,
  resumes,
}: HeroInteractiveProps) => {
  const starsDisplay = stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars.toLocaleString();

  const proofStats = [
    { value: starsDisplay, label: 'GitHub stars', star: true },
    { value: signups.toLocaleString(), label: 'builders' },
    { value: resumes.toLocaleString(), label: 'resumes created' },
  ].filter((s) => s.value && s.value !== '0');

  const primaryCta = (
    <Button
      size="lg"
      className="group relative h-12 overflow-hidden rounded-full bg-gradient-primary px-8 text-base font-semibold text-white shadow-sm transition-all hover:shadow-glow"
    >
      <span className="relative z-10 flex items-center gap-2">
        {startBuildingText}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Button>
  );

  return (
    <section
      className="relative overflow-hidden bg-gradient-hero pb-20 pt-12 md:pb-28 md:pt-16 dark:bg-none dark:bg-background"
      id="hero"
    >
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <Sparkles className="size-4" />
            <span>Open-source · ATS-friendly · LaTeX-powered</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            {title}
          </h1>

          <p className="mx-auto mb-9 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {description}
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Show when="signed-in">
              <Link href="/templates">{primaryCta}</Link>
            </Show>
            <Show when="signed-out">
              <Link href="/sign-in">{primaryCta}</Link>
            </Show>

            <Link href="https://github.com/shubhamku044/la-resume" target="_blank" rel="noopener">
              <Button
                variant="outline"
                size="lg"
                className="group h-12 gap-2 rounded-full border-border font-medium"
              >
                <LuGithub className="size-4 transition-transform group-hover:scale-110" />
                {githubButtonText}
                <span className="ml-0.5 inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-foreground">
                  <Star className="size-3 fill-yellow-400 text-yellow-500" />
                  {starsDisplay}
                </span>
              </Button>
            </Link>
          </div>

          {proofStats.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {proofStats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-x-6">
                  {i > 0 && <span className="text-border">·</span>}
                  <span className="inline-flex items-center gap-1.5">
                    {s.star && <Star className="size-4 fill-yellow-400 text-yellow-500" />}
                    <strong className="font-semibold text-foreground">{s.value}</strong>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-border/60 shadow-elegant">
            <Image
              alt="La Resume builder interface"
              width={1024}
              height={800}
              src={getAssetUrl('/la-resume-mockup.webp')}
              className="w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
