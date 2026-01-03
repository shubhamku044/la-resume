import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getTranslations } from 'next-intl/server';

export const FAQSection = async () => {
  const t = await getTranslations('HomePage');

  const faqs = [
    {
      question: t('faq.question1.question'),
      answer: t('faq.question1.answer'),
    },
    {
      question: t('faq.question2.question'),
      answer: t('faq.question2.answer'),
    },
    {
      question: t('faq.question3.question'),
      answer: t('faq.question3.answer'),
    },
    {
      question: t('faq.question4.question'),
      answer: t('faq.question4.answer'),
    },
  ];

  return (
    <section className="py-20 md:py-32" id="faq">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
            {t('faq.title')}
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            {t('faq.subtitle')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            {t('faq.description')}
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index}>
                <AccordionItem
                  value={`item-${index}`}
                  className="rounded-lg border border-gray-200 px-6 dark:border-gray-700"
                >
                  <AccordionTrigger className="py-4 text-left font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
