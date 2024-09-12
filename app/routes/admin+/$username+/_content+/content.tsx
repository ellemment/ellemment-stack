// app/routes/admin+/content+/$username_+/content.tsx
import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Link, NavLink, Outlet, useLoaderData } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { checkAdminStatus, checkOwnerStatus } from '#app/utils/adminstatus.ts'
import { prisma } from '#app/utils/db.server.ts'
import { cn, getUserImgSrc } from '#app/utils/misc.tsx'


export async function loader({ params, request }: LoaderFunctionArgs) {
await checkAdminStatus(request)

  const owner = await prisma.user.findFirst({
    select: {
      id: true,
      name: true,
      username: true,
      image: { select: { id: true } },
      content: { select: { id: true, title: true } },
    },
    where: { username: params.username },
  })

  invariantResponse(owner, 'Owner not found', { status: 404 })

  const { isAdmin, isOwner } = await checkOwnerStatus(request, owner.id)

  return json({ owner, isAdmin, isOwner })
}

export default function ContentRoute() {
  const data = useLoaderData<typeof loader>()
  const ownerDisplayName = data.owner.name ?? data.owner.username
  const navLinkDefaultClassName =
    'line-clamp-2 block rounded-l-full py-2 pl-8 pr-6 text-base lg:text-xl'

  return (
    <main className="flex h-full min-h-[400px] px-0 pb-12">
      <div className="grid w-full grid-cols-4 md:rounded-3xl md:pr-0">
        <div className="relative col-span-1">
          <div className="absolute inset-0 flex flex-col">
            <ul className="overflow-y-auto overflow-x-hidden pb-12">
              {(data.isAdmin || (data.isOwner && data.isAdmin)) && (
                <li className="p-1 pr-0">
                  <NavLink
                    to="new"
                    className={({ isActive }) =>
                      cn(navLinkDefaultClassName, isActive && 'bg-accent')
                    }
                  >
                    <Icon name="plus">New Content</Icon>
                  </NavLink>
                </li>
              )}
              {data.owner.content.map((content) => (
                <li key={content.id} className="p-1 pr-0">
                  <NavLink
                    to={content.id}
                    preventScrollReset
                    prefetch="intent"
                    className={({ isActive }) =>
                      cn(navLinkDefaultClassName, isActive && 'bg-accent')
                    }
                  >
                    {content.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative col-span-3">
          <Outlet />
        </div>
      </div>
    </main>
  )
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: ({ params }) => (
          <p>No user with the username "{params.username}" exists</p>
        ),
      }}
    />
  )
}