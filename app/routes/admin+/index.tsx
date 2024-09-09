import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData, Form, Link } from '@remix-run/react'
import { AdminType } from '#app/utils/admin-types'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { adminRoles: true }
  })

  if (!user?.adminRoles.some(role => role.type === AdminType.SUPER_ADMIN)) {
    return json({ isSuperAdmin: false, users: [] })
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      adminRoles: {
        select: { type: true }
      }
    }
  })

  return json({ isSuperAdmin: true, users })
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { adminRoles: true }
  })

  if (!user?.adminRoles.some(role => role.type === AdminType.SUPER_ADMIN)) {
    return redirect('/')
  }

  const formData = await request.formData()
  const targetUserId = formData.get('userId') as string
  const roleType = formData.get('roleType') as AdminType
  const action = formData.get('action') as 'add' | 'remove'

  if (action === 'add') {
    await prisma.adminRole.create({
      data: { userId: targetUserId, type: roleType }
    })
  } else if (action === 'remove') {
    await prisma.adminRole.deleteMany({
      where: { userId: targetUserId, type: roleType }
    })
  }

  return json({ success: true })
}

export default function AdminIndexRoute() {
  const { isSuperAdmin, users } = useLoaderData<typeof loader>()

  if (!isSuperAdmin) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="mb-4">You do not have permission to view this page.</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Return to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <ul className="space-y-4">
        {users.map(user => (
          <li key={user.id} className="border p-4 rounded">
            <h2 className="text-xl">{user.username} ({user.email})</h2>
            <ul className="mt-2 space-y-2">
              {Object.values(AdminType).map(roleType => (
                <li key={roleType} className="flex items-center">
                  <span className="mr-2">{roleType}:</span>
                  {user.adminRoles.some(role => role.type === roleType) ? (
                    <Form method="POST">
                      <input type="hidden" name="userId" value={user.id} />
                      <input type="hidden" name="roleType" value={roleType} />
                      <input type="hidden" name="action" value="remove" />
                      <button type="submit" className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
                    </Form>
                  ) : (
                    <Form method="POST">
                      <input type="hidden" name="userId" value={user.id} />
                      <input type="hidden" name="roleType" value={roleType} />
                      <input type="hidden" name="action" value="add" />
                      <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded">Add</button>
                    </Form>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}