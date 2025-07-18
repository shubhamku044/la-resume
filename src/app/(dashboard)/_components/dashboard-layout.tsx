'use client';
import { LanguageSelectorDropdown } from '@/components';
import { ThemeToggle } from '@/components/landing/theme-provider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useGitHubStars } from '@/hooks';
import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import type { LucideIcon } from 'lucide-react';
import {
  Beaker,
  Briefcase,
  Brush,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutTemplate,
  PanelLeft,
  Star,
  Trophy,
  User,
  UserCircle,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LuGithub } from 'react-icons/lu';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();
  const stars = useGitHubStars();
  const t = useTranslations('sidebar');
  const langaugeDropdownRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsCollapsed(window.innerWidth < 1024);
    }
  }, []);

  const userDetailItems = [
    {
      title: t('personalInfo'),
      url: '/user-details/personal-info',
      icon: UserCircle,
    },
    {
      title: t('experience'),
      url: '/user-details/experience',
      icon: Briefcase,
    },
    {
      title: t('education'),
      url: '/user-details/education',
      icon: GraduationCap,
    },
    {
      title: t('accomplishments'),
      url: '/user-details/accomplishment',
      icon: Trophy,
    },
  ];

  const templateItems = [
    {
      title: t('resumeTemplates'),
      url: '/templates/resume-templates',
      icon: FileText,
    },
    {
      title: t('madeByYou'),
      url: '/templates/made-by-you',
      icon: Brush,
    },
  ];

  const jobTrackerItems = [
    {
      title: t('jobTracker'),
      url: '/tracker/boards',
      icon: ClipboardList,
    },
  ];

  return (
    <div className="flex h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-6 border-b bg-background px-4">
        <Link
          href="/"
          onClick={() => {
            document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="flex items-center gap-2">
            <FileText className="size-6 text-primary" />
            <span className="text-xl font-bold">La Resume</span>
          </div>
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mr-2 rounded-lg p-2 hover:bg-accent"
        >
          <PanelLeft className="size-5" />
        </button>

        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/feedback"
            className="hidden lg:flex items-center gap-1 rounded-md bg-accent/50 px-3 py-1.5 text-sm hover:bg-accent"
          >
            <Star className="size-4" />
            <span>{t('feedback')}</span>
          </Link>

          <Link
            href="https://github.com/shubhamku044/la-resume"
            target="_blank"
            className="relative hidden lg:flex items-center gap-1 rounded-md bg-muted px-3 py-1.5 text-sm hover:bg-muted/80"
          >
            <LuGithub className="size-4" />
            <span>{t('starOnGitHub')}</span>
            <div className="ml-1 flex items-center gap-1 text-xs">
              <Star className="size-3 fill-yellow-500 text-yellow-500" />
              <span>{stars}</span>
            </div>
          </Link>

          <UserButton afterSignOutUrl="/" />
          <LanguageSelectorDropdown className={cn('hidden lg:flex')} showLabel={false} />
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {!isCollapsed && (
          <div
            className="fixed top-16 inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsCollapsed(true)}
          />
        )}

        <aside
          className={cn(
            'flex flex-col border-r bg-background overflow-x-hidden transition-all duration-300 z-50',
            'lg:relative lg:translate-x-0',
            'fixed left-0 h-[calc(100dvh-4rem)]',
            isCollapsed
              ? 'w-0 lg:w-[70px] -translate-x-full lg:translate-x-0'
              : 'w-64 translate-x-0'
          )}
        >
          <div className="flex-1 justify-between overflow-x-hidden overflow-y-auto p-2">
            <nav className="space-y-1">
              <CollapsibleSection
                title={t('jobTracker')}
                icon={<ClipboardList className="size-4" />}
                isCollapsed={isCollapsed}
                items={jobTrackerItems}
                pathname={pathname}
              />

              <CollapsibleSection
                title={t('templates')}
                icon={<LayoutTemplate className="size-4" />}
                isCollapsed={isCollapsed}
                items={templateItems}
                pathname={pathname}
              />
              <CollapsibleSection
                title={t('userDetails')}
                icon={<User className="size-4" />}
                isCollapsed={isCollapsed}
                items={userDetailItems}
                pathname={pathname}
              />
            </nav>
          </div>
          <div className="p-2 border-t lg:hidden pb-safe">
            <div className="space-y-2">
              <div
                className="flex items-center gap-2 rounded-md bg-secondary/50 px-3 py-2 text-sm"
                onClick={() => {
                  langaugeDropdownRef.current?.click();
                }}
              >
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-muted-foreground">{t('language')}</span>
                </div>
                <LanguageSelectorDropdown ref={langaugeDropdownRef} showLabel={false} />
              </div>
              <Link
                href="/feedback"
                className="flex items-center gap-2 rounded-md bg-accent/50 px-3 py-2 text-sm hover:bg-accent transition-colors"
              >
                <Star className="size-4" />
                <span>{t('feedback')}</span>
              </Link>

              <Link
                href="https://github.com/shubhamku044/la-resume"
                target="_blank"
                className="flex items-center justify-between rounded-md bg-muted px-3 py-2 text-sm hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <LuGithub className="size-4" />
                  <span>{t('starOnGitHub')}</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Star className="size-3 fill-yellow-500 text-yellow-500" />
                  <span>{stars}</span>
                </div>
              </Link>
            </div>
          </div>
        </aside>

        <main
          className={cn(
            'flex-1 overflow-auto transition-[margin] duration-300 p-4',
            'scrollbar-thin scrollbar-track-background scrollbar-thumb-accent',
            'dark:scrollbar-track-muted dark:scrollbar-thumb-muted-foreground'
          )}
        >
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  );
}
interface CollapsibleItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  items: CollapsibleItem[];
  isCollapsed: boolean;
  pathname: string;
}

function CollapsibleSection({
  title,
  icon,
  items,
  isCollapsed,
  pathname,
}: CollapsibleSectionProps) {
  return (
    <div className="space-y-1">
      {!isCollapsed && (
        <div
          className={cn(
            'flex items-center flex-wrap gap-2 rounded-md p-2  text-base font-medium',
            items.some((item) => pathname.startsWith(item.url)) && 'bg-accent'
          )}
        >
          {icon}
          {!isCollapsed && <span className="ml-2 text-nowrap">{title}</span>}
          {items[0].url === '/tracker/boards' && !isCollapsed && (
            <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 lg:py-1 text-xs font-medium text-blue-700">
              <Beaker className="size-4" />
              Beta
            </span>
          )}
        </div>
      )}

      <div className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.url;

          const link = (
            <Link
              key={item.url}
              href={item.url}
              className={cn(
                'flex items-center rounded-md p-2 text-sm hover:bg-accent transition-colors',
                isActive && 'bg-accent',
                isCollapsed ? 'lg:justify-center hidden lg:flex' : 'ml-4 gap-2'
              )}
            >
              <item.icon className="size-4 lg:size-5" />
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          );

          return isCollapsed ? (
            <TooltipProvider key={item.url}>
              <Tooltip>
                <TooltipTrigger asChild className="z-[1]">
                  {link}
                </TooltipTrigger>
                <TooltipContent side="right" className="text-sm">
                  {item.title}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            link
          );
        })}
      </div>
    </div>
  );
}
