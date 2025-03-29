import { lemonSqueezyApiInstance } from '@/utils/axios';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const reqData = await req.json();

    if (!reqData.productId)
      return Response.json({ message: 'productId is required' }, { status: 400 });

    if (!reqData.redirect_url) {
      return Response.json({ message: 'redirect_url is required' }, { status: 400 });
    }

    if (!reqData.userDetails) {
      return Response.json({ message: 'userDetails is required' }, { status: 400 });
    }

    const response = await lemonSqueezyApiInstance.post('/checkouts', {
      data: {
        type: 'checkouts',
        attributes: {
          product_options: { redirect_url: reqData.redirect_url },
          checkout_data: {
            custom: {
              user_id: reqData.userDetails.userId,
              email: reqData.userDetails.email,
              full_name: reqData.userDetails.fullName,
              slug: reqData.userDetails.slug,
            },
          },
        },
        relationships: {
          store: {
            data: {
              type: 'stores',
              id: process.env.LEMON_SQUEEZY_STORE_ID?.toString(),
            },
          },
          variant: {
            data: {
              type: 'variants',
              id: reqData.productId.toString(),
            },
          },
        },
      },
    });

    const checkoutUrl = response.data.data.attributes.url;

    console.log(response.data);

    return Response.json({ checkoutUrl });
  } catch (error) {
    console.error(error);
    Response.json({ message: 'An error occured' }, { status: 500 });
  }
}
