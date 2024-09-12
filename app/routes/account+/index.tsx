// app/routes/account+/index.tsx
import { redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request, {
    redirectTo: '/login',
  })
  
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { username: true },
  })

  if (!user) {
    // This should never happen, but just in case
    return redirect('/login')
  }

  // Redirect to the user's account page
  return redirect(`/account/${user.username}`)
}

// We don't need a default export for this route anymore
// The loader will always redirect, so this component will never render