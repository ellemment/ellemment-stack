// app/ellemment-ui/components/account/account-layout.tsx

import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid';
import {
  Cog6ToothIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
} from '@heroicons/react/20/solid';

import { Link, NavLink, useLocation } from '@remix-run/react';
import React from 'react';

import { Button } from '#app/components/ui/button';
import { Icon } from '#app/components/ui/icon';
import { Avatar } from './avatar';

import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from './dropdown';
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from './navbar';
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from './sidebar';
import { SidebarLayout } from './sidebar-layout';




function AccountDropdownMenu({ anchor }: { anchor: 'top start' | 'bottom end' }) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="/account">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/account/settings">
        <Cog8ToothIcon />
        <DropdownLabel>Settings</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}

type Content = {
  id: string;
  title: string;
};

function ContentSection({ username, contents }: { username: string; contents: Content[] }) {
  const location = useLocation();
  const isContentPage = location.pathname.includes('/content/');

  return (
    <div className={`mt-4 p-4 rounded-lg  lg:ring-zinc-950/5 dark:lg:ring-white/10 ${isContentPage ? 'hidden md:block' : ''}`}>
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
  const isSettingsPage = location.pathname.includes('/settings');
  const isContentPage = location.pathname.includes('/content/');
  const isIndexPage = location.pathname === '/account';
  const hideSidebarOnMobile = isSettingsPage || isContentPage || !isIndexPage;

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="/users/erica.jpg" square />
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Avatar slot="icon" src="/img/beta.png" className='bg-gray-200'  />
                <SidebarLabel>Creemson Beta</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
                <DropdownItem href="#">
                  <Avatar slot="icon" src="/img/beta.png" className='bg-green-500' />
                  <DropdownLabel>Betav1.0</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="#">
                  <Avatar slot="icon" src="/img/beta.png" className='bg-gray-200'/>
                  <DropdownLabel className='text-gray-500/50'>Betav2.0</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="#">
                  <Avatar slot="icon" src="/img/beta.png" className='bg-gray-200' />
                  <DropdownLabel className='text-gray-500/50'>Betav3.0</DropdownLabel>
                </DropdownItem>
             

              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            {isAdmin && (
              <SidebarSection>
                <ContentSection username={user.username} contents={user.content} />
              </SidebarSection>
            )}
            <SidebarSpacer />
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden ">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar src={user.image ? `/users/${user.image.id}` : undefined} className="size-4" square alt="" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                      {user.name || user.username}
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      {user.email}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:gap-4">
          <main className={`flex-grow md:px-4 rounded-lg ${hideSidebarOnMobile ? 'w-full' : 'hidden md:block'}`}>
            {children}
          </main>
        </div>
      </div>
    </SidebarLayout>
  );
}