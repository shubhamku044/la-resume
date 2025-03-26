'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { MousePointer, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const ContactSection = () => {
  const t = useTranslations('HomePage.contact');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('toast_success'));
  };

  return (
    <section className="bg-gray-50 py-20 dark:bg-gray-900 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-block rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
            {t('badge')}
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            {t('heading')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-0 shadow-card">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-5">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 text-white md:col-span-2">
                  <h3 className="mb-6 text-2xl font-bold">{t('contact_info_title')}</h3>
                  <div className="space-y-4">
                    <p className="flex items-center gap-3">
                      <MousePointer className="size-5" />
                      <span>{t('website_label')}</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <Users className="size-5" />
                      <span>{t('email_label')}</span>
                    </p>
                  </div>
                </div>

                <div className="bg-white p-8 dark:bg-gray-800 md:col-span-3">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          {t('form.name_label')}
                        </label>
                        <Input
                          id="name"
                          placeholder={t('form.email_placeholder')}
                          className="bg-gray-50 dark:bg-gray-700"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          {t('form.email_label')}
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={t('form.email_placeholder')}
                          className="bg-gray-50 dark:bg-gray-700"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        {t('form.subject_label')}
                      </label>
                      <Input
                        id="subject"
                        placeholder={t('form.subject_placeholder')}
                        className="bg-gray-50 dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        {t('form.message_label')}
                      </label>
                      <Textarea
                        id="message"
                        placeholder={t('form.message_placeholder')}
                        className="h-32 bg-gray-50 dark:bg-gray-700"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full rounded-full bg-purple-600 hover:bg-purple-700"
                    >
                      {t('form.button')}
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
