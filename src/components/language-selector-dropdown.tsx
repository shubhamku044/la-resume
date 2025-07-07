import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/services/locale';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { IoLanguageOutline } from 'react-icons/io5';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface IProps {
  showLabel: boolean;
  className?: string;
}

const LanguageSelectorDropdown = ({ showLabel, className }: IProps) => {
  const t = useTranslations();
  const languages = t.raw('language') as Record<Locale, string>;

  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={clsx(
          'p-2 outline-none',
          isPending && 'pointer-events-none opacity-60',
          'flex gap-2',
          className
        )}
      >
        {showLabel && <span>{t('sidebar.language')}</span>}
        <IoLanguageOutline className="text-xl" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(languages).map(([code, name]) => (
          <DropdownMenuItem key={code} onSelect={() => onChange(code)}>
            <span className="flex items-center gap-2">
              <span>{name.split(' ')[0]}</span>
              <span>{name.split(' ')[1]}</span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelectorDropdown;
