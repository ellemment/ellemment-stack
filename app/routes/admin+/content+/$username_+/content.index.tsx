// app/routes/admin+/content+/$username_+/content.index.tsx

import { type MetaFunction } from '@remix-run/react'
import { type loader as contentLoader } from './content.tsx'

export default function ContentIndexRoute() {
	return (
		<div className="container pt-12">
			<p className="text-body-md">Select a content</p>
		</div>
	)
}

export const meta: MetaFunction<
	null,
	{ 'routes/users+/$username_+/content': typeof contentLoader }
> = ({ params, matches }) => {
	const contentMatch = matches.find(
		(m) => m.id === 'routes/users+/$username_+/content',
	)
	const displayName = contentMatch?.data?.owner.name ?? params.username
	const contentCount = contentMatch?.data?.owner.content.length ?? 0
	const contentText = contentCount === 1 ? 'content' : 'content'
	return [
		{ title: `${displayName}'s Content | ellemment` },
		{
			name: 'description',
			content: `Checkout ${displayName}'s ${contentCount} ${contentText} on ellemment`,
		},
	]
}
