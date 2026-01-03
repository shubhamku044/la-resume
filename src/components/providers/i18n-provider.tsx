import { NextIntlClientProvider } from 'next-intl';

type Message = {
  [key: string]: string | Message;
};

function I18nProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Message;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

export default I18nProvider;
