'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const HowItWorksSection = () => {
  const t = useTranslations('HomePage');

  const steps = [
    {
      number: t('use.steps.0.number'),
      title: t('use.steps.0.title'),
      description: t('use.steps.0.description'),
    },
    {
      number: t('use.steps.1.number'),
      title: t('use.steps.1.title'),
      description: t('use.steps.1.description'),
    },
    {
      number: t('use.steps.2.number'),
      title: t('use.steps.2.title'),
      description: t('use.steps.2.description'),
    },
  ];

  return (
    <section id="how-it-works" className="bg-gray-50 py-20 dark:bg-gray-900 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-block rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
            {t('use.badge')}
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            {t('use.heading')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            {t('use.subheading')}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeInOut' }}
              className="group relative"
            >
              <div className="feature-card relative p-8">
                <div className="mb-6 text-5xl font-bold text-purple-500/20">{step.number}</div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>

                {index < steps.length - 1 && (
                  <motion.div
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 md:block"
                    animate={{ x: 0 }}
                    whileHover={{ x: 8 }} // Moves right slightly when hovered
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="size-7 transition-transform group-hover:translate-x-4" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
