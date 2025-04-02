interface UserDetails {
  userId: string;
  email: string;
  fullName: string;
  slug: string;
}

export const initiateLemonSqueezyCheckout = async ({
  productId,
  resumeType,
  userDetails,
}: {
  productId: string;
  resumeType: string;
  userDetails: UserDetails;
}) => {
  try {
    const res = await fetch('/api/lemon/purchaseProduct', {
      method: 'POST',
      body: JSON.stringify({
        productId,
        redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/resume/template/${resumeType}/${userDetails.slug}/`,
        userDetails,
      }),
    });

    const data = await res.json();

    if (data?.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    } else {
      throw new Error('Checkout URL not received');
    }
  } catch (error) {
    console.error('LemonSqueezy Error:', error);
    throw new Error('Failed to create LemonSqueezy order');
  }
};
