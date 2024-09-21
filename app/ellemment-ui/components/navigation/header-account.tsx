// app/ellemment-ui/components/navigation/header-account.tsx

import { Link } from '@remix-run/react';
import Logo from '#app/components/logo';
import { Icon } from '#app/components/ui/icon';
import { ThemeSwitch } from '#app/routes/resources+/theme-switch';
import { type Theme } from '#app/utils/theme.server';


interface AccountHeaderProps {
  userPreference: Theme | null;
  className?: string;
}

export function AccountHeader({ userPreference, className = '' }: AccountHeaderProps) {


  return (
    <header className={`${className}`}>
      <div className="container mx-auto max-w-6xl px-4">
        <nav className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo />
          </div>
          <div className="flex items-center space-x-2">
            <Link
              to="/search"
              className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              <Icon name="search" className="h-5 w-5" />
            </Link>
            <ThemeSwitch userPreference={userPreference} />
            <button
              className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              onClick={() => {
                // TODO: Implement mobile menu toggle functionality
              }}
            >
              <Icon name="menu" className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

AccountHeader.Logo = Logo;