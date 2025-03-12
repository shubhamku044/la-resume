'use server';

import { cookies, headers } from 'next/headers';
import { Locale, defaultLocale, locales } from '@/i18n/config';

const COOKIE_NAME = 'NEXT_LOCALE';

async function getBrowserLanguage(): Promise<Locale | null> {
  const headersList = await headers();
  const acceptLanguage = headersList.get('Accept-Language') || '';

  const browserLanguages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [language, q = '1'] = lang.trim().split(';q=');
      return {
        language: language.trim(),
        q: parseFloat(q),
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { language } of browserLanguages) {
    if (locales.includes(language as Locale)) {
      return language as Locale;
    }
  }

  for (const { language } of browserLanguages) {
    const baseLanguage = language.split('-')[0];

    const matchedLocale = locales.find((locale) => {
      if (locale === baseLanguage) return true;

      if (locale.startsWith(`${baseLanguage}-`) && !language.includes('-')) {
        return true;
      }

      return false;
    });

    if (matchedLocale) {
      return matchedLocale;
    }
  }

  return null;
}

export async function getUserLocale() {
  const cookieLanguage = (await cookies()).get(COOKIE_NAME)?.value;
  const browserLanguage = await getBrowserLanguage();

  return cookieLanguage || browserLanguage || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
