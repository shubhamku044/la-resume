import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
  });

  const options = {
    amount: body.amount, // amount in paise (₹50 = 5000)
    currency: body.currency,
    receipt: body.receipt,
  };

  try {
    const order = await instance.orders.create(options);
    return NextResponse.json(order);
  } catch (err) {
    console.error('Razorpay Order Error:', err);
    return NextResponse.json({ error: 'Failed to create Razorpay order' }, { status: 500 });
  }
}
