import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';

export async function POST(request: NextRequest) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json('Required env secrets not set!', { status: 400 });
  }

  const rawBody = await request.text();
  const signature = Buffer.from(request.headers.get('X-Signature') ?? '', 'hex');

  if (signature.length === 0 || rawBody.length === 0) {
    return NextResponse.json('Invalid request', { status: 400 });
  }

  const hmac = Buffer.from(
    crypto.createHmac('sha256', secret).update(rawBody).digest('hex'),
    'hex'
  );

  if (!crypto.timingSafeEqual(hmac, signature)) {
    return NextResponse.json('Invalid request', { status: 400 });
  }

  const data = JSON.parse(rawBody);
  if (data.meta.event_name === 'order_created') {
    if (data.data.status === 'paid') {
      const slug = data.meta.custom_data.slug;
      const orderNumber = data.data.attributes.id;
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber }),
      });
    }
  }

  // ...

  return NextResponse.json('OK', { status: 200 });
}
