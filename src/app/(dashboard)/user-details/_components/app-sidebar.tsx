'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SignedIn, UserButton } from '@clerk/nextjs';
import {
  Briefcase,
  ChevronRight,
  GraduationCap,
  LayoutTemplate,
  Star,
  Trophy,
  User,
  UserCircle,
} from 'lucide-react';
import { LuGithub } from 'react-icons/lu';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGitHubStars } from '@/hooks';

const userDetailItems = [
  {
    title: 'Personal Info',
    url: '/user-details/personal-info',
    icon: UserCircle,
  },
  {
    title: 'Experience',
    url: '/user-details/experience',
    icon: Briefcase,
  },
  {
    title: 'Education',
    url: '/user-details/education',
    icon: GraduationCap,
  },
  {
    title: 'Accomplishment',
    url: '/user-details/accomplishment',
    icon: Trophy,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const stars = useGitHubStars();

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="mb-2 border-b pb-2">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="La-Resume Logo" width={120} height={40} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-1">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  data-active={pathname.startsWith('/templates')}
                  className="group hover:bg-accent/50"
                >
                  <Link href="/templates">
                    <LayoutTemplate className="size-4 text-primary" />
                    <span>Templates</span>
                    <ChevronRight className="ml-auto size-4 opacity-0 group-hover:opacity-100" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  data-active={pathname.startsWith('/user-details')}
                  className="group hover:bg-accent/50"
                >
                  <Link href="/user-details">
                    <User className="size-4 text-primary" />
                    <span>User Details</span>
                    <ChevronRight className="ml-auto size-4 opacity-0 group-hover:opacity-100" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {pathname.startsWith('/user-details') && (
          <SidebarGroup className="mt-4">
            <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Sections
            </SidebarGroupLabel>
            <SidebarGroupContent className="ml-2 mt-1 border-l-2 border-muted pl-2">
              <SidebarMenu>
                {userDetailItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      data-active={pathname === item.url}
                      className="hover:bg-accent/50"
                    >
                      <Link href={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Support Us
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-1">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="group bg-gradient-to-r from-primary/10 to-blue-100/50 hover:from-primary/20 dark:from-primary/5 dark:to-blue-900/20"
                >
                  <Link
                    href="https://github.com/shubhamku044/la-resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative"
                  >
                    <div className="absolute right-2 top-2 flex items-center gap-1">
                      <Star className="size-4 animate-star-pulse fill-yellow-500 text-yellow-500" />
                      <span className="text-xs">{stars}</span>
                    </div>
                    <LuGithub className="size-4" />
                    <span>Star on GitHub</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                rootBox: 'w-full group',
                userButtonBox: 'flex-row-reverse justify-between w-full gap-3',
                userButtonTrigger:
                  'w-full p-2 rounded-lg transition-all bg-white/5 hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 shadow-sm hover:shadow',
                userButtonOuterIdentifier: 'text-sm font-medium text-gray-900 dark:text-gray-100',
                userButtonTextContainer: 'text-left space-y-0.5',
                avatarBox: 'h-9 w-9 border-2 border-gray-100 dark:border-gray-800',
              },
              variables: {
                colorPrimary: 'hsl(225, 80%, 57%)',
                colorText: 'hsl(224, 71%, 12%)',
                colorTextSecondary: 'hsl(224, 15%, 46%)',
                colorBackground: 'hsl(210, 40%, 98%)',
              },
            }}
            showName
            afterSignOutUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL || '/'}
            afterSwitchSessionUrl="/templates"
          />
        </SignedIn>
      </SidebarFooter>
    </Sidebar>
  );
}
