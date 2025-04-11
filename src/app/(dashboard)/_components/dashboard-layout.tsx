'use client';
import { useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import type { LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Briefcase,
  Brush,
  FileText,
  GraduationCap,
  LayoutTemplate,
  Star,
  Trophy,
  User,
  UserCircle,
  PanelLeft,
} from 'lucide-react';
import { LuGithub } from 'react-icons/lu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGitHubStars } from '@/hooks';
import { LanguageSelectorDropdown } from '@/components';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/landing/theme-provider';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const stars = useGitHubStars();
  const t = useTranslations('sidebar');

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

  return (
    <div className="flex h-screen flex-col">
      <header className="bg-background sticky top-0 z-10 flex h-16 items-center border-b px-4">
        <Link
          href="/templates"
          onClick={(e) => {
            e.preventDefault();
            document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="flex items-center gap-2">
            <FileText className="text-primary size-6" />
            <span className="text-xl font-bold">La Resume</span>
          </div>
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-accent mr-2 rounded-lg p-2"
        >
          <PanelLeft className="size-5" />
        </button>

        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/feedback"
            className="bg-accent/50 hover:bg-accent flex items-center gap-1 rounded-md px-3 py-1.5 text-sm"
          >
            <Star className="size-4" />
            <span>{t('feedback')}</span>
          </Link>

          <Link
            href="https://github.com/your-repo"
            target="_blank"
            className="bg-muted hover:bg-muted/80 relative flex items-center gap-1 rounded-md px-3 py-1.5 text-sm"
          >
            <LuGithub className="size-4" />
            <span>{t('starOnGitHub')}</span>
            <div className="ml-1 flex items-center gap-1 text-xs">
              <Star className="size-3 fill-yellow-500 text-yellow-500" />
              <span>{stars}</span>
            </div>
          </Link>

          <UserButton afterSignOutUrl="/" />
          <LanguageSelectorDropdown showLabel={false} />
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={cn(
            'flex flex-col border-r bg-background transition-all duration-300',
            isCollapsed ? 'w-[70px]' : 'w-64'
          )}
        >
          <div className="flex-1 overflow-y-auto p-2">
            <nav className="space-y-1">
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
        </aside>

        <main
          className={cn(
            'flex-1 overflow-auto p-4 transition-[margin] duration-300',
            'scrollbar scrollbar-thin scrollbar-track-background scrollbar-thumb-accent',
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
      <div
        className={cn(
          'flex items-center rounded-md p-2 text-sm font-medium',
          items.some((item) => pathname.startsWith(item.url)) && 'bg-accent'
        )}
      >
        {icon}
        {!isCollapsed && <span className="ml-2">{title}</span>}
      </div>

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
                isCollapsed ? 'justify-center' : 'ml-4 gap-2'
              )}
            >
              <item.icon className="size-4" />
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
