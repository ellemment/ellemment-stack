// app/routes/account+/_layout.tsx
import { Outlet, NavLink } from '@remix-run/react';
import { Icon } from '#app/components/ui/icon.tsx';

type IconName = 'avatar' | 'pencil-1' | 'camera' | 'envelope-closed' | 'lock-closed' | 'lock-open-1' | 'dots-horizontal' | 'laptop' | 'link-2' | 'download' | 'trash';

type NavItem = {
  to: string;
  icon: IconName;
  label: string;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const navSections: NavSection[] = [
  {
    title: "Account",
    items: [
      { to: 'settings/username', icon: 'avatar', label: 'Change username' },
      { to: 'settings/name', icon: 'pencil-1', label: 'Change name' },
      { to: 'settings/photo', icon: 'camera', label: 'Change profile photo' },
      { to: 'settings/change-email', icon: 'envelope-closed', label: 'Change email' },
    ]
  },
  {
    title: "Security",
    items: [
      { to: 'settings/two-factor', icon: 'lock-closed', label: 'Two-Factor Authentication' },
      { to: 'settings/password', icon: 'dots-horizontal', label: 'Password' },
      { to: 'settings/your-sessions', icon: 'laptop', label: 'Manage your sessions' },
    ]
  },
  {
    title: "Connections",
    items: [
      { to: 'settings/connections', icon: 'link-2', label: 'Manage connections' },
    ]
  },
  {
    title: "Data",
    items: [
      { to: 'settings/download-data', icon: 'download', label: 'Download your data' },
      { to: 'settings/delete-data', icon: 'trash', label: 'Delete Account' },
    ]
  }
];

function NavSection({ section }: { section: NavSection }) {
  return (
    <div className="mb-4">
      <h2 className="mb-2 text-sm font-semibold text-muted-foreground">{section.title}</h2>
      <ul className="space-y-1">
        {section.items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={`/account/${item.to}`}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? 'bg-muted/90' : 'hover:bg-muted/90'
                }`
              }
            >
              <Icon name={item.icon} className="mr-2 h-4 w-4" />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AccountLayout() {
  return (
    <div className="mx-auto max-w-5xl p-4">
      <div className="flex flex-col md:flex-row md:gap-8">
        <nav className="w-full md:w-64 mb-8 md:mb-0">
          {navSections.map((section) => (
            <NavSection key={section.title} section={section} />
          ))}
        </nav>
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
}