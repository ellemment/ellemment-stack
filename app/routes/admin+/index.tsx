// app/routes/admin+/index.tsx

import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData, Form } from '@remix-run/react'
import { AdminType } from '#app/utils/admin-types'
import { prisma } from '#app/utils/db.server.ts'
import { requireUserWithRole } from '#app/utils/permissions.server.ts'

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserWithRole(request, AdminType.SUPER_ADMIN)
    
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
    
    return json({ users })
}

export async function action({ request }: ActionFunctionArgs) {
    await requireUserWithRole(request, AdminType.SUPER_ADMIN)
    
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

export default function AdminContentIndexRoute() {
    const { users } = useLoaderData<typeof loader>()
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Content Management</h1>
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