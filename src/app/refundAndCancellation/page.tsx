import React from 'react';

const CancellationRefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Cancellation & Refund Policy
        </h1>
        <p className="mb-8 text-center text-sm text-gray-600">
          Last updated on <strong>21-03-2025 13:50:05</strong>
        </p>

        <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl mx-auto">
          <p>
            <strong>PRIYABRATA MONDAL</strong> believes in helping its customers as far as possible
            and has therefore a liberal cancellation policy. Under this policy:
          </p>

          <h2 className="mb-4 mt-6 text-xl font-semibold text-gray-800">1. Cancellation Policy</h2>
          <ul className="list-disc pl-6">
            <li>
              Cancellations will be considered only if the request is made immediately after placing
              the order. However, the cancellation request may not be entertained if the orders have
              been communicated to the vendors/merchants and they have initiated the process of
              shipping them.
            </li>
            <li>
              <strong>PRIYABRATA MONDAL</strong> does not accept cancellation requests for
              perishable items like flowers, eatables, etc. However, refund/replacement can be made
              if the customer establishes that the quality of the product delivered is not good.
            </li>
          </ul>

          <h2 className="mb-4 mt-6 text-xl font-semibold text-gray-800">
            2. Damaged or Defective Items
          </h2>
          <ul className="list-disc pl-6">
            <li>
              In case of receipt of damaged or defective items, please report the same to our
              Customer Service team. The request will, however, be entertained once the merchant has
              checked and determined the same at their own end.
            </li>
            <li>
              This should be reported within <strong>7 Days</strong> of receipt of the products. In
              case you feel that the product received is not as shown on the site or as per your
              expectations, you must bring it to the notice of our customer service within{' '}
              <strong>7 Days</strong> of receiving the product. The Customer Service Team, after
              looking into your complaint, will take an appropriate decision.
            </li>
          </ul>

          <h2 className="mb-4 mt-6 text-xl font-semibold text-gray-800">3. Warranty Claims</h2>
          <p>
            In case of complaints regarding products that come with a warranty from manufacturers,
            please refer the issue to them.
          </p>

          <h2 className="mb-4 mt-6 text-xl font-semibold text-gray-800">4. Refund Process</h2>
          <p>
            In case of any refunds approved by <strong>PRIYABRATA MONDAL</strong>, it’ll take{' '}
            <strong>1-2 Days</strong> for the refund to be processed to the end customer.
          </p>

          <h2 className="mb-4 mt-6 text-xl font-semibold text-gray-800">5. Contact Us</h2>
          <p>
            For any questions or concerns regarding cancellations or refunds, please contact our
            Customer Service team using the contact information provided on this website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefundPolicyPage;
