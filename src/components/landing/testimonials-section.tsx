import { getTranslations } from 'next-intl/server';
import ReviewsMarquee from './testimonial-flow';

export const TestimonialsSection = async () => {
  const t = await getTranslations('HomePage');
  return (
    <section className="bg-gray-50 py-20 dark:bg-gray-900 md:py-32" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
            {t('testimonial.intro')}
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            {t('testimonial.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            {t('testimonial.description')}
          </p>
        </div>

        <ReviewsMarquee />
      </div>
    </section>
  );
};
