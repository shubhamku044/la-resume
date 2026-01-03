import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export const HowItWorksSection = async () => {
  const t = await getTranslations('HomePage');

  const steps = [
    {
      number: t('use.steps.0.number'),
      title: t('use.steps.0.title'),
      description: t('use.steps.0.description'),
    },
    {
      number: t('use.steps.1.number'),
      title: t('use.steps.1.title'),
      description: t('use.steps.1.description'),
    },
    {
      number: t('use.steps.2.number'),
      title: t('use.steps.2.title'),
      description: t('use.steps.2.description'),
    },
  ];

  return (
    <section id="how-it-works" className="bg-gray-50 py-20 dark:bg-gray-900 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
            {t('use.badge')}
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            {t('use.heading')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            {t('use.subheading')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              <div className="feature-card relative p-8">
                <div className="mb-6 text-5xl font-bold text-purple-500/20">{step.number}</div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 md:block transition-transform duration-300 group-hover:translate-x-2">
                    <ArrowRight className="size-7" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
