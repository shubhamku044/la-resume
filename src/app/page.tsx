import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid min-h-screen place-items-center">
      <h1 className="text-3xl font-bold">Welcome to Resume Builder</h1>

      <div className="mt-4 space-x-4">
        <Link href="/templates" className="text-blue-500 underline">
          Browse Templates
        </Link>
        <Link href="/user-details" className="text-blue-500 underline">
          Enter Your Details
        </Link>
      </div>
    </div>
  );
}
