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
  LibraryBig,
  Trophy,
  User,
  UserCircle,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const userDetailItems = [
  {
    title: 'Personal Info',
    url: '/user-details/personal-info',
    icon: UserCircle,
  },
  {
    title: 'Skills',
    url: '/user-details/skills',
    icon: LibraryBig,
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

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="mb-2 border-b pb-2">
        <span className="text-xl font-bold">La Resume</span>
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
            afterSignOutUrl="/"
            afterSwitchSessionUrl="/templates"
          />
        </SignedIn>
      </SidebarFooter>
    </Sidebar>
  );
}
