'use client';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Star } from 'lucide-react';
import { AnimatedBackground } from '@/components';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export const HeroSection = () => {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -50]);
  const t = useTranslations('HomePage');

  return (
    <section
      className="relative overflow-hidden bg-background pb-20 pt-10 md:pb-32 md:pt-16"
      id="hero"
    >
      <AnimatedBackground />
      <motion.div
        className="container relative z-10 mx-auto px-4 sm:px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center">
          <div className="mb-6 inline-block rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
            <div className="flex items-center gap-2">
              <Star className="size-4 fill-yellow-400 text-yellow-500" />
              <span>Build beautiful resumes in minutes</span>
            </div>
          </div>

          <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-6xl">
            {t.rich('hero.title', {
              highlight: (chunks) => <span className="animated-text-gradient">{chunks}</span>,
            })}
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl">
            {t('hero.description')}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <SignedIn>
              <Button
                size="lg"
                className="group relative h-12 overflow-hidden rounded-full bg-purple-600 px-8 font-medium text-white transition-all hover:bg-purple-700 hover:shadow-lg"
                onClick={() => {
                  router.push('/templates');
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('hero.startBuilding')}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </SignedIn>
            <SignedOut>
              <SignInButton
                fallbackRedirectUrl="/templates"
                signUpFallbackRedirectUrl="/"
                mode="modal"
              >
                <Button
                  size="lg"
                  className="group relative h-12 overflow-hidden rounded-full bg-purple-600 px-8 font-medium text-white transition-all hover:bg-purple-700 hover:shadow-lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t('hero.startBuilding')}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </SignInButton>
            </SignedOut>

            <Button
              variant="outline"
              size="lg"
              className="h-12 rounded-full border-gray-300 font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
              onClick={() => window.open('https://github.com/shubhamku044/la-resume', '_blank')}
            >
              <div className="flex items-center gap-2">
                <Code className="size-4" />
                <span>{t('hero.githubButton')}</span>
              </div>
            </Button>
          </div>
        </div>

        <motion.div
          className="relative mx-auto mt-20 max-w-5xl"
          style={{ y, opacity }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
        >
          <div className="relative overflow-hidden rounded-xl shadow-2xl">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
            <Image
              alt="Resume Builder Interface"
              className="shadow-lg shadow-purple-300"
              width={1024}
              height={800}
              src="https://ik.imagekit.io/laresume/public/la-resume-mockup.webp?updatedAt=1741200085904"
            />
          </div>

          <motion.div
            className="absolute -right-20 top-10 size-20 rounded-full bg-purple-100 opacity-40 dark:bg-purple-900/50"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute -left-12 bottom-20 size-12 rounded-full bg-pink-100 opacity-60 dark:bg-pink-900/50"
            animate={{
              y: [0, 15, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
