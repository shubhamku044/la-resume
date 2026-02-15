'use client';

import LanguageSelectorDropdown from '@/components/language-selector-dropdown';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { reviews } from '@/data/review';
import { getAssetUrl } from '@/lib/assets';
import { SignIn } from '@clerk/nextjs';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  CheckCircle,
  ChevronLeft,
  Clock,
  Download,
  FileText,
  Globe,
  Laptop,
  Quote,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Users,
  Zap,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SignInPage() {
  const t = useTranslations('signIn');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const stats = [
    { label: t('stats.resumesCreated'), value: '2,000+', icon: FileText },
    { label: t('stats.happyUsers'), value: '1,600+', icon: Users },
    { label: t('stats.templates'), value: '3', icon: Award },
    { label: t('stats.countries'), value: '50+', icon: Star },
  ];

  const features = [
    {
      title: t('features.aiPowered.title'),
      description: t('features.aiPowered.description'),
      icon: Sparkles,
    },
    {
      title: t('features.atsFriendly.title'),
      description: t('features.atsFriendly.description'),
      icon: Zap,
    },
    {
      title: t('features.instantDownload.title'),
      description: t('features.instantDownload.description'),
      icon: Download,
    },
    {
      title: t('features.privacySecure.title'),
      description: t('features.privacySecure.description'),
      icon: Shield,
    },
  ];

  const companies = ['Google', 'Microsoft', 'Apple', 'Meta', 'Netflix', 'Spotify'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen overflow-y-auto scrollbar-hide bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col ">
        {/* Header */}
        <header className="px-3 py-3 sm:px-6 lg:px-8 shrink-0">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <ChevronLeft className="h-4 w-4 text-gray-600 group-hover:text-gray-900 transition-colors lg:hidden" />
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                La Resume
              </span>
            </Link>

            <div className="flex items-center gap-3 mr-2">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Globe className="h-4 w-4" />
                <span>{t('header.usedInCountries')}</span>
              </div>
              <LanguageSelectorDropdown showLabel={false} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 px-3 sm:px-6 lg:px-8 mb-5 overflow-y-auto scrollbar-hide ">
          <div className="mx-auto max-w-7xl h-full">
            <div className="grid lg:grid-cols-5 gap-4 lg:gap-8 h-fit min-h-full items-center">
              {/* Left Side - Marketing Content */}
              <div className="lg:col-span-3 space-y-4 lg:space-y-6 order-2 lg:order-1 lg:overflow-visible">
                {/* Hero Text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center lg:text-left"
                >
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {t('hero.title')}
                    </span>
                  </h1>
                  <p className="mt-3 lg:mt-4 text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    {t('hero.subtitle')}
                  </p>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="grid grid-cols-2 lg:grid-cols-4 gap-3"
                >
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className="text-center p-3 lg:p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/30 dark:bg-gray-800/70 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center justify-center mb-2">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg">
                          <stat.icon className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Features Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white text-center lg:text-left">
                    {t('features.title')}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        className="p-3 lg:p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/30 dark:bg-gray-800/70 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 group shadow-lg hover:shadow-xl"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <feature.icon className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {feature.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Testimonial Carousel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="relative h-48 lg:h-52"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Card className="border-0 bg-gradient-to-r from-white/80 to-indigo-50/80 backdrop-blur-sm shadow-xl dark:from-gray-800/80 dark:to-indigo-900/80 overflow-hidden h-full">
                        <CardContent className="p-4 lg:p-6 h-full flex flex-col justify-between">
                          <div className="flex items-start gap-3">
                            <Quote className="h-6 w-6 text-indigo-500 shrink-0 mt-1" />
                            <div className="space-y-3 flex-1">
                              <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed text-sm lg:text-base">
                                &quot;{reviews[currentTestimonial].body}&quot;
                              </p>
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full overflow-hidden shadow-lg relative">
                                  <Image
                                    src={getAssetUrl(reviews[currentTestimonial].avatar)}
                                    alt={reviews[currentTestimonial].name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900 dark:text-white">
                                    {reviews[currentTestimonial].name}
                                  </div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {reviews[currentTestimonial].username} •{' '}
                                    {reviews[currentTestimonial].social}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </AnimatePresence>

                  {/* Testimonial Dots */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center gap-2">
                    {reviews.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                          index === currentTestimonial
                            ? 'bg-indigo-500 w-6'
                            : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-center lg:text-left"
                >
                  <p className="text-lg font-medium text-gray-500 dark:text-gray-400 ">
                    {t('trustIndicators.trustedBy')}
                  </p>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 opacity-70">
                    {companies.map((company, index) => (
                      <motion.div
                        key={company}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                        className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                      >
                        {company}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Side - Sign In Form */}
              <div className="lg:col-span-2 order-1 lg:order-2 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full max-w-sm lg:max-w-md"
                >
                  <Card className="border-0 bg-white/95 backdrop-blur-lg shadow-2xl dark:bg-gray-800/95 overflow-hidden">
                    <CardHeader className="text-center space-y-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 px-4 py-6">
                      <div className="flex items-center justify-center">
                        <div className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg">
                          <FileText className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                          {t('signInCard.welcomeBack')}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          {t('signInCard.subtitle')}
                        </p>
                      </div>
                    </CardHeader>

                    <CardContent className="p-4 lg:p-6 space-y-4">
                      <div className="flex justify-center">
                        <SignIn
                          afterSignInUrl="/templates"
                          afterSignUpUrl="/templates"
                          appearance={{
                            elements: {
                              rootBox: 'w-full',

                              card: 'shadow-none border-0 bg-transparent',
                              headerTitle: 'hidden',
                              headerSubtitle: 'hidden',
                              socialButtonsBlockButton:
                                'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 transition-all duration-200 rounded-xl font-medium shadow-sm hover:shadow-md text-base py-3',
                              formButtonPrimary:
                                'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 rounded-xl font-semibold text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] py-2',
                              footerActionLink:
                                'text-indigo-600 hover:text-indigo-700 transition-colors duration-200 font-medium',
                              formFieldInput:
                                ' rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200 text-sm ',
                              formFieldLabel:
                                'text-gray-700 dark:text-gray-300 font-medium text-sm',
                              dividerLine: 'bg-gray-200 dark:bg-gray-700',
                              dividerText: 'text-gray-500 font-medium text-sm',
                              formFieldAction:
                                'text-indigo-600 hover:text-indigo-700 font-medium text-sm',
                            },
                            variables: {
                              colorPrimary: '#4f46e5',
                              colorText: '#374151',
                              colorTextSecondary: '#6b7280',
                              colorBackground: '#ffffff',
                              colorInputBackground: '#ffffff',
                              colorInputText: '#374151',
                              borderRadius: '0.75rem',
                              fontSize: '0.875rem',
                            },
                          }}
                        />
                      </div>

                      {/* Additional Features */}
                      <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="size-3 lg:size-5 text-green-500 shrink-0" />
                          <span>{t('features.freeToStart')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="size-3 lg:size-5 text-blue-500 shrink-0" />
                          <span>{t('features.quickCreation')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                          <Shield className="size-3 lg:size-5 text-indigo-500 shrink-0" />
                          <span>{t('features.secureData')}</span>
                        </div>
                      </div>

                      <div className="text-center lg:text-left pt-2">
                        <p className="text-xs  text-gray-500 dark:text-gray-400 leading-relaxed">
                          {t('legal.agreementText')}{' '}
                          <Link
                            href="/termsAndConditions"
                            className="text-indigo-600 hover:text-indigo-700 transition-colors duration-200 underline"
                          >
                            {t('legal.termsOfService')}
                          </Link>{' '}
                          {t('legal.and')}{' '}
                          <Link
                            href="/privacyPolicy"
                            className="text-indigo-600 hover:text-indigo-700 transition-colors duration-200 underline"
                          >
                            {t('legal.privacyPolicy')}
                          </Link>
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Device Compatibility */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-4 text-center"
                  >
                    <p className="text-xs lg:text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      {t('deviceCompatibility.worksOnAllDevices')}
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Smartphone className="h-3 w-3" />
                        <span>{t('deviceCompatibility.mobile')}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Laptop className="h-3 w-3" />
                        <span>{t('deviceCompatibility.desktop')}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
