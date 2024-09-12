
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, type MetaFunction } from '@remix-run/react'
import { checkAdminStatus } from '#app/utils/adminstatus.ts'
import { prisma } from '#app/utils/db.server.ts'

export async function loader({ params, request }: LoaderFunctionArgs) {
    await checkAdminStatus(request)
    const user = await prisma.user.findUnique({
      where: { username: params.username },
      select: {
        id: true,
        name: true,
        username: true,
        _count: {
          select: {
            content: true,
            // Add other counts as needed, e.g.:
            // storeItems: true,
            // docs: true,
          },
        },
      },
    })
    if (!user) throw new Response('Not found', { status: 404 })
    return json({ user })
  }
  
  export default function AdminDashboardIndex() {
    const data = useLoaderData<typeof loader>()
    const { user } = data
  
    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold">Overview</h2>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Content</h3>
            <p className="mt-2 text-3xl font-bold">{user._count.content}</p>
          </div>
          {/* Add more stat cards as needed */}
        </div>
      </div>
    )
  }
  
  export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
    const displayName = data?.user.name ?? params.username
    return [
      { title: `${displayName}'s Admin Dashboard | ellemment` },
      {
        name: 'description',
        content: `Admin dashboard for ${displayName} on ellemment`,
      },
    ]
  }
  