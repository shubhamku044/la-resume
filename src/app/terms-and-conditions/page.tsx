import React from 'react';

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">Terms & Conditions</h1>
        <p className="mb-8 text-center text-sm text-gray-600">
          Last updated on <strong>21-03-2025 13:44:01</strong>
        </p>

        <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl mx-auto">
          <p>
            These Terms and Conditions, along with the privacy policy or other terms (“Terms”),
            constitute a binding agreement by and between <strong>PRIYABRATA MONDAL</strong>{' '}
            (“Website Owner” or “we” or “us” or “our”) and you (“you” or “your”) and relate to your
            use of our website, goods (as applicable), or services (as applicable) (collectively,
            “Services”).
          </p>
          <p>
            By using our website and availing the Services, you agree that you have read and
            accepted these Terms (including the Privacy Policy). We reserve the right to modify
            these Terms at any time and without assigning any reason. It is your responsibility to
            periodically review these Terms to stay informed of updates.
          </p>

          <h2 className="mb-4 mt-6 text-xl font-semibold text-gray-800">1. Use of Services</h2>
          <p>
            The use of this website or availing of our Services is subject to the following terms of
            use:
          </p>
          <ul className="list-disc pl-6">
            <li>
              To access and use the Services, you agree to provide true, accurate, and complete
              information to us during and after registration, and you shall be responsible for all
              acts done through the use of your registered account.
            </li>
            <li>
              Neither we nor any third parties provide any warranty or guarantee as to the accuracy,
              timeliness, performance, completeness, or suitability of the information and materials
              offered on this website or through the Services for any specific purpose. You
              acknowledge that such information and materials may contain inaccuracies or errors,
              and we expressly exclude liability for any such inaccuracies or errors to the fullest
              extent permitted by law.
            </li>
            <li>
              Your use of our Services and the website is solely at your own risk and discretion.
              You are required to independently assess and ensure that the Services meet your
              requirements.
            </li>
          </ul>

          <h2 className="mb-4 mt-6 text-xl font-semibold text-gray-800">
            2. Intellectual Property
          </h2>
          <p>
            The contents of the Website and the Services are proprietary to Us, and you will not
            have any authority to claim any intellectual property rights, title, or interest in its
            contents.
          </p>

          <h2 className="mb-4 mt-6 text-xl font-semibold text-gray-800">3. Unauthorized Use</h2>
          <p>
            You acknowledge that unauthorized use of the Website or the Services may lead to action
            against you as per these Terms or applicable laws.
          </p>

          <h2 className="mb-4 mt-6 text-xl font-semibold text-gray-800">4. Payment</h2>
          <p>You agree to pay us the charges associated with availing the Services.</p>

          <h2 className="mb-4 mt-6 text-xl font-semibold text-gray-800">
            5. Prohibited Activities
          </h2>
          <p>
            You agree not to use the website and/or Services for any purpose that is unlawful,
            illegal, or forbidden by these Terms, or Indian or local laws that might apply to you.
          </p>

          <h2 className="mb-4 mt-6 text-xl font-semibold text-gray-800">6. Third-Party Links</h2>
          <p>
            You agree and acknowledge that the website and the Services may contain links to other
            third-party websites. On accessing these links, you will be governed by the terms of
            use, privacy policy, and such other policies of such third-party websites.
          </p>

          <h2 className="mb-4 mt-6 text-xl font-semibold text-gray-800">7. Refund Policy</h2>
          <p>
            You shall be entitled to claim a refund of the payment made by you in case we are not
            able to provide the Service. The timelines for such return and refund will be according
            to the specific Service you have availed or within the time period provided in our
            policies (as applicable). In case you do not raise a refund claim within the stipulated
            time, then this would make you ineligible for a refund.
          </p>

          <h2 className="mb-4 mt-6 text-xl font-semibold text-gray-800">8. Force Majeure</h2>
          <p>
            Notwithstanding anything contained in these Terms, the parties shall not be liable for
            any failure to perform an obligation under these Terms if performance is prevented or
            delayed by a force majeure event.
          </p>

          <h2 className="mb-4 mt-6 text-xl font-semibold text-gray-800">9. Governing Law</h2>
          <p>
            These Terms and any dispute or claim relating to it, or its enforceability, shall be
            governed by and construed in accordance with the laws of India.
          </p>

          <h2 className="mb-4 mt-6 text-xl font-semibold text-gray-800">10. Jurisdiction</h2>
          <p>
            All disputes arising out of or in connection with these Terms shall be subject to the
            exclusive jurisdiction of the courts in <strong>Benachity, West Bengal</strong>.
          </p>

          <h2 className="mb-4 mt-6 text-xl font-semibold text-gray-800">11. Contact Information</h2>
          <p>
            All concerns or communications relating to these Terms must be communicated to us using
            the contact information provided on this website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
