// app/ellemment-ui/components/account/account-layout-mobile.tsx

import React from 'react';
import { AccountFooter } from './account-footer'
import { AccountHeader } from './account-header'

interface User {
  id: string;
  name: string | null;
  username: string;
  email: string;
  image?: { id: string } | null;
}

interface AccountLayoutMobileProps {
  user: User;
  children: React.ReactNode;
}

export function AccountLayoutMobile({ user, children }: AccountLayoutMobileProps) {
  return (
    <div className="lg:hidden flex flex-col min-h-screen">
      <AccountHeader/>
      <main className="flex-1 p-4">
        {children}
      </main>
      <AccountFooter user={user} />
    </div>
  );
}