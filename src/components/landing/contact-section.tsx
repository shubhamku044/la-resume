'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { MousePointer, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type ApiSuccessResponse = {
  success: true;
  message: string;
};

type ApiErrorResponse = {
  success: false;
  error: string;
};

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

const ContactSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  subject: z.string().min(2, { message: 'Subject is required' }),
  feedback: z.string().min(10, { message: 'Message must be at least 10 characters' }),
  honeypot: z.string().max(0, { message: 'Bot submission detected' }), // Honeypot field
});

type ContactSchemaType = z.infer<typeof ContactSchema>;

export const ContactSection = () => {
  const t = useTranslations('HomePage.contact');
  const t_contact = useTranslations('contact.form');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<ContactSchemaType>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      feedback: '',
      honeypot: '',
    },
  });

  const onSubmit: SubmitHandler<ContactSchemaType> = async (data) => {
    try {
      // Honeypot check
      if (data.honeypot) {
        throw new Error('Bot submission detected');
      }

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result: ApiResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.success ? result.message : result.error);
      }

      toast.success(t('toast_success'));
      reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to submit feedback';
      toast.error(message);

      // Set form error for honeypot
      if (message.includes('Bot')) {
        setError('root', { message });
      }
    }
  };

  return (
    <section className="bg-gray-50 py-20 dark:bg-gray-900 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-block rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
            {t('badge')}
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            {t('heading')}
          </h2>
          <p className="mx-auto max-w-4xl text-lg text-gray-600 dark:text-gray-300">
            {t('description')}
          </p>
        </div>

        <div>
          <Card className="overflow-hidden border-0 shadow-lg">
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
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input type="hidden" aria-hidden="true" {...register('honeypot')} />

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
                          placeholder={t('form.name_placeholder')}
                          className={`bg-gray-50 dark:bg-gray-700 ${errors.name ? 'border-red-500' : ''}`}
                          {...register('name')}
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                        )}
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
                          className={`bg-gray-50 dark:bg-gray-700 ${errors.email ? 'border-red-500' : ''}`}
                          {...register('email')}
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                        )}
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
                        className={`bg-gray-50 dark:bg-gray-700 ${errors.subject ? 'border-red-500' : ''}`}
                        {...register('subject')}
                        aria-invalid={!!errors.subject}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                      )}
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
                        className={`h-32 bg-gray-50 dark:bg-gray-700 ${errors.feedback ? 'border-red-500' : ''}`}
                        {...register('feedback')}
                        aria-invalid={!!errors.feedback}
                      />
                      {errors.feedback && (
                        <p className="mt-1 text-sm text-red-500">{errors.feedback.message}</p>
                      )}
                    </div>

                    {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}

                    <Button
                      type="submit"
                      className="w-full lg:text-lg  rounded-full bg-purple-600 hover:bg-purple-700 "
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t_contact('submitting') : t('form.button')}
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
