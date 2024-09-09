// app/routes/admin+/cache_.sqlite.$cacheKey.ts

import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { AdminType } from '#app/utils/admin-types'
import { cache } from '#app/utils/cache.server.ts'
import {
	getAllInstances,
	getInstanceInfo,
	ensureInstance,
} from '#app/utils/litefs.server.ts'
import { requireUserWithRole } from '#app/utils/permissions.server.ts'

export async function loader({ request, params }: LoaderFunctionArgs) {
	await requireUserWithRole(request, AdminType.SUPER_ADMIN)
	const searchParams = new URL(request.url).searchParams
	const currentInstanceInfo = await getInstanceInfo()
	const allInstances = await getAllInstances()
	const instance =
		searchParams.get('instance') ?? currentInstanceInfo.currentInstance
	await ensureInstance(instance)

	const { cacheKey } = params
	invariantResponse(cacheKey, 'cacheKey is required')
	return json({
		instance: {
			hostname: instance,
			region: allInstances[instance],
			isPrimary: currentInstanceInfo.primaryInstance === instance,
		},
		cacheKey,
		value: cache.get(cacheKey),
	})
}
