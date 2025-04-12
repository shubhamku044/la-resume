import DodoPayments from 'dodopayments';
export const dodopayments = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY,
  environment: process.env.NODE_ENV === 'development' ? 'test_mode' : 'live_mode',
});
