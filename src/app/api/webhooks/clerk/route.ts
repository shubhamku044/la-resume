import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  const svix_id = req.headers.get('svix-id');
  const svix_timestamp = req.headers.get('svix-timestamp');
  const svix_signature = req.headers.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return NextResponse.json({ error: 'Error verifying webhook', message: err }, { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url, created_at, updated_at } =
      evt.data;

    const primaryEmail = email_addresses && email_addresses[0]?.email_address;

    const userData = {
      clerkId: id,
      email: primaryEmail,
      firstName: first_name,
      lastName: last_name,
      avatarUrl: image_url,
      createdAt: new Date(created_at).toISOString(),
      updatedAt: new Date(updated_at).toISOString(),
    };

    const resp = await prisma.user.upsert({
      where: { clerkId: id },
      create: userData,
      update: {
        email: primaryEmail,
        firstName: first_name,
        lastName: last_name,
        avatarUrl: image_url,
        updatedAt: new Date().toISOString(),
      },
    });

    if (!resp) {
      console.error(`Failed to upsert user with clerk_id: ${id}`);
      return NextResponse.json({ success: false });
    }

    return NextResponse.json({ success: true });
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;

    const user = await prisma.user.findUnique({
      where: { clerkId: id },
    });

    if (!user) {
      return NextResponse.json({ success: true });
    }

    const { count } = await prisma.user.deleteMany({
      where: { clerkId: id },
    });

    if (count === 0) {
      console.error(`Failed to delete user with clerk_id: ${id}`);
      return NextResponse.json({ success: false });
    }

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: true });
}
