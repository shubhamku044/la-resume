import DodoPayments from 'dodopayments';
export const dodopayments = new DodoPayments({
  bearerToken:
    process.env.NODE_ENV === 'development'
      ? process.env.DODO_API_KEY_TEST
      : process.env.DODO_API_KEY_LIVE, // This is the default and can be omitted if env is named as DODO_PAYMENTS_API_KEY
  environment: process.env.NODE_ENV === 'development' ? 'test_mode' : 'live_mode', // defaults to 'live_mode'
});
