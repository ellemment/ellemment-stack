// app/ellemment-ui/components/account/account-layout.tsx

import {
  Cog8ToothIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  Bars2Icon
} from '@heroicons/react/16/solid';


import { Link, NavLink, useLocation } from '@remix-run/react';
import React from 'react';

import { Button } from '#app/components/ui/button';
import { Icon } from '#app/components/ui/icon';
import { getUserImgSrc } from '#app/utils/misc';
import { Avatar } from './avatar';

import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
  SidebarDivider
} from './sidebar';
import { SidebarLayout } from './sidebar-layout';


type Content = {
  id: string;
  title: string;
};

function ContentSection({ username, contents }: { username: string; contents: Content[] }) {
  const location = useLocation();
  const isContentPage = location.pathname.includes('/content/');

  return (
    <div className={`${isContentPage ? 'hidden md:block' : ''}`}>
      <h2 className="mb-2 text-sm font-semibold text-muted-foreground">Content</h2>
      <Button asChild variant="outline" className="w-full mb-4">
        <NavLink to={`${username}/content/new`} className="flex items-center justify-center">
          <Icon name="plus" className="mr-2 h-4 w-4" />
          <span className="text-sm">New Content</span>
        </NavLink>
      </Button>
      <ul className="space-y-1">
        {contents.map((content) => (
          <li key={content.id}>
            <NavLink
              to={`${username}/content/${content.id}`}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted/80'
                }`
              }
            >
              <Icon name="file-text" className="mr-2 h-4 w-4" />
              <span className="text-sm">{content.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AccountLayout({
  user,
  isAdmin,
  children,
}: {
  user: {
    id: string;
    name: string | null;
    username: string;
    email: string;
    image?: { id: string } | null;
    content: Content[];
  };
  isAdmin: boolean;
  children: React.ReactNode;
}) {
  const location = useLocation();
  const isAccountPage = location.pathname === '/account';

  const sidebarContent = (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Link to="/account">
              <SidebarLabel className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">ellemment</SidebarLabel>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <Link to="/account" className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </Link>
            <Link to="/account" className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
              <MoonIcon className="h-5 w-5" />
            </Link>
            <Link to="/account" className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
              <Bars2Icon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </SidebarHeader>

      <SidebarBody>
        {isAdmin && (
          <SidebarSection>
            <ContentSection username={user.username} contents={user.content} />
          </SidebarSection>
        )}
        <SidebarSpacer />
      </SidebarBody>

      <SidebarFooter>
        <span className="min-w-0">
          <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
            Spaces
          </span>
        </span>
        <SidebarDivider />
        <Link to="/account" className="flex items-center justify-between p-4">
          <span className="flex min-w-0 items-center gap-3">
            <Avatar src={getUserImgSrc(user.image?.id)} className="size-4" square alt={user.name || user.username} />
            <span className="min-w-0">
              <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                {user.name || user.username}
              </span>
              <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                {user.email}
              </span>
            </span>
          </span>
          <Link to="/account/settings" className="ml-2">
            <Cog8ToothIcon className="h-5 w-5 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200" />
          </Link>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );

  return (
    <SidebarLayout
      navbar={
        <Avatar src={getUserImgSrc(user.image?.id)} square />
      }
      sidebar={sidebarContent}
    >
      {!isAccountPage && children}
    </SidebarLayout>
  );
}