import { FileText } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export const FooterSection = async () => {
  const t = await getTranslations('HomePage');

  return (
    <footer className="bg-white py-12 dark:bg-gray-800 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="size-6 text-purple-500" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {t('footer.brand')}
              </span>
            </div>
            <p className="max-w-sm text-gray-600 dark:text-gray-300">{t('footer.description')}</p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              {t('footer.company')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#team"
                  className="text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacyPolicy"
                  className="text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  {t('footer.termsOfService')}
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-and-cancellation"
                  className="text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  {t('footer.refunds')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              {t('footer.support')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact-us"
                  className="text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  {t('footer.helpCenter')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  {t('footer.contactUs')}
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  {t('footer.faqs')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center border-t border-gray-200 pt-8 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};
