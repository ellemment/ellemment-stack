import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData, Link, } from '@remix-run/react'
import { checkAdminStatus, checkOwnerStatus } from '#app/utils/adminstatus.ts'
import { prisma } from '#app/utils/db.server.ts'
import { getUserImgSrc } from '#app/utils/misc.tsx'


export async function loader({ params, request }: LoaderFunctionArgs) {
  const { isAdmin } = await checkAdminStatus(request)
  const owner = await prisma.user.findUnique({
    where: { username: params.username },
    select: { id: true, name: true, username: true, image: { select: { id: true } } },
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
  const { owner, isAdmin } = data

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64  p-4">
        <div className="mb-4 flex items-start">
          {isAdmin && (
            <Link to="/account">
              <img
                src={getUserImgSrc(owner.image?.id)}
                alt={owner.name ?? owner.username}
                className="mr-2 h-8 w-8 rounded-full"
              />
            </Link>
          )}
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="content" className="block py-2 text-foreground hover:text-primary">
               View
              </Link>
            </li>
            <li>
              <Link to="content/new" className="block py-2 text-foreground hover:text-primary">
                Create
              </Link>
            </li>
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