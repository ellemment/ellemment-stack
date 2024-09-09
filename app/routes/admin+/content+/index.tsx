import { json, redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { getUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { requireUserWithRole } from '#app/utils/permissions.server.ts'

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request)
  
  // If user is not logged in, redirect to login page
  if (!userId) {
    return redirect('/login?redirectTo=/admin/content')
  }

  try {
    // Check if the user has admin role
    await requireUserWithRole(request, 'admin')
    
    // Fetch the username for the admin user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { username: true }
    })

    if (!user) {
      throw new Error('User not found')
    }

    // If user is admin, redirect to their admin content page using username
    return redirect(`/admin/content/${user.username}`)
  } catch (error: unknown) {
    // If user is logged in but not an admin, or if there's any other error
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
    return json(
      { status: 'error', message: 'Insufficient permissions', error: errorMessage },
      { status: 403 }
    )
  }
}

export default function AdminContentIndexRoute() {
  const data = useLoaderData<typeof loader>()

  if (data?.status === 'error') {
    return (
      <div className="container flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-h1 mb-4">Access Denied</h1>
        <p className="text-body-md mb-4">{data.message}</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    )
  }

  // This shouldn't be reached due to redirects, but including for completeness
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-h1 mb-4">Admin Content</h1>
      <p className="text-body-md">Loading admin content...</p>
    </div>
  )
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        403: () => (
          <div className="container flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-h1 mb-4">Access Denied</h1>
            <p className="text-body-md mb-4">You do not have permission to access this page.</p>
            <Link to="/" className="text-blue-600 hover:underline">
              Return to Home
            </Link>
          </div>
        ),
        404: () => (
          <div className="container flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-h1 mb-4">Page Not Found</h1>
            <p className="text-body-md mb-4">The page you're looking for doesn't exist.</p>
            <Link to="/" className="text-blue-600 hover:underline">
              Return to Home
            </Link>
          </div>
        ),
      }}
    />
  )
}