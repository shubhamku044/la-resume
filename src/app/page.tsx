'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { FileText, Rocket } from 'lucide-react';

export default function LaResumeLanding() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h1 className="mb-4 text-5xl font-bold">
          La-Resume: Build ATS-Friendly Resumes Effortlessly
        </h1>
        <p className="mb-6 text-lg text-gray-600">
          A 100% free, no-signup-required resume builder powered by LaTeX. Export to PDF or get the
          raw LaTeX code instantly!
        </p>
        <Button className="px-6 py-3 text-lg">Get Started</Button>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-8 text-3xl font-bold">Why Choose La-Resume?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {['ATS-Friendly', 'LaTeX Export', 'Instant PDF Download'].map((feature, index) => (
              <Card key={index} className="flex flex-col items-center p-6">
                <FileText size={40} className="mb-4 text-blue-500" />
                <h3 className="text-xl font-semibold">{feature}</h3>
                <p className="mt-2 text-center text-gray-600">{`Easily create a resume that stands out.`}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 px-6 py-20 text-center">
        <h2 className="mb-6 text-3xl font-bold">How It Works</h2>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {['Enter your details', 'Customize your resume', 'Download PDF or LaTeX'].map(
            (step, index) => (
              <Card key={index} className="flex flex-col items-center p-6">
                <Rocket size={40} className="mb-4 text-green-500" />
                <h3 className="text-xl font-semibold">Step {index + 1}</h3>
                <p className="mt-2 text-center text-gray-600">{step}</p>
              </Card>
            )
          )}
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-6 text-3xl font-bold">What Users Say</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {['This tool saved me hours!', "Best free resume builder I've used."].map(
              (quote, index) => (
                <Card key={index} className="p-6">
                  <CardContent>
                    <p className="text-lg italic">&quot;{quote}&quot;</p>
                    <p className="mt-2 text-right font-semibold">- Happy User</p>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-100 px-6 py-20 text-center">
        <h2 className="mb-6 text-3xl font-bold">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible>
          {[
            {
              question: 'Is La-Resume really free?',
              answer: 'Yes, 100% free. No hidden fees or sign-ups required!',
            },
            {
              question: 'Can I export my resume?',
              answer: 'Yes! You can download it as a PDF or get the LaTeX code.',
            },
          ].map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`} title={faq.question}>
              <p className="text-gray-600">{faq.answer}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-center text-white">
        <p>© {new Date().getFullYear()} La-Resume. Open-source and free forever.</p>
      </footer>
    </div>
  );
}
