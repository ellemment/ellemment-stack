// app/routes/account+/_layout.tsx

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, Link, NavLink, useLoaderData } from '@remix-run/react';
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { checkAdminStatus } from '#app/utils/adminstatus.ts'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { getUserImgSrc } from '#app/utils/misc.tsx'

type IconName = 'avatar' | 'pencil-1' | 'camera' | 'envelope-closed' | 'lock-closed' | 'lock-open-1' | 'dots-horizontal' | 'laptop' | 'link-2' | 'download' | 'trash' | 'exit' | 'file-text' | 'plus';

type NavItem = {
  to: string;
  icon: IconName;
  label: string;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

type Content = {
  id: string;
  title: string;
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
    <div className="mb-6">
      <h2 className="mb-2 text-sm font-semibold text-muted-foreground">{section.title}</h2>
      <ul className="space-y-1">
        {section.items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted/80'
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

function ContentSection({ username, contents }: { username: string, contents: Content[] }) {
  return (
    <div className="mt-6 p-4 bg-muted rounded-lg">
      <h2 className="mb-2 text-sm font-semibold text-muted-foreground">Content</h2>
      <Button asChild variant="outline" className="w-full mb-4">
        <NavLink to={`${username}/content/new`} className="flex items-center justify-center">
          <Icon name="plus" className="mr-2 h-4 w-4" />
          <span className="text-sm">New Content</span>
        </NavLink>
      </Button>
      <ul className="space-y-1">
        {contents.map((content) => (
          <li key={content.id}>
            <NavLink
              to={`${username}/content/${content.id}`}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted/80'
                }`
              }
            >
              <Icon name="file-text" className="mr-2 h-4 w-4" />
              <span className="text-sm">{content.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request)
  const { isAdmin } = await checkAdminStatus(request)
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      image: { select: { id: true } },
      createdAt: true,
      content: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  })
  return json({ user, isAdmin })
}

export default function AccountLayout() {
  const data = useLoaderData<typeof loader>()
  const { user, isAdmin } = data

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="flex flex-col md:flex-row md:gap-4">
        <aside className="w-full md:w-72 mb-4 md:mb-0">
          <Link to="/account" className="block">
            <div className="bg-muted rounded-lg p-4 mb-4 hover:bg-muted/80 transition-colors">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={getUserImgSrc(user.image?.id)}
                  alt={user.name ?? user.username}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold">{user.name ?? user.username}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>
          </Link>
          {isAdmin && <ContentSection username={user.username} contents={user.content} />}

          <nav className="bg-muted mt-4 rounded-lg p-4">
            {navSections.map((section) => (
              <NavSection key={section.title} section={section} />
            ))}
          </nav>

          <div className="mt-4 p-4 bg-muted rounded-lg">
            <Button asChild variant="ghost" className="w-full justify-start">
              <NavLink to="/logout" className="flex items-center">
                <Icon name="exit" className="mr-2 h-4 w-4" />
                <span className="text-sm">Log out</span>
              </NavLink>
            </Button>
          </div>
        </aside>
        <main className="flex-grow bg-card border rounded-lg p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}