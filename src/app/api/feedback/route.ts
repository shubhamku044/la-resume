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

    const validation = FeedbackSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    if (body.honeypot) {
      return NextResponse.json({ error: 'Bot detected' }, { status: 400 });
    }

    const { name, email, feedback } = validation.data;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: ['shubhamku044@gmail.com', 'laresumetech@gmail.com', 'priyabrata8558@gmail.com'],
      subject: `LaResume: New Feedback from ${name}`,
      html: `
        <h2>New Feedback Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Feedback:</strong> ${feedback}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Feedback received successfully',
    });
  } catch (error) {
    console.error('Feedback submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
