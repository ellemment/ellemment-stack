// app/routes/account+/index.tsx

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Form, Link, useLoaderData, type MetaFunction } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { Spacer } from '#app/components/spacer.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { checkAdminStatus } from '#app/utils/adminstatus.ts'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { getUserImgSrc } from '#app/utils/misc.tsx'


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
      image: { select: { id: true } },
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
  const { user, isLoggedInUser } = data
  const userDisplayName = user.name ?? user.username

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <Link to="settings" className="block">
    	<div className="flex items-center rounded-lg p-4 border bg-card">
				<div className="relative w-16 md:w-24">
					<img
						src={getUserImgSrc(data.user.image?.id)}
						alt={userDisplayName}
						className="h-16 w-16 md:h-24 md:w-24 rounded-full object-cover"
					/>
				</div>
				<div className="mt-4 flex flex-col items-start pl-4">
					<h1 className="text-center text-2xl font-bold">{userDisplayName}</h1>
					<p className="mt-2 text-start text-muted-foreground">
						{data.user.username}
					</p>
				</div>
			</div>
      </Link>
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