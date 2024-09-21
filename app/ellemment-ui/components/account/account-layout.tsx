import React from 'react'
import { type Theme } from '#app/utils/theme.server.ts'
import { CreateButton } from './account-create'
import { AccountPanel } from './account-panel'
import { AccountSettings } from './account-settings'
import {
  Sidebar,
  SidebarBody,
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

export function AccountLayout({ user, children }: AccountLayoutProps) {
  const isAuthenticated = !!user;

  const sidebarContent = (
    <Sidebar>
      {isAuthenticated && (
        <SidebarHeader>
          <CreateButton username={user.username} />
        </SidebarHeader>
      )}
      <SidebarBody>
        {isAuthenticated && (
          <>
            <SidebarSection>
              <AccountPanel username={user.username} contents={user.content} />
            </SidebarSection>
            <SidebarSection>
              <AccountSettings />
            </SidebarSection>
          </>
        )}
      </SidebarBody>
    </Sidebar>
  );

  return (
    <>
      {/* Desktop View */}
      <div className="mt-16 flex justify-center w-full max-lg:hidden">
        <div className="max-w-7xl w-full relative isolate flex min-h-svh">
          {/* Sidebar */}
          <div className="w-80 max-lg:hidden">
            {sidebarContent}
          </div>
          {/* Content */}
          <main className="hidden dark:bg-inherit lg:flex lg:flex-1 lg:flex-col lg:pb-2 lg:pl-2 lg:pr-2 lg:pt-2">
            <div className="grow p-6 rounded-lg flex flex-col">
              <div className="flex-grow w-full">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
      {/* Mobile View */}
      <div className="lg:hidden flex flex-col min-h-screen">
        <div className='h-14'></div>
        <main className="flex-1 p-4 pb-20">
          {children}
        </main>
      </div>
    </>
  );
}