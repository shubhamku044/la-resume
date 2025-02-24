'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FileText, Rocket, Star, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LuGithub } from 'react-icons/lu';
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

export default function LaResumeLanding() {
  const [stars, setStars] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetch('https://api.github.com/repos/shubhamku044/la-resume')
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gray-900 px-4 py-2 text-center text-sm text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <LuGithub className="size-4" />
            <span>Loved by {stars} developers</span>
          </div>
          <Link
            href="https://github.com/shubhamku044/la-resume"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-black hover:bg-gray-100"
          >
            <span>Star on GitHub</span>
            <Star className="size-4" />
          </Link>
        </div>
      </div>

      <section className="container mx-auto px-4 py-12 text-center sm:px-6 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            Craft Perfect,{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ATS-Friendly
            </span>{' '}
            Resumes
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 sm:text-xl">
            Professional resume builder powered by LaTeX. Free forever. No signups required. Export
            to PDF or LaTeX in seconds.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <SignedIn>
              <Button
                size="lg"
                className="w-full shadow-lg sm:w-auto"
                onClick={() => {
                  router.push('/templates');
                }}
                variant="default"
              >
                Start Building <ChevronRight />
              </Button>
            </SignedIn>
            <SignedOut>
              <SignInButton
                fallbackRedirectUrl="/templates"
                signUpFallbackRedirectUrl="/"
                mode="modal"
              >
                <Button size="lg" className="w-full shadow-lg sm:w-auto" variant="default">
                  Start Building <ChevronRight />
                </Button>
              </SignInButton>
            </SignedOut>
            <Button
              variant="secondary"
              size="lg"
              className="w-full border border-gray-400 sm:w-auto"
              onClick={() => window.open('https://github.com/shubhamku044/la-resume', '_blank')}
            >
              <LuGithub className="mr-2 size-5" />
              GitHub
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-10 flex justify-center px-4 sm:px-0"
        >
          <Image
            alt="Resume Builder"
            className="shadow-lg shadow-purple-300"
            width={1024}
            height={800}
            src="/la-resume-mockup.webp"
          />
        </motion.div>
      </section>

      <section className="bg-white py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:mb-16">
            Why Professionals Choose La-Resume
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'ATS Optimized',
                description: 'Resume templates designed to pass through Applicant Tracking Systems',
                icon: <FileText className="size-8 text-blue-600" />,
              },
              {
                title: 'LaTeX Precision',
                description: 'Professional typography and layout powered by LaTeX engine',
                icon: <Rocket className="size-8 text-purple-600" />,
              },
              {
                title: 'Instant Export',
                description: 'One-click PDF download or raw LaTeX code export',
                icon: <FileText className="size-8 text-green-600" />,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="h-full transition-all hover:border-blue-100 hover:shadow-xl">
                  <CardContent className="p-6 sm:p-8">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-blue-50">
                      {feature.icon}
                    </div>
                    <h3 className="mb-3 text-lg font-semibold sm:text-xl">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:mb-16">
            Simple 3-Step Process
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((step) => (
              <motion.div
                key={step}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-blue-600 text-white">
                    {step}
                  </div>
                  <h3 className="mb-3 text-lg font-semibold sm:text-xl">
                    {
                      ['Input Your Information', 'Customize Templates', 'Download & Apply'][
                        step - 1
                      ]
                    }
                  </h3>
                  <p className="text-gray-600">
                    {
                      [
                        'Fill in your details using our intuitive form',
                        'Select from professional ATS-optimized templates',
                        'Export as PDF or LaTeX and start applying',
                      ][step - 1]
                    }
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:mb-16">
            Trusted by Professionals
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                text: 'La-Resume helped me land 3x more interviews. The ATS optimization is truly effective!',
                author: 'Sarah Johnson, Product Manager',
              },
              {
                text: 'Finally a resume builder that respects typography and professional standards.',
                author: 'Michael Chen, Senior Developer',
              },
            ].map((testimonial, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50" />
                <CardContent className="relative p-6 sm:p-8">
                  <p className="mb-4 text-base italic text-gray-700 sm:text-lg">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <p className="font-medium text-gray-900">— {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 text-center sm:px-6">
          <div className="rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 px-6 py-12 text-white shadow-2xl sm:rounded-2xl sm:px-8 sm:py-16">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Ready to Elevate Your Career?</h2>
            <p className="mb-6 text-sm text-blue-100 sm:text-lg">
              Join thousands of professionals who&apos;ve transformed their job search
            </p>
            <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
              <SignedIn>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 border border-gray-300 px-6 py-3 text-black hover:bg-white/10 sm:flex-none"
                  onClick={() => router.push('/templates')}
                >
                  Create Your Resume Now
                </Button>
              </SignedIn>
              <SignedOut>
                <SignInButton
                  fallbackRedirectUrl="/templates"
                  signUpFallbackRedirectUrl="/"
                  mode="modal"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 border border-gray-300 px-6 py-3 text-black hover:bg-white/10 sm:flex-none"
                  >
                    Create Your Resume Now
                  </Button>
                </SignInButton>
              </SignedOut>
              <Button
                variant="outline"
                size="lg"
                className="flex-1 border border-gray-300 px-6 py-3 text-black hover:bg-white/10 sm:flex-none"
                onClick={() => window.open('https://github.com/shubhamku044/la-resume', '_blank')}
              >
                <LuGithub className="mr-2 size-5" />
                Star on GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:mb-16">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="mx-auto max-w-3xl">
            {[
              {
                question: 'Is La-Resume really completely free?',
                answer:
                  'Yes! La-Resume is 100% free and open source. We believe professional resume building should be accessible to everyone.',
              },
              {
                question: 'How does the ATS optimization work?',
                answer:
                  'Our templates follow industry best practices for ATS compatibility, including proper keyword placement, clean formatting, and semantic structure.',
              },
              {
                question: 'Can I use my own LaTeX templates?',
                answer:
                  'Currently we support our curated templates, but we plan to add custom template support in future updates.',
              },
            ].map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="mb-4 rounded-lg border border-gray-200 px-4 sm:px-6"
              >
                <AccordionTrigger className="flex w-full items-center justify-between py-4 text-left font-semibold">
                  <span className="text-base sm:text-lg">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="mb-2 text-lg font-semibold">La-Resume</h3>
              <p className="text-gray-600">Open source resume builder</p>
            </div>
            <div className="flex gap-6">
              <Link
                href="https://github.com/shubhamku044/la-resume"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <LuGithub className="size-5" />
                <span>GitHub</span>
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-600 sm:mt-8">
            © {new Date().getFullYear()} La-Resume. MIT Licensed. Contributions welcome!
          </div>
        </div>
      </footer>
    </div>
  );
}
