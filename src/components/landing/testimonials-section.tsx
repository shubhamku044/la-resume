'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialsCarousel } from './testimonial-carousel';

export const TestimonialsSection = () => {
  return (
    <section className="bg-gray-50 py-20 dark:bg-gray-900 md:py-32" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-block rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
            Success Stories
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            What our users are saying
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Join thousands of job seekers who have found success with our resume builder
          </p>
        </motion.div>

        <TestimonialsCarousel />
      </div>
    </section>
  );
};
