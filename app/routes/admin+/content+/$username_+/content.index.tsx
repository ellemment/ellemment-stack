// app/routes/admin+/content+/$username_+/content.index.tsx

import { json, redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, type MetaFunction } from '@remix-run/react'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { requireUserWithRole } from '#app/utils/permissions.server.ts'
import { type loader as contentLoader } from './content.tsx'

export async function loader({ params, request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request)
  
  const owner = await prisma.user.findUnique({
    where: { username: params.username },
    select: { id: true, name: true, username: true, content: { select: { id: true } } },
  })

  if (!owner) {
    throw new Response('Not found', { status: 404 })
  }

  const isOwner = userId === owner.id
  let isAdmin = false

  try {
    await requireUserWithRole(request, 'admin')
    isAdmin = true
  } catch {
    // User is not an admin
  }

  // Only allow access if user is an admin or if they are both the owner and an admin
  if (!isAdmin && !(isOwner && isAdmin)) {
    return redirect(`/admin/content/${params.username}`)
  }

  return json({ isAdmin, isOwner, owner })
}

export default function ContentIndexRoute() {
  const { owner } = useLoaderData<typeof loader>()
  const contentCount = owner.content.length

  return (
    <div className="container pt-12">
      <p className="text-body-md">
        {contentCount === 0
          ? "No content available. Create new content using the 'New Content' button."
          : `Select a content item from the list (${contentCount} item${
              contentCount === 1 ? '' : 's'
            } available).`}
      </p>
    </div>
  )
}

export const meta: MetaFunction<
  typeof loader,
  { 'routes/admin+/content+/$username_+/content': typeof contentLoader }
> = ({ data, params, matches }) => {
  const contentMatch = matches.find(
    (m) => m.id === 'routes/admin+/content+/$username_+/content'
  )
  const displayName = data?.owner.name ?? contentMatch?.data?.owner.name ?? params.username
  const contentCount = data?.owner.content.length ?? contentMatch?.data?.owner.content.length ?? 0
  const contentText = contentCount === 1 ? 'content' : 'contents'
  
  return [
    { title: `${displayName}'s Content | ellemment` },
    {
      name: 'description',
      content: `Manage ${displayName}'s ${contentCount} ${contentText} on ellemment`,
    },
  ]
}