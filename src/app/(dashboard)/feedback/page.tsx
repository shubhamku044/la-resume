'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FeedbackSchema, FeedbackSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

type ApiSuccessResponse = {
  success: true;
  message: string;
};

type ApiErrorResponse = {
  success: false;
  error: string;
};

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

export default function FeedbackPage() {
  const user = useUser();
  const userName = user.user?.fullName;
  const userEmail = user.user?.primaryEmailAddress?.emailAddress;
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    setValue,
  } = useForm<FeedbackSchemaType>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      name: '',
      email: userEmail || '', // Prefill with user's email
      subject: '',
      feedback: '',
      honeypot: '',
    },
  });

  useEffect(() => {
    // Set the email value if userEmail is available after the component mounts
    if (userEmail) {
      setValue('email', userEmail);
    }
    if (userName) {
      setValue('name', userName);
    }
  }, [userEmail, setValue, userName]);

  const onSubmit: SubmitHandler<FeedbackSchemaType> = async (data) => {
    try {
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

      toast.success(t('HomePage.contact.toast_success'));
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
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-8 text-3xl font-bold">{t('HomePage.contact.heading')}</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">{t('HomePage.contact.description')}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot field */}
        <input type="hidden" aria-hidden="true" {...register('honeypot')} />

        <div>
          <label className="mb-2 block text-sm font-medium">
            {t('HomePage.contact.form.name_label')}
          </label>
          <Input
            {...register('name')}
            placeholder={t('HomePage.contact.form.name_placeholder')}
            aria-invalid={!!errors.name}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            {t('HomePage.contact.form.email_label')}
          </label>
          <Input
            {...register('email')}
            type="email"
            placeholder={t('HomePage.contact.form.email_placeholder')}
            aria-invalid={!!errors.email}
            className={errors.email ? 'border-red-500' : ''}
            disabled // Make the email field disabled
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            {t('HomePage.contact.form.subject_label')}
          </label>
          <Input
            {...register('subject')}
            placeholder={t('HomePage.contact.form.subject_placeholder')}
            aria-invalid={!!errors.subject}
            className={errors.subject ? 'border-red-500' : ''}
          />
          {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            {t('HomePage.contact.form.message_label')}
          </label>
          <Textarea
            {...register('feedback')}
            placeholder={t('HomePage.contact.form.message_placeholder')}
            rows={5}
            aria-invalid={!!errors.feedback}
            className={errors.feedback ? 'border-red-500' : ''}
          />
          {errors.feedback && (
            <p className="mt-1 text-sm text-red-500">
              {errors.feedback.message}
              {errors.feedback.type === 'too_small' && ' (Minimum 100 characters required)'}
              {errors.feedback.type === 'too_big' && ' (Maximum 2000 characters allowed)'}
            </p>
          )}
        </div>

        {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? t('contact.form.submitting') : t('HomePage.contact.form.button')}
        </Button>
      </form>
    </div>
  );
}
