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
    return NextResponse.json({ error: 'Error verifying webhook' }, { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url, created_at, updated_at } =
      evt.data;

    const primaryEmail = email_addresses && email_addresses[0]?.email_address;

    const userData = {
      clerk_id: id,
      email: primaryEmail,
      first_name: first_name, // Changed from firstName
      last_name: last_name, // Changed from lastName
      avatar_url: image_url,
      created_at: new Date(created_at).toISOString(),
      updated_at: new Date(updated_at).toISOString(),
    };

    const resp = await prisma.user.upsert({
      where: { clerk_id: id },
      create: userData,
      update: {
        email: primaryEmail,
        first_name: first_name, // Changed from firstName
        last_name: last_name, // Changed from lastName
        avatar_url: image_url,
        updated_at: new Date().toISOString(),
      },
    });

    console.log('console log', resp);

    console.log('Upserting user:', userData);

    console.log('Resp', resp);

    return NextResponse.json({ success: true });
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;

    await prisma.user.delete({
      where: { clerk_id: id },
    });

    console.log(`Successfully deleted user with clerk_id: ${id}`);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: true });
}
