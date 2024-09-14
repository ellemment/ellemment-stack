import { type SEOHandle } from '@nasa-gcn/remix-seo'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { Icon } from '#app/components/ui/icon.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { twoFAVerificationType } from './settings.two-factor.tsx'

export const handle: SEOHandle = {
	getSitemapEntries: () => null,
}

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await requireUserId(request)
	const user = await prisma.user.findUniqueOrThrow({
		where: { id: userId },
		select: {
			id: true,
			name: true,
			username: true,
			email: true,
			image: {
				select: { id: true },
			},
		},
	})

	const twoFactorVerification = await prisma.verification.findUnique({
		select: { id: true },
		where: { target_type: { type: twoFAVerificationType, target: userId } },
	})

	const password = await prisma.password.findUnique({
		select: { userId: true },
		where: { userId },
	})

	return json({
		user,
		hasPassword: Boolean(password),
		isTwoFactorEnabled: Boolean(twoFactorVerification),
	})
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div className="rounded-lg bg-muted p-4 md:p-6">
			<h2 className="mb-4 text-lg font-bold">{title}</h2>
			<div className="flex flex-col gap-4">{children}</div>
		</div>
	)
}

export default function SettingsIndex() {
	const data = useLoaderData<typeof loader>()

	return (
		<div className="flex flex-col gap-6 md:gap-8">
			<SettingsSection title="Account">
				<Link to="username">
					<Icon name="avatar">Change username</Icon>
				</Link>
				<Link to="name">
					<Icon name="pencil-1">Change name</Icon>
				</Link>
				<Link to="photo">
					<Icon name="camera">Change profile photo</Icon>
				</Link>
				<Link to="change-email">
					<Icon name="envelope-closed">
						Change email from {data.user.email}
					</Icon>
				</Link>
			</SettingsSection>

			<SettingsSection title="Security">
				<Link to="two-factor">
					{data.isTwoFactorEnabled ? (
						<Icon name="lock-closed">2FA is enabled</Icon>
					) : (
						<Icon name="lock-open-1">Enable 2FA</Icon>
					)}
				</Link>
				<Link to={data.hasPassword ? 'password' : 'password/create'}>
					<Icon name="dots-horizontal">
						{data.hasPassword ? 'Change Password' : 'Create a Password'}
					</Icon>
				</Link>
				<Link to="your-sessions">
					<Icon name="laptop">Manage your sessions</Icon>
				</Link>
			</SettingsSection>

			<SettingsSection title="Connections">
				<Link to="connections">
					<Icon name="link-2">Manage connections</Icon>
				</Link>
			</SettingsSection>
			
			<SettingsSection title="Data">
				<Link to="download-data">
					<Icon name="download">Download your data</Icon>
				</Link>
				<Link to="delete-data">
					<Icon name="trash">Delete Account</Icon>
				</Link>
			</SettingsSection>
		</div>
	)
}