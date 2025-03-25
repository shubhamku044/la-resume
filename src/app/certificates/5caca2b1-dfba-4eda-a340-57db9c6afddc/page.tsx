import Image from 'next/image';
import React from 'react';

export default function CertificatePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl space-y-6 rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-center text-3xl font-bold text-gray-800">Certificate Verification</h1>
        <p className="text-center text-gray-600">
          This certificate is issued by <span className="font-semibold">La-Resume</span>.
          <br />
          Verified and authentic. View the certificate below:
        </p>

        <div className="w-full overflow-hidden rounded-lg border shadow-lg">
          <Image
            width={800}
            height={600}
            src="https://ik.imagekit.io/laresume/certificates/shubham-laresume.png?updatedAt=1742929689579"
            alt="Certificate Image"
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="text-center text-gray-700">
          <p>
            Certificate ID:{' '}
            <span className="font-semibold">5caca2b1-dfba-4eda-a340-57db9c6afddc</span>
          </p>
          <p>
            Issued to: <span className="font-semibold">Shubham Kumar</span>
          </p>
          <p>
            Date of Issue: <span className="font-semibold">March 26, 2025</span>
          </p>
        </div>

        <div className="text-center">
          <a
            href="https://ik.imagekit.io/laresume/certificates/shubham-laresume.pdf?updatedAt=1742929264372"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-blue-700"
          >
            Download Certificate (PDF)
          </a>
        </div>

        <p className="text-center text-sm text-gray-500">
          For any queries, contact <span className="underline">laresumetech@gmail.com</span>
        </p>
      </div>
    </main>
  );
}
