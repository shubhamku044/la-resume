import DodoPayments from 'dodopayments';

// Handle missing API key gracefully during build time
const apiKey = process.env.DODO_PAYMENTS_API_KEY;

export const dodopayments = apiKey
  ? new DodoPayments({
      bearerToken: apiKey,
      environment: process.env.NODE_ENV === 'development' ? 'test_mode' : 'live_mode',
    })
  : null; // Will be null if API key is not provided

// Helper function to check if DodoPayments is available
export const isDodoPaymentsAvailable = () => dodopayments !== null;
