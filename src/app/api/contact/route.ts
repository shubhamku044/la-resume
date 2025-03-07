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
    const { name, email, message, honeypot } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (honeypot) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: ['shubhamku044@gmail.com', 'laresumetech@gmail.com', 'priyabrata8558@gmail.com'],
      subject: `LaResume: New Contact Form Submission from ${name}`,
      html: `
                <h2>New Message Received</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Data received successfully',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request', message: error }, { status: 500 });
  }
}