// app/ellemment-ui/components/account/account-layout.tsx

import React from 'react'
import { AccountLayoutMobile } from './account-layout-mobile'
import { AccountLayoutSidebar } from './account-layout-sidebar'

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

export function AccountLayout({
  user,
  children,
}: {
  user: User;
  isAdmin: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <AccountLayoutSidebar user={user}>
        {children}
      </AccountLayoutSidebar>
      <AccountLayoutMobile user={user}>
        {children}
      </AccountLayoutMobile>
    </>
  );
}