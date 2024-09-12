// app/routes/admin+/index.tsx

import { redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { checkAdminStatus } from '#app/utils/adminstatus.ts'

export async function loader({ request }: LoaderFunctionArgs) {
  const { user, isAdmin } = await checkAdminStatus(request)

  if (isAdmin) {
    // If user is admin, redirect to their admin content page
    return redirect(`/admin/${user.username}`)
  } else {
    // If user is logged in but not an admin, redirect to their user page
    return redirect(`/users/${user.username}`)
  }
}

export default function AdminContentIndexRoute() {
  useLoaderData<typeof loader>()
  // This component should never render because all paths in the loader result in a redirect
  // But TypeScript is added compatibility and as a fallback
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-h1 mb-4">Admin Content</h1>
      <p className="text-body-md">Redirecting...</p>
    </div>
  )
}