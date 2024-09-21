

// app/ellemment-ui/components/account/account-footer.tsx


import { NavLink } from '@remix-run/react'
import { Icon } from '#app/components/ui/icon'

export function AccountSettings() {
  return (
    <div className="flex items-center justify-start p-4">
      <NavLink to="/account/settings" className="flex items-center text-zinc-900 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
        <Icon name="settings" className="h-5 w-5 mr-4" />
        <span className="text-md font-semibold">Settings</span>
      </NavLink>
    </div>
  );
}