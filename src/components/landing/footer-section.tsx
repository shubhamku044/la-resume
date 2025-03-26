import React from 'react';
import { FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const FooterSection = () => {
  const t = useTranslations('HomePage');

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
              {t('footer.resources')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/templates/resume-templates"
                  className="text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  {t('footer.templates')}
                </a>
              </li>
              <li>
                <a
                  href="/templates/made-by-you"
                  className="text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  {t('footer.madeByYou')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              {t('footer.company')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  {t('footer.aboutUs')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  {t('footer.privacyPolicy')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  {t('footer.termsOfService')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              {t('footer.support')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  {t('footer.helpCenter')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  {t('footer.contactUs')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  {t('footer.faqs')}
                </a>
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
