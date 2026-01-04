import { dodopayments, isDodoPaymentsAvailable } from '@/lib/dodopayments';
import { headers } from 'next/headers';
import { Webhook } from 'standardwebhooks';

// Handle missing webhook key gracefully
const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
const webhook = webhookKey ? new Webhook(webhookKey) : null;

export async function POST(request: Request) {
  const headersList = await headers();

  try {
    // Check if DodoPayments and webhook are properly configured
    if (!isDodoPaymentsAvailable() || !dodopayments) {
      return Response.json({ message: 'Payment service not configured' }, { status: 503 });
    }

    if (!webhook) {
      return Response.json({ message: 'Webhook not configured' }, { status: 503 });
    }

    const rawBody = await request.text();
    const webhookHeaders = {
      'webhook-id': headersList.get('webhook-id') || '',
      'webhook-signature': headersList.get('webhook-signature') || '',
      'webhook-timestamp': headersList.get('webhook-timestamp') || '',
    };
    await webhook.verify(rawBody, webhookHeaders);
    const payload = JSON.parse(rawBody);

    if (payload.data.payload_type === 'Subscription') {
      switch (payload.type) {
        case 'subscription.active':
          await dodopayments.subscriptions.retrieve(payload.data.subscription_id);
          break;
        case 'subscription.failed':
          break;
        case 'subscription.cancelled':
          break;
        case 'subscription.renewed':
          break;
        case 'subscription.on_hold':
          break;
        default:
          break;
      }
    } else if (payload.data.payload_type === 'Payment') {
      switch (payload.type) {
        case 'payment.succeeded':
          const paymentDataResp = await dodopayments.payments.retrieve(payload.data.payment_id);
          const slug = paymentDataResp.metadata.metadata_slug;
          const orderNumber = paymentDataResp.payment_id;
          await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/${slug}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderNumber }),
          });
          break;
        default:
          break;
      }
    }
    return Response.json({ message: 'Webhook processed successfully' }, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'webhook processing failed', error }, { status: 500 });
  }
}
