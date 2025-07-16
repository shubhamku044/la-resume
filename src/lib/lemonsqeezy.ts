'use client';

type Product = {
  product_id: string;
  name: string;
  redirectUrl: string;
  userId?: string;
  email?: string;
  fullName?: string;
  slug: string;
};

export const useLemonCheckout = () => {
  const checkoutProduct = async (product: Product) => {
    try {
      const res = await fetch('/api/lemon/purchaseProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.product_id,
          redirect_url: product.redirectUrl,
          userDetails: {
            email: product.email,
            fullName: product.fullName,
            slug: product.slug,
            userId: product.userId,
          },
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

  return { checkoutProduct };
};
