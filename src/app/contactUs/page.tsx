'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FeedbackSchema, FeedbackSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

type ApiSuccessResponse = {
  success: true;
  message: string;
};

type ApiErrorResponse = {
  success: false;
  error: string;
};

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<FeedbackSchemaType>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      name: '',
      email: '',
      feedback: '',
      honeypot: '',
    },
  });
  const t = useTranslations('contact');

  const onSubmit: SubmitHandler<FeedbackSchemaType> = async (data) => {
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

      toast.success(t('toast.success'));
      reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : t('toast.error');
      toast.error(message);

      // Set form error for honeypot
      if (message.includes('Bot')) {
        setError('root', { message });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">{t('title')}</h1>
        <p className="mb-8 text-center text-gray-600">{t('description')}</p>

        {/* Contact Information */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-700">{t('contactInformation')}</h2>
            <ul className="space-y-3 text-gray-600">
              <li>{t.rich('merchantName', { strong: (chunk) => <strong>{chunk}</strong> })}</li>
              <li>
                {t.rich('registeredAddress', {
                  strong: (chunk) => <strong>{chunk}</strong>,
                })}
              </li>
              <li>
                {t.rich('operationalAddress', {
                  strong: (chunk) => <strong>{chunk}</strong>,
                })}
              </li>
              <li>{t.rich('phoneNumber', { strong: (chunk) => <strong>{chunk}</strong> })}</li>
              <li>{t.rich('email', { strong: (chunk) => <strong>{chunk}</strong> })}</li>
            </ul>
          </div>

          {/* Feedback Form */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-700">{t('sendMessage')}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Honeypot field */}
              <input type="hidden" aria-hidden="true" {...register('honeypot')} />

              <div>
                <label className="mb-2 block text-sm font-medium">{t('form.name')}</label>
                <Input
                  {...register('name')}
                  placeholder={t('form.namePlaceholder')}
                  aria-invalid={!!errors.name}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">{t('form.email')}</label>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder={t('form.emailPlaceholder')}
                  aria-invalid={!!errors.email}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">{t('form.message')}</label>
                <Textarea
                  {...register('feedback')}
                  placeholder={t('form.messagePlaceholder')}
                  rows={5}
                  aria-invalid={!!errors.feedback}
                  className={errors.feedback ? 'border-red-500' : ''}
                />
                {errors.feedback && (
                  <p className="mt-1 text-sm text-red-500">{errors.feedback.message}</p>
                )}
              </div>

              {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t('form.submitting') : t('form.submit')}
              </Button>
            </form>
          </div>
        </div>

        {/* Map Location */}
        <div className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">{t('mapLocation')}</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.123456789012!2d88.12345678901234!3d23.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f771f0b9f8e3f3%3A0x6ec00f9dea6ee44f!2sEast%20Ave%2C%20Ambuja%2C%20Durgapur%2C%20West%20Bengal%20713216!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            title="Google Maps"
            loading="lazy"
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Customer Support Hours */}
        <div className="text-center">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">{t('supportHours')}</h2>
          <p className="text-gray-600">
            {t.rich('timing', { strong: (chunk) => <strong>{chunk}</strong> })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
