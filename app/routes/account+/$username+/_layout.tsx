import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData, NavLink } from '@remix-run/react'
import { checkAdminStatus, checkOwnerStatus } from '#app/utils/adminstatus.ts'
import { prisma } from '#app/utils/db.server.ts'
import { getUserImgSrc, cn } from '#app/utils/misc.tsx'
import { Icon } from '#app/components/ui/icon.tsx'

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { isAdmin } = await checkAdminStatus(request)
  const owner = await prisma.user.findUnique({
    where: { username: params.username },
    select: {
      id: true,
      name: true,
      username: true,
      image: { select: { id: true } },
      content: { select: { id: true, title: true } },
    },
  })
  invariantResponse(owner, 'Owner not found', { status: 404 })
  const { isOwner } = await checkOwnerStatus(request, owner.id)
  if (!isAdmin && !isOwner) {
    throw new Response('Not authorized', { status: 403 })
  }
  return json({ owner, isAdmin, isOwner })
}

export default function AdminUserLayout() {
  const data = useLoaderData<typeof loader>()
  const navLinkDefaultClassName =
    'block py-2 text-foreground hover:text-primary'

  return (
 
    <div className="flex h-screen bg-background max-w-5xl mx-auto">
      {/* Sidebar */}
      <aside className="w-64 p-4">
        <nav>
          <ul className="space-y-2">
            {(data.isAdmin || (data.isOwner && data.isAdmin)) && (
              <li>
                <NavLink
                  to="content/new"
                  className={({ isActive }) =>
                    cn(navLinkDefaultClassName, isActive && 'text-primary')
                  }
                >
                  <Icon name="plus">New Content</Icon>
                </NavLink>
              </li>
            )}
            {data.owner.content.map((content) => (
              <li key={content.id}>
                <NavLink
                  to={`content/${content.id}`}
                  className={({ isActive }) =>
                    cn(navLinkDefaultClassName, isActive && 'text-primary')
                  }
                >
                  {content.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}