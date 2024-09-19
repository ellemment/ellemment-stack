// app/ellemment-ui/components/account/account-layout.tsx

import React from 'react'
import { AccountFooter } from './account-footer'
import { AccountHeader } from './account-header'
import { AccountPanel } from './account-panel'
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
  user: User;
  children: React.ReactNode;
}

export function AccountLayout({ user,  children }: AccountLayoutProps) {
  const sidebarContent = (
    <Sidebar>
      <SidebarHeader>
        <AccountHeader />
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection>
          <AccountPanel username={user.username} contents={user.content} />
        </SidebarSection>
        <SidebarSpacer />
      </SidebarBody>
      <SidebarFooter>
        <AccountFooter user={user} />
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
        <AccountHeader />
        <main className="flex-1 p-4">
          {children}
        </main>
        <AccountFooter user={user} />
      </div>
    </>
  );
}