export type Locale = (typeof locales)[number];

export const locales = [
  'en',
  'ja',
  'az',
  'pt-PT',
  'pt-BR',
  'zh',
  'de',
  'fr',
  'it',
  'ru',
  'es',
  'nl',
] as const;
export const defaultLocale: Locale = 'az';
