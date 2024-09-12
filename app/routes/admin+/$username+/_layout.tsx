import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData, Link, Form } from '@remix-run/react'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
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
  const { owner, isAdmin, isOwner } = data

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-muted p-4">
        <div className="mb-4 flex items-center">
          <img
            src={getUserImgSrc(owner.image?.id)}
            alt={owner.name ?? owner.username}
            className="mr-2 h-8 w-8 rounded-full"
          />
          <span className="font-semibold">{owner.name ?? owner.username}</span>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="." className="block py-2 text-foreground hover:text-primary">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="content" className="block py-2 text-foreground hover:text-primary">
                Content
              </Link>
            </li>
        
          </ul>
        </nav>
      </aside>
      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="bg-muted p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              {isOwner && <span className="mr-4">Owner</span>}
              {isAdmin && <span className="mr-4">Admin</span>}
              {isAdmin && (
                <Link to="/account/settings" className="mr-4">
                  Account
                </Link>
            )}
              <Form action="/logout" method="POST">
                <Button type="submit" variant="outline" size="sm">
                  <Icon name="exit" className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </Form>
            </div>
          </div>
        </header>
        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}