import axios from 'axios';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { productId, redirect_url, userDetails } = await req.json();

    const response = await axios.post(
      'https://api.lemonsqueezy.com/v1/checkouts',
      {
        data: {
          type: 'checkouts',
          attributes: {
            product_id: productId,
            checkout_options: {
              success_url: redirect_url,
              cancel_url: redirect_url,
            },
            checkout_data: {
              email: userDetails.email,
              name: userDetails.fullName,
            },
            custom: {
              user_id: userDetails.userId ?? '',
              slug: userDetails.slug,
            },
          },
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
        },
      }
    );

    const checkoutUrl = response.data?.data?.attributes?.url;

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error('LemonSqueezy Checkout Error:', error);
    return NextResponse.json(
      { error: 'Failed to create LemonSqueezy checkout session' },
      { status: 500 }
    );
  }
}
