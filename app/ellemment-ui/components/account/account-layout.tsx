// app/ellemment-ui/components/account/account-layout.tsx

import React from 'react'
import { type Theme } from '#app/utils/theme.server.ts'
import { AccountHeader } from '../navigation/header-account'
import { GlobalHeader } from '../navigation/header-global'
import { AccountNavbar } from '../navigation/navbar-account'
import { GlobalNavbar } from '../navigation/navbar-global'
import { CreateButton } from './account-create'
import { AccountPanel } from './account-panel'
import { AccountSettings } from './account-settings'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarSection,
  SidebarSpacer,
} from './sidebar'


type Content = {
  id: string;
  title: string;
};

interface User {
  id: string;
  name: string | null;
  username: string;
  email: string;
  image?: { id: string } | null;
  content: Content[];
}

interface AccountLayoutProps {
  user: User | null;
  children: React.ReactNode;
  userPreference: Theme | null;
}

export function AccountLayout({ user, children, userPreference }: AccountLayoutProps) {
  const isAuthenticated = !!user;

  const sidebarContent = (
    <Sidebar>
      <SidebarHeader>
        <AccountHeader userPreference={userPreference} />
      </SidebarHeader>
      <SidebarBody>
        {isAuthenticated && (
          <>
            <SidebarSection>
              <CreateButton username={user.username} />
            </SidebarSection>
          
            <SidebarSection>
              <AccountPanel username={user.username} contents={user.content} />
            </SidebarSection>

            <SidebarSpacer />

            <SidebarSection>
              <AccountSettings />
            </SidebarSection>

          </>
        )}
      </SidebarBody>
      <SidebarFooter>
      <AccountNavbar isAuthenticated={isAuthenticated} />
      </SidebarFooter>
    </Sidebar>
  );

  return (
    <>
      {/* Desktop View */}
      <div className="relative isolate flex min-h-svh w-full max-lg:hidden">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-96 max-lg:hidden">
          {sidebarContent}
        </div>
        {/* Content */}
        <main className="hidden bg-zinc-100 dark:bg-inherit lg:flex lg:flex-1 lg:flex-col lg:pb-2 lg:pl-96 lg:pr-2 lg:pt-2">
          <div className="grow p-6 rounded-lg bg-white shadow-sm ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
            <div className="mx-auto max-w-5xl">{children}</div>
          </div>
        </main>
      </div>
      {/* Mobile View */}
      <div className="lg:hidden flex flex-col min-h-screen">
        <GlobalHeader userPreference={userPreference} />
        <main className="flex-1 p-4 pb-20">
          {children}
        </main>
        <GlobalNavbar isAuthenticated={isAuthenticated} />
      </div>
    </>
  );
}