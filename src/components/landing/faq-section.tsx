'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const FAQSection = () => {
  const faqs = [
    {
      question: 'Is this resume builder really free?',
      answer:
        'Yes, our core features are completely free to use. You can create, edit, and download your resume without any payment required.',
    },
    {
      question: 'Are the templates ATS-friendly?',
      answer:
        'Absolutely! All of our templates are designed to pass through Applicant Tracking Systems with flying colors.',
    },
    {
      question: 'Can I create multiple resumes?',
      answer:
        'Yes, you can create multiple versions of your resume for different job applications and industries.',
    },
    {
      question: 'How do I export my resume?',
      answer:
        'You can download your resume in PDF, DOCX, or TXT formats with just a single click from the editor.',
    },
  ];

  return (
    <section className="py-20 md:py-32" id="faq">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-block rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
            Frequently Asked Questions
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            Got questions? We have answers
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Find answers to common questions about our resume builder
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="rounded-lg border border-gray-200 px-6 dark:border-gray-700"
                >
                  <AccordionTrigger className="py-4 text-left font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
