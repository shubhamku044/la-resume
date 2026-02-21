import { Button } from '@/components/ui/button';
import { getAssetUrl } from '@/lib/assets';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { ArrowRight, Star, StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroInteractiveProps {
  title: React.ReactNode;
  description: string;
  startBuildingText: string;
  githubButtonText: string;
}

export const HeroInteractive = ({
  title,
  description,
  startBuildingText,
  githubButtonText,
}: HeroInteractiveProps) => {
  return (
    <section
      className="relative overflow-hidden bg-background pb-20 pt-10 md:pb-32 md:pt-16"
      id="hero"
    >
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="text-center">
          <div className="mb-6 inline-block rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
            <div className="flex items-center gap-2">
              <Star className="size-4 fill-yellow-400 text-yellow-500" />
              <span>Build beautiful resumes in minutes</span>
            </div>
          </div>

          <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-6xl">
            {title}
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl">
            {description}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <SignedIn>
              <Link href="/templates">
                <Button
                  size="lg"
                  className="group relative h-12 overflow-hidden rounded-full bg-purple-600 px-8 font-medium text-white transition-all hover:bg-purple-700 hover:shadow-lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {startBuildingText}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button
                  size="lg"
                  className="group relative h-12 overflow-hidden rounded-full bg-purple-600 px-8 font-medium text-white transition-all hover:bg-purple-700 hover:shadow-lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {startBuildingText}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
            </SignedOut>
            <div className="group relative">
              <Link href="https://github.com/shubhamku044/la-resume" target="_blank">
                <Button
                  variant="outline"
                  size="lg"
                  className="group h-12 rounded-full border-gray-300 font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-2">
                    <div className="transition-transform duration-300 ease-in-out group-hover:scale-110">
                      <StarIcon className="size-4" />
                    </div>

                    <span>{githubButtonText}</span>
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-20 max-w-5xl">
          <div className="relative overflow-hidden rounded-xl shadow-2xl">
            <div className="absolute inset-0 rounded-xl"></div>
            <Image
              alt="Resume Builder Interface"
              className="shadow-lg shadow-purple-300"
              width={1024}
              height={800}
              src={getAssetUrl('/la-resume-mockup.webp')}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
