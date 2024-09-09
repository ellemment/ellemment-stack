// app/utils/admin-setup.server.ts

import { AdminType } from './admin-types'
import { prisma } from './db.server'

export async function setupInitialAdmins() {
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL
  if (!superAdminEmail) {
    console.warn('SUPER_ADMIN_EMAIL not set. Skipping initial admin setup.')
    return
  }

  const existingSuperAdmin = await prisma.user.findFirst({
    where: { email: superAdminEmail, adminRoles: { some: { type: AdminType.SUPER_ADMIN } } }
  })

  if (!existingSuperAdmin) {
    await prisma.user.update({
      where: { email: superAdminEmail },
      data: {
        adminRoles: {
          create: Object.values(AdminType).map(type => ({ type }))
        }
      }
    })
    console.log(`Super admin role assigned to ${superAdminEmail}`)
  }
}