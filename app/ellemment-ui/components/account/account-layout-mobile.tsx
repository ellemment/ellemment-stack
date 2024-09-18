// app/ellemment-ui/components/account/account-layout-mobile.tsx
import React from 'react';
import { AccountFooterMobile } from './account-footer-mobile';
import { AccountHeaderMobile } from './account-header-mobile';
import { AccountPanelMobile } from './account-panel-mobile';


interface User {
  id: string;
  name: string | null;
  username: string;
  email: string;
  image?: { id: string } | null;
  content: { id: string; title: string; }[];
}

interface AccountLayoutMobileProps {
  user: User;
  children: React.ReactNode;
}

export function AccountLayoutMobile({ user, children }: AccountLayoutMobileProps) {
  return (
    <div className="lg:hidden flex flex-col min-h-screen">
      <AccountHeaderMobile />
      <div className="flex-1">
        <AccountPanelMobile username={user.username} contents={user.content} />
        <main className="p-6">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </div>
      <AccountFooterMobile user={user} />
    </div>
  );
}