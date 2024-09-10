import { json, redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { requireUserWithRole } from '#app/utils/permissions.server.ts'
import { ContentEditor } from './__content-editor.tsx'

export { action } from './__content-editor.server.tsx'

export async function loader({ params, request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request)

  const owner = await prisma.user.findUnique({
    where: { username: params.username },
    select: { id: true },
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

  return json({ isAdmin, isOwner })
}

export default function NewContent() {
	const data = useLoaderData<typeof loader>()
	return <ContentEditor isAdmin={data.isAdmin} isOwner={data.isOwner} />
  }
  