// app/components/admin/sidebar.tsx

import { Link, useLocation } from '@remix-run/react'
import { cn } from '#app/utils/misc'

type SidebarProps = {
  username: string
}

export function Sidebar({ username }: SidebarProps) {
  const location = useLocation()

  const navItems = [
    { to: `/admin/${username}`, label: 'Dashboard', exact: true },
    { to: `/admin/${username}/content`, label: 'Content' },
    { to: `/admin/${username}/store`, label: 'Store' },
    { to: `/admin/${username}/docs`, label: 'Docs' },
  ]

  return (
    <aside className="w-64 bg-muted p-4">
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  "block rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  isActiveRoute(location.pathname, item.to, item.exact)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted-foreground/10"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

function isActiveRoute(currentPath: string, linkPath: string, exact = false) {
  if (exact) {
    return currentPath === linkPath
  }
  return currentPath.startsWith(linkPath)
}