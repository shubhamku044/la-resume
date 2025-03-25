'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Layout, Download, SlidersHorizontal, Sparkles, Zap } from 'lucide-react';

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

export const FeaturesSection = () => {
  const features = [
    {
      icon: <Layout className="size-8 text-purple-500" />,
      title: 'Professional Templates',
      description:
        'Choose from a variety of ATS-friendly resume templates designed by professionals.',
    },
    {
      icon: <SlidersHorizontal className="size-8 text-purple-500" />,
      title: 'Easy Customization',
      description:
        'Customize every aspect of your resume with our intuitive, drag-and-drop editor.',
    },
    {
      icon: <Eye className="size-8 text-purple-500" />,
      title: 'Real-time Preview',
      description: 'See changes to your resume in real-time as you make them.',
    },
    {
      icon: <Download className="size-8 text-purple-500" />,
      title: 'Multiple Formats',
      description:
        'Export your resume in PDF, DOCX, or TXT formats for different application requirements.',
    },
    {
      icon: <Zap className="size-8 text-purple-500" />,
      title: 'ATS Optimization',
      description: 'Our templates are designed to pass Applicant Tracking Systems with ease.',
    },
    {
      icon: <Sparkles className="size-8 text-purple-500" />,
      title: 'AI Suggestions',
      description: 'Get smart content suggestions to improve your resume and stand out.',
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-block rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
            Powerful Features
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            Everything you need to create the perfect resume
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Our resume builder combines beautiful design with powerful features to help you create a
            resume that stands out.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="feature-card p-8"
            >
              <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-900/30">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
