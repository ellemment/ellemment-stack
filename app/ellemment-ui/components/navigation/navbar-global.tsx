// app/ellemment-ui/components/navigation/navbar-global.tsx


import { NavLink } from '@remix-run/react'
import { Icon } from '#app/components/ui/icon'
import { Avatar } from '#app/ellemment-ui/components/account/avatar';
import { getUserImgSrc } from '#app/utils/misc'


interface User {
  id: string;
  name: string | null;
  username: string;
  email: string;
  image?: { id: string } | null;
}

interface GlobalNavbarProps {
  user: User;
}

export function GlobalNavbar({ user }: GlobalNavbarProps) {
  return (
      <div className="flex items-center justify-between p-4 m-4 rounded-lg max-lg:bg-white max-lg:shadow-sm max-lg:ring-1 max-lg:ring-zinc-950/5 max-lg:dark:bg-zinc-900 max-lg:dark:ring-white/10)}">
        <span className="flex min-w-0 items-center gap-3">
          <Avatar src={getUserImgSrc(user.image?.id)} className="size-8" square alt={user.name || user.username} />
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-zinc-950 dark:text-white">
              {user.name || user.username}
            </span>
            <span className="block truncate text-xs font-normal text-zinc-500 dark:text-zinc-400">
              {user.email}
            </span>
          </span>
        </span>
        <NavLink to="/account/settings" className="ml-2">
        <Icon name="settings" className="h-5 w-5 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200" />
        </NavLink>
      </div>
  );
}