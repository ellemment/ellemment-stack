

import { Link } from '@remix-run/react';
import Logo from '#app/components/logo';
import { Icon } from '#app/components/ui/icon';
import { type Theme } from '#app/utils/theme.server';


interface GlobalHeaderProps {
  userPreference: Theme | null;
  className?: string;
}

export function GlobalHeader({  className = '' }: GlobalHeaderProps) {

  return (
    <header className={`bg-background ${className}`}>
      <div className="container mx-auto max-w-6xl px-4">
        <nav className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo />
          </div>
          <div className="flex items-center space-x-2">
            <Link
              to="/account"
              className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              <Icon name="search" className="h-5 w-5" />
            </Link>
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

GlobalHeader.Logo = Logo;