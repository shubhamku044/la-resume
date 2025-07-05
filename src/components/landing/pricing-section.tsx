'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  Eye,
  Link as LinkIcon,
  RefreshCw,
  Share2,
  Users,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

export const PricingSection = () => {
  const router = useRouter();
  const t = useTranslations('HomePage.pricing');
  const features = [
    {
      icon: <Download className="size-5 text-green-500" />,
      title: t('features.unlimited_downloads.title'),
      description: t('features.unlimited_downloads.description'),
    },
    {
      icon: <Share2 className="size-5 text-blue-500" />,
      title: t('features.shareable_links.title'),
      description: t('features.shareable_links.description'),
    },
    {
      icon: <RefreshCw className="size-5 text-purple-500" />,
      title: t('features.auto_updates.title'),
      description: t('features.auto_updates.description'),
    },
    {
      icon: <Eye className="size-5 text-orange-500" />,
      title: t('features.analytics.title'),
      description: t('features.analytics.description'),
    },
    {
      icon: <Users className="size-5 text-pink-500" />,
      title: t('features.no_login.title'),
      description: t('features.no_login.description'),
    },
    {
      icon: <Clock className="size-5 text-teal-500" />,
      title: t('features.realtime.title'),
      description: t('features.realtime.description'),
    },
  ];

  return (
    <section id="pricing" className="bg-gray-50 py-20 dark:bg-gray-900 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-block rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
            {t('badge')}
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            {t('title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            {t('description')}
          </p>
        </motion.div>

        <div className="gap-8 w-full flex justify-center items-center lg:gap-12">
          {/* Pricing Card */}
          <motion.div
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.1 }}
            className="flex justify-center"
          >
            <Card className="relative w-full max-w-md overflow-hidden border-2 border-purple-200 shadow-xl dark:border-purple-800">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20" />
              <div className="relative">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                    <DollarSign className="size-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('card.title')}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {t('card.description')}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="mb-6 text-center">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900 dark:text-white">
                        $0.99
                      </span>
                      <span className="ml-2 text-lg text-gray-500 dark:text-gray-400">
                        {t('card.currency')}
                      </span>
                    </div>
                    <Badge variant="secondary" className="mt-2">
                      {t('card.badge')}
                    </Badge>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="size-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {t('card.features.unlimited_downloads')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="size-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {t('card.features.shareable_links')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="size-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {t('card.features.auto_updates')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="size-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {t('card.features.analytics')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="size-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {t('card.features.no_expiration')}
                      </span>
                    </div>
                  </div>

                  <SignedIn>
                    <Button
                      onClick={() => {
                        router.push('/templates/made-by-you');
                      }}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3"
                    >
                      {t('card.button')}
                    </Button>
                  </SignedIn>
                  <SignedOut>
                    <Link href="/sign-in">
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3">
                        {t('card.button')}
                      </Button>
                    </Link>
                  </SignedOut>
                </CardContent>
              </div>
            </Card>
          </motion.div>

          {/* Features Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-700 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <h3 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
            {t('how_it_works.title')}
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <span className="text-lg font-bold text-purple-600 dark:text-purple-300">1</span>
              </div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                {t('how_it_works.step1.title')}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t('how_it_works.step1.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <span className="text-lg font-bold text-blue-600 dark:text-blue-300">2</span>
              </div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                {t('how_it_works.step2.title')}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t('how_it_works.step2.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <span className="text-lg font-bold text-green-600 dark:text-green-300">3</span>
              </div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                {t('how_it_works.step3.title')}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t('how_it_works.step3.description')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Card className="mx-auto max-w-2xl border-dashed border-2 border-gray-300 dark:border-gray-600 bg-transparent">
            <CardContent className="p-8">
              <LinkIcon className="mx-auto mb-4 size-8 text-gray-400" />
              <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                {t('smart_sharing.title')}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">{t('smart_sharing.description')}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
