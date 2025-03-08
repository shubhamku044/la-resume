'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FeedbackSchema, FeedbackSchemaType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
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

export default function FeedbackPage() {
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

      toast.success('Feedback submitted successfully!');
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
      <h1 className="mb-8 text-3xl font-bold">Send Feedback</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot field */}
        <input type="hidden" aria-hidden="true" {...register('honeypot')} />

        <div>
          <label className="mb-2 block text-sm font-medium">Name</label>
          <Input
            {...register('name')}
            placeholder="Your name"
            aria-invalid={!!errors.name}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Email</label>
          <Input
            {...register('email')}
            type="email"
            placeholder="your@email.com"
            aria-invalid={!!errors.email}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Feedback</label>
          <Textarea
            {...register('feedback')}
            placeholder="Your valuable feedback..."
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
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </form>
    </div>
  );
}
