'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const HowItWorksSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Choose a Template',
      description:
        'Select from our professionally designed templates that are optimized for ATS systems.',
    },
    {
      number: '02',
      title: 'Add Your Content',
      description: 'Fill in your information using our intuitive editor with helpful suggestions.',
    },
    {
      number: '03',
      title: 'Download & Apply',
      description:
        'Export your resume in your preferred format and start applying for jobs immediately.',
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
            Simple Process
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            Three steps to your perfect resume
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Creating a professional resume has never been easier
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="feature-card p-8">
                <div className="mb-6 text-5xl font-bold text-purple-500/20">{step.number}</div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-gray-300 dark:text-gray-600 md:block">
                  <ArrowRight className="size-8" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
