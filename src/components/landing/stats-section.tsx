'use client';
import React from 'react';
import { motion } from 'framer-motion';

export const StatsSection = () => {
  return (
    <section className="bg-gray-50 py-12 dark:bg-gray-900 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[
            { value: '10K+', label: 'Resumes Created' },
            { value: '98%', label: 'ATS Success Rate' },
            { value: '15+', label: 'Template Designs' },
            { value: '24/7', label: 'Customer Support' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <p className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
