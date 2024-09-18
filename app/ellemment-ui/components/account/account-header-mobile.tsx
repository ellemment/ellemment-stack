// app/ellemment-ui/components/account/account-header-mobile.tsx

  import { Link } from '@remix-run/react'
  import { Icon } from '#app/components/ui/icon'
  
  interface AccountHeaderMobileProps {
    className?: string;
  }
  
  export function AccountHeaderMobile({ className = '' }: AccountHeaderMobileProps) {
    return (
      <div className={`lg:hidden flex items-center justify-between p-4 ${className}`}>
         <div className="flex items-center">
          <Link to="/">
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
          <Icon name="search" className="h-5 w-5 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200" />
          </Link>
          <Link
            to="/account"
            className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <Icon name="dark-mode" className="h-5 w-5 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200" />
          </Link>
          <Link
            to="/account"
            className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
           <Icon name="menu" className="h-6 w-6 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200" />
          </Link>
        </div>
      </div>
    );
  }