// app/ellemment-ui/components/account/account-footer-desktop.tsx

import { Link } from '@remix-run/react'
import { Icon } from '#app/components/ui/icon'
import { getUserImgSrc } from '#app/utils/misc';
import { Avatar } from './avatar';
import { SidebarDivider } from './sidebar';

interface User {
  id: string;
  name: string | null;
  username: string;
  email: string;
  image?: { id: string } | null;
}

interface AccountFooterDesktopProps {
  user: User;
}

export function AccountFooterDesktop({ user }: AccountFooterDesktopProps) {
  return (
    <div className="hidden lg:block">
      <span className="min-w-0">
        <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
          Beta Versions
        </span>
      </span>
      <SidebarDivider />
      <div className="flex items-center justify-between p-4">
        <Link to="/account" className="flex min-w-0 items-center gap-3">
          <Avatar src={getUserImgSrc(user.image?.id)} className="size-4" square alt={user.name || user.username} />
          <span className="min-w-0">
            <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
              {user.name || user.username}
            </span>
            <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
              {user.email}
            </span>
          </span>
        </Link>
        <Link to="/account/settings" className="ml-2">
          <Icon name="settings" className="h-5 w-5 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200" />
        </Link>
      </div>
    </div>
  );
}