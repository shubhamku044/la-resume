import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Clone the body stream for signature verification
    const rawBody = await req.text();
    const eventType = req.headers.get('X-Event-Name');
    const signature = req.headers.get('X-Signature');

    if (!signature) {
      throw new Error('Missing signature header.');
    }

    // Validate signature
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE_KEY;
    if (!secret) {
      throw new Error('Missing webhook secret.');
    }

    const hmac = crypto.createHmac('sha256', secret);
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const receivedSignature = Buffer.from(signature, 'utf8');

    if (!crypto.timingSafeEqual(digest, receivedSignature)) {
      throw new Error('Invalid signature.');
    }

    // Parse JSON after signature verification
    const body = JSON.parse(rawBody);

    console.log('Webhook Body:', body);

    // Handle the event
    if (eventType === 'order_created') {
      const userId: string | undefined = body?.meta?.custom_data?.user_id;
      const isSuccessful: boolean = body?.data?.attributes?.status === 'paid';

      console.log(
        `User ID: ${userId}, Payment Status: ${isSuccessful} , slug : ${body?.meta?.custom_data?.slug}`
      );
      const slug = body?.meta?.custom_data?.slug;
      const orderNumber = body?.data?.attributes?.order_number;
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber }),
      });
    }

    return NextResponse.json({ message: 'Webhook received' });
  } catch (err) {
    console.error('Webhook Error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
