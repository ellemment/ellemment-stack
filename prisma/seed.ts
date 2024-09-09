// prisma/seed.ts
import { promiseHash } from 'remix-utils/promise'
import { AdminType } from '#app/utils/admin-types'
import { prisma } from '#app/utils/db.server.ts'
import { MOCK_CODE_GITHUB, MOCK_CODE_GOOGLE } from '#app/utils/providers/constants'
import {
	cleanupDb,
	createPassword,
	getContentImages,
	getUserImages,
	img,
} from '#tests/db-utils.ts'
import { insertGitHubUser } from '#tests/mocks/github.ts'
import { insertGoogleUser } from '#tests/mocks/google.ts'


async function seed() {
	console.log('🌱 Seeding...')
	console.time(`🌱 Database has been seeded`)

	console.time('🧹 Cleaned up the database...')
	await cleanupDb(prisma)
	console.timeEnd('🧹 Cleaned up the database...')

	console.time('🔑 Created permissions...')
	const entities = ['user', 'content']
	const actions = ['create', 'read', 'update', 'delete']
	const accesses = ['own', 'any'] as const

	let permissionsToCreate = []
	for (const entity of entities) {
		for (const action of actions) {
			for (const access of accesses) {
				permissionsToCreate.push({ entity, action, access })
			}
		}
	}
	await prisma.permission.createMany({ data: permissionsToCreate })
	console.timeEnd('🔑 Created permissions...')

	console.time('👑 Created roles...')
	await prisma.role.create({
		data: {
			name: 'admin',
			permissions: {
				connect: await prisma.permission.findMany({
					select: { id: true },
					where: { access: 'any' },
				}),
			},
		},
	})
	await prisma.role.create({
		data: {
			name: 'user',
			permissions: {
				connect: await prisma.permission.findMany({
					select: { id: true },
					where: { access: 'own' },
				}),
			},
		},
	})
	console.timeEnd('👑 Created roles...')

	const totalUsers = 5
	console.time(`👤 Created ${totalUsers} users...`)
	const contentImages = await getContentImages()
	const userImages = await getUserImages()

	for (let index = 0; index < totalUsers; index++) {
		const username = `ellemment_${index + 1}`
		const name = `Ellemment ${index + 1}`
		const contentImage = contentImages[index % contentImages.length]
		await prisma.user
			.create({
				select: { id: true },
				data: {
					email: `${username}@example.com`,
					username,
					name,
					password: { create: createPassword('ellemment') },
					image: { create: userImages[index % userImages.length] },
					roles: { connect: { name: 'user' } },
					content: {
						create: [
							{
								title: `${name}'s First Content`,
								content: `This is the first content for ${name}.`,
								images: contentImage
									? {
										create: [
											{
												altText: contentImage.altText,
												contentType: contentImage.contentType,
												blob: contentImage.blob,
											},
										],
									}
									: undefined,
							},
						],
					},
				},
			})
			.catch((e) => {
				console.error('Error creating a user:', e)
				return null
			})
	}
	console.timeEnd(`👤 Created ${totalUsers} users...`)

	console.time(`🧑‍💻 Created admin user "ellemmentdev"`)

	const ellemmentImages = await promiseHash({
		ellemmentdevUser: img({ filepath: './tests/fixtures/images/user/kody.png' }),
		cuteKoala: img({
			altText: 'an adorable koala cartoon illustration',
			filepath: './tests/fixtures/images/kody-content/cute-koala.png',
		}),
		koalaEating: img({
			altText: 'a cartoon illustration of a koala in a tree eating',
			filepath: './tests/fixtures/images/kody-content/koala-eating.png',
		}),
		koalaCuddle: img({
			altText: 'a cartoon illustration of koalas cuddling',
			filepath: './tests/fixtures/images/kody-content/koala-cuddle.png',
		}),
		mountain: img({
			altText: 'a beautiful mountain covered in snow',
			filepath: './tests/fixtures/images/kody-content/mountain.png',
		}),
		koalaCoder: img({
			altText: 'a koala coding at the computer',
			filepath: './tests/fixtures/images/kody-content/koala-coder.png',
		}),
		koalaMentor: img({
			altText:
				'a koala in a friendly and helpful posture. The Koala is standing next to and teaching a woman who is coding on a computer and shows positive signs of learning and understanding what is being explained.',
			filepath: './tests/fixtures/images/kody-content/koala-mentor.png',
		}),
		koalaSoccer: img({
			altText: 'a cute cartoon koala kicking a soccer ball on a soccer field ',
			filepath: './tests/fixtures/images/kody-content/koala-soccer.png',
		}),
	})

	const githubUser = await insertGitHubUser(MOCK_CODE_GITHUB)
	const googleUser = await insertGoogleUser(MOCK_CODE_GOOGLE)


	await prisma.user.create({
		select: { id: true },
		data: {
			email: 'admin@ellemment.com',
			username: 'ellemmentadmin',
			name: 'ellemment',
			image: { create: ellemmentImages.ellemmentdevUser },
			password: { create: createPassword('ellemmentadmin') },
			connections: {
				create: [
					{ providerName: 'github', providerId: githubUser.profile.id },
					{ providerName: 'google', providerId: googleUser.profile.sub },
				],
			},
			roles: { connect: [{ name: 'admin' }, { name: 'user' }] },
			adminRoles: {
				create: Object.values(AdminType).map(type => ({ type }))
			},
			content: {
				create: [
					{
						id: 'd27a197e',
						title: 'Introduction to System Dynamics',
						content:
							'System dynamics is an approach to understanding the nonlinear behavior of complex systems over time using stocks, flows, internal feedback loops, and time delays.',
						images: { create: [ellemmentImages.cuteKoala, ellemmentImages.koalaEating] },
					},
					{
						id: '414f0c09',
						title: 'Feedback Loops in Systems',
						content:
							'Feedback loops are central to system dynamics. They can be reinforcing (positive) or balancing (negative), and they play a crucial role in determining system behavior.',
						images: {
							create: [ellemmentImages.koalaCuddle],
						},
					},
					{
						id: '260366b1',
						title: 'Stock and Flow Diagrams',
						content:
							'Stock and flow diagrams are a fundamental tool in system dynamics. Stocks represent the state of the system, while flows represent the rate of change in stocks.',
					},
					{
						id: 'bb79cf45',
						title: 'Causal Loop Diagrams',
						content:
							'Causal loop diagrams are another important tool in system dynamics. They help visualize how different variables in a system are interrelated.',
						images: {
							create: [ellemmentImages.mountain],
						},
					},
					{
						id: '9f4308be',
						title: 'System Archetypes',
						content:
							'System archetypes are common patterns of behavior in systems. Understanding these archetypes can help in identifying and solving complex problems.',
					},
					{
						id: '306021fb',
						title: 'Modeling Complex Systems',
						content:
							'Building models is a key part of system dynamics. It involves identifying key variables, mapping their relationships, and simulating system behavior over time.',
						images: {
							create: [ellemmentImages.koalaCoder],
						},
					},
					{
						id: '16d4912a',
						title: 'Applications of System Dynamics',
						content:
							'System dynamics has wide-ranging applications, from business management and urban planning to environmental studies and social sciences.',
						images: {
							create: [ellemmentImages.koalaMentor],
						},
					},
					{
						id: '3199199e',
						title: 'The Importance of Time Delays',
						content:
							'Time delays are crucial in system dynamics. They can lead to oscillations, overshooting, and other complex behaviors in systems.',
					},
					{
						id: '2030ffd3',
						title: 'System Dynamics in Policy Making',
						content:
							'System dynamics can be a powerful tool for policy makers. It allows for the simulation of different policy options and their potential long-term effects.',
						images: {
							create: [ellemmentImages.mountain],
						},
					},
					{
						id: 'f375a804',
						title: 'Learning from System Dynamics',
						content:
							'One of the key benefits of system dynamics is its ability to enhance our understanding of complex systems. It challenges our mental models and helps us see the bigger picture.',
						images: {
							create: [ellemmentImages.koalaCoder],
						},
					},
					{
						id: '562c541b',
						title: 'The Future of System Dynamics',
						content:
							'As our world becomes increasingly complex and interconnected, the principles of system dynamics are more relevant than ever. The field continues to evolve, incorporating new technologies and methodologies.',
					},
					{
						id: 'f67ca40b',
						title: 'Reflections on a System Dynamics Project',
						content:
							"Just completed a fascinating system dynamics project modeling the impact of renewable energy adoption on a city's power grid. The process was challenging but incredibly rewarding.\n\nWe started by identifying the key variables: renewable energy production, traditional energy production, energy demand, storage capacity, and grid stability. Then, we mapped out the relationships between these variables, including several important feedback loops.\n\nOne of the most interesting aspects was modeling the delays in the system. For example, there's a significant delay between the decision to increase renewable energy capacity and the actual increase in production. This led to some unexpected behaviors in our model.\n\nWe ran several simulations with different policy interventions. It was fascinating to see how small changes could have big impacts over time. For instance, a modest increase in energy storage capacity had a surprisingly large effect on grid stability.\n\nThe project really drove home the importance of taking a systems view. What seemed like straightforward cause-and-effect relationships often turned out to be much more complex when viewed in the context of the entire system.\n\nPerhaps the most valuable outcome was how the model challenged our assumptions. Several times, the system behaved in ways we didn't expect, forcing us to revisit and refine our understanding.\n\nOverall, this project reinforced my belief in the power of system dynamics as a tool for understanding and managing complex systems. It's not just about predicting outcomes, but about building a deeper, more nuanced understanding of how systems work.\n\nI'm excited to apply these insights to future projects. The principles of system dynamics have applications far beyond energy systems - I can see potential uses in areas from urban planning to ecosystem management.\n\nAnyway, I'm rambling at this point, but I'm just so energized by this work. It's amazing how a relatively simple set of tools can provide such profound insights into complex problems. Here's to many more system dynamics adventures!",
						images: {
							create: [ellemmentImages.koalaSoccer],
						},
					},
				],
			},
		},
	})
	console.timeEnd(`🧑‍💻 Created admin user "ellemmentdev"`)

	console.timeEnd(`🌱 Database has been seeded`)
}

seed()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})

// we're ok to import from the test directory in this file
/*
eslint
	no-restricted-imports: "off",
*/