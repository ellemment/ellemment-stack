// app/routes/admin+/_layout.tsx

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { checkAdminStatus } from '#app/utils/adminstatus.ts'

export async function loader({ request }: LoaderFunctionArgs) {
  const { isAdmin } = await checkAdminStatus(request)
  
  if (!isAdmin) {
    throw new Response('Not authorized', { status: 403 })
  }

  return json({ isAdmin })
}

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}