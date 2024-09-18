// app/ellemment-ui/components/account/account-layout.tsx


import { useLocation } from '@remix-run/react';
import React from 'react';

import { getUserImgSrc } from '#app/utils/misc';
import { AccountFooter } from './account-footer';
import { AccountHeader } from './account-header';
import { AccountPanel } from './account-panel'
import { Avatar } from './avatar';

import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarSection,
  SidebarSpacer,
} from './sidebar';
import { SidebarLayout } from './sidebar-layout'



type Content = {
  id: string;
  title: string;
};



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
        <AccountHeader/>
      </SidebarHeader>

      <SidebarBody>
        {isAdmin && (
          <SidebarSection>
            <AccountPanel username={user.username} contents={user.content} />
          </SidebarSection>
        )}
        <SidebarSpacer />
      </SidebarBody>

      <SidebarFooter>
        <AccountFooter user={user} />
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