import { FeedbackSchema } from '@/types';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate the request body against the schema
    const validation = FeedbackSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.flatten();
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: errors.fieldErrors,
        },
        { status: 400 }
      );
    }

    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bot detected',
        },
        { status: 400 }
      );
    }

    const { name, email, subject, feedback } = validation.data;

    // Prepare and send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: ['shubhamku044@gmail.com', 'laresumetech@gmail.com', 'priyabrata8558@gmail.com'],
      subject: `LaResume: New Contact Form Submission - ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <h3>Message:</h3>
        <p>${feedback}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!',
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to submit the form. Please try again later.',
      },
      { status: 500 }
    );
  }
}
