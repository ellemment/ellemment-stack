// app/routes/admin+/index.tsx

import { redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request)
  
  if (!userId) {
    // If user is not logged in, redirect to login page
    return redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { username: true },
  })

  if (!user) {
    // If user not found in database, log them out
    throw new Response('User not found', { status: 404 })
  }

  // Redirect to user's page
  return redirect(`/account`)
}

export default function AdminContentIndexRoute() {
  useLoaderData<typeof loader>()
  // This component should never render because the loader always results in a redirect
  // But it's kept as a fallback
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-h1 mb-4">Content Page</h1>
      <p className="text-body-md">Redirecting...</p>
    </div>
  )
}