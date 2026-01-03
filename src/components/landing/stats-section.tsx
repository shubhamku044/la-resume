import { getTranslations } from 'next-intl/server';

export const StatsSection = async () => {
  const t = await getTranslations('HomePage');

  return (
    <section className="bg-gray-50 py-12 dark:bg-gray-900 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[
            { value: '10K+', label: t('stats.resumeCreated') },
            { value: '98%', label: t('stats.atsSuccess') },
            { value: '15+', label: t('stats.template') },
            { value: '24/7', label: t('stats.customer') },
          ].map((stat, index) => (
            <div key={index}>
              <p className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
