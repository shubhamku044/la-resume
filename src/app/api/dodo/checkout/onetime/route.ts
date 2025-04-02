import { dodopayments } from '@/lib/dodopayments';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const redirectUrl = searchParams.get('redirect_url');
    const email = searchParams.get('email');
    const fullName = searchParams.get('fullName');
    const slug = searchParams.get('slug');
    // console.log('productId:', productId);
    // console.log('redirectUrl:', redirectUrl);

    if (!productId || !redirectUrl || !slug) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const productWithQuantity = { product_id: productId, quantity: 1 };

    const response = await dodopayments.payments.create({
      billing: {
        city: '',
        country: 'IN',
        state: '',
        street: '',
        zipcode: '',
      },
      customer: {
        email: email || 'sample@email.com',
        name: fullName || 'John Doe',
      },
      payment_link: true,
      product_cart: [productWithQuantity],
      return_url: redirectUrl,
      metadata: {
        metadata_slug: slug,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to initiate checkout' }, { status: 500 });
  }
}
