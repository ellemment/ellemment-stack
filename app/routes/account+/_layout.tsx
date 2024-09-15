// app/routes/account+/_layout.tsx

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, Link, NavLink, useLoaderData, useLocation } from '@remix-run/react';
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { checkAdminStatus } from '#app/utils/adminstatus.ts'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { getUserImgSrc } from '#app/utils/misc.tsx'

type Content = {
  id: string;
  title: string;
};

function ContentSection({ username, contents }: { username: string, contents: Content[] }) {
  const location = useLocation();
  const isContentPage = location.pathname.includes('/content/');

  return (
    <div className={`mt-4 p-4 bg-muted rounded-lg ${isContentPage ? 'hidden md:block' : ''}`}>
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
  const location = useLocation()
  const isSettingsPage = location.pathname.includes('/settings')
  const isContentPage = location.pathname.includes('/content/')
  const hideSidebarOnMobile = isSettingsPage || isContentPage

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="flex flex-col md:flex-row md:gap-4">
        <aside className={`w-full md:min-w-80 md:w-80 lg:min-w-96 lg:w-96 mb-4 md:mb-0 ${hideSidebarOnMobile ? 'hidden md:block' : ''}`}>
          <div className="bg-muted rounded-lg p-4">
            <Link to="/account" className="block">
              <div className="flex items-center space-x-4">
                <img
                  src={getUserImgSrc(user.image?.id)}
                  alt={user.name ?? user.username}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold">{user.name ?? user.username}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </Link>
            <div className="mt-4 pt-4 p-2 border-t border-muted-foreground/20">
              <Link 
                to="/account/settings" 
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="avatar" className="mr-2 h-4 w-4" />
               Account Settings
              </Link>
            </div>
          </div>
          {isAdmin && <ContentSection username={user.username} contents={user.content} />}
        </aside>
        <main className={`flex-grow bg-card md:border md:p-4 rounded-lg ${hideSidebarOnMobile ? 'w-full' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}