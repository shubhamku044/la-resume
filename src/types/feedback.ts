import { z } from 'zod';

export const FeedbackSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name cannot exceed 50 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  subject: z
    .string()
    .min(2, { message: 'Subject is required' })
    .max(100, { message: 'Subject cannot exceed 100 characters' }),
  feedback: z
    .string()
    .min(100, { message: 'Feedback must be at least 100 characters' })
    .max(2000, { message: 'Feedback cannot exceed 2000 characters' }),
  honeypot: z.string().max(0, { message: 'Bot detected' }).optional(),
});

export type FeedbackSchemaType = z.infer<typeof FeedbackSchema>;
