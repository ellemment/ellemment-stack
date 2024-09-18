
// app/ellemment-ui/components/account/account-header.tsx

import {
  MagnifyingGlassIcon,
  MoonIcon,
  Bars2Icon
} from '@heroicons/react/16/solid'
import { Link } from '@remix-run/react'


interface AccountHeaderProps {
  className?: string;
}

export function AccountHeader({ className = '' }: AccountHeaderProps) {
  return (
    <div className={`flex items-center justify-between p-4 ${className}`}>
      <div className="flex items-center">
        <Link to="/account">
          <div className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
            ellemment
          </div>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <Link
          to="/account"
          className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </Link>
        <Link
          to="/account"
          className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <MoonIcon className="h-5 w-5" />
        </Link>
        <Link
          to="/account"
          className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <Bars2Icon className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}