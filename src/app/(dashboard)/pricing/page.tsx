// src/app/pricing/page.tsx
'use client';
import { Button } from '@/components/ui/button';
import { useUser, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleButtonClick = (plan: string) => {
    if (!isSignedIn) {
      // Redirect to login if not signed in
      router.push('/sign-in');
    } else {
      // Handle plan selection (e.g., redirect to payment page)
      switch (plan) {
        case 'free':
          router.push('/templates');
          break;
        case 'professional':
          router.push('/checkout/professional');
          break;
        case 'enterprise':
          router.push('/feedback');
          break;
        default:
          break;
      }
    }
  };

  return (
    <section className="min-h-screen bg-background px-6 py-20 text-foreground">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Simple and Transparent Pricing Plans
        </h1>
        <p className="mb-12 text-muted-foreground">
          Start building professional resumes with ease — choose the plan that fits your needs.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Free Plan */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="mb-4 text-2xl font-semibold">Free</h2>
            <p className="mb-2 text-4xl font-bold">
              $0<span className="text-lg text-muted-foreground"> / month</span>
            </p>
            <p className="mb-6 text-muted-foreground">
              Perfect for individuals trying out La-Resume.
            </p>
            <SignedIn>
              <Button className="w-full" onClick={() => handleButtonClick('free')}>
                Start for Free
              </Button>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="w-full">Start for Free</Button>
              </SignInButton>
            </SignedOut>

            <ul className="mt-8 space-y-3 text-left text-muted-foreground">
              <li>✅ Access to Basic Resume Templates</li>
              <li>✅ Edit & Download in PDF</li>
              <li>✅ Resume Live Preview</li>
              <li>✅ Save Progress</li>
            </ul>
          </div>

          {/* Professional Plan */}
          <div className="relative rounded-2xl border border-primary bg-card p-8">
            <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground">
              Most Popular
            </span>
            <h2 className="mb-4 text-2xl font-semibold">Professional</h2>
            <p className="mb-2 text-4xl font-bold">
              $9<span className="text-lg text-muted-foreground"> / month</span>
            </p>
            <p className="mb-6 text-muted-foreground">
              Ideal for job seekers looking for advanced features.
            </p>
            <SignedIn>
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => handleButtonClick('professional')}
              >
                Upgrade to Professional
              </Button>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Upgrade to Professional
                </Button>
              </SignInButton>
            </SignedOut>

            <ul className="mt-8 space-y-3 text-left text-muted-foreground">
              <li>✅ All Free Features</li>
              <li>✅ Premium Resume Templates</li>
              <li>✅ AI Resume Suggestions</li>
              <li>✅ AI Cover Letter Generator</li>
              <li>✅ Unlimited Downloads</li>
              <li>✅ Priority Email Support</li>
            </ul>
          </div>

          {/* Enterprise Plan */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="mb-4 text-2xl font-semibold">Enterprise</h2>
            <p className="mb-2 text-4xl font-bold">
              $29<span className="text-lg text-muted-foreground"> / month</span>
            </p>
            <p className="mb-6 text-muted-foreground">Best for recruitment agencies and teams.</p>
            <SignedIn>
              <Button className="w-full" onClick={() => handleButtonClick('enterprise')}>
                Contact Sales
              </Button>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="w-full">Contact Sales</Button>
              </SignInButton>
            </SignedOut>

            <ul className="mt-8 space-y-3 text-left text-muted-foreground">
              <li>✅ All Professional Features</li>
              <li>✅ Multi-user Access</li>
              <li>✅ Team Collaboration</li>
              <li>✅ Resume Analytics</li>
              <li>✅ API Access</li>
              <li>✅ Dedicated Support</li>
            </ul>
          </div>
        </div>

        <p className="mt-12 text-muted-foreground">No hidden charges. Cancel anytime.</p>
      </div>
    </section>
  );
}
