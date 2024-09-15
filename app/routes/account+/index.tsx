// app/routes/account+/index.tsx

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, type MetaFunction } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { checkAdminStatus } from '#app/utils/adminstatus.ts'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request, {
    redirectTo: '/login',
  })
  const { isAdmin } = await checkAdminStatus(request)
  const user = await prisma.user.findUniqueOrThrow({
    select: {
      id: true,
      name: true,
      username: true,
      createdAt: true,
    },
    where: { id: userId },
  })
  return json({
    user,
    userJoinedDisplay: user.createdAt.toLocaleDateString(),
    isAdmin,
    isLoggedInUser: true,
    isAdminAndOwner: isAdmin,
  })
}

export default function ProfileRoute() {
  const data = useLoaderData<typeof loader>()
  const { user } = data

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="mt-4 flex flex-col items-start">
        <h1 className="text-center text-2xl font-bold">Spaces</h1>
        <p className="mt-2 text-start text-muted-foreground">{user.username}</p>
      </div>
      
      {/* You can add more sections or content here */}
    </div>
  )
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const displayName = data?.user.name ?? data?.user.username
  return [
    { title: `${displayName} | ellemment` },
    {
      name: 'description',
      content: `Profile of ${displayName} on ellemment`,
    },
  ]
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <p>User not found</p>,
      }}
    />
  )
}