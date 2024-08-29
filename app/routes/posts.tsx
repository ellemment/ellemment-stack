import { useLoaderData, type MetaFunction } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'
import Card from '#app/components/studio-content/card.tsx'
import Welcome from '#app/components/studio-content/welcome.tsx'
import { loadQuery } from '#app/components/studio-utils/loader.server.ts'
import { POSTS_QUERY } from '#app/components/studio-utils/queries'
import type { Post } from '#app/components/studio-utils/types'

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }]
}

export const loader = async () => {
  const initial = await loadQuery<Post[]>(POSTS_QUERY)

  return { initial, query: POSTS_QUERY, params: {} }
}

export default function Posts() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data, loading, error, encodeDataAttribute } = useQuery<
    typeof initial.data
  >(query, params, {
    // @ts-expect-error -- TODO fix the typing here
    initial,
  })

  if (error) {
    throw error
  } else if (loading && !data) {
    return <div>Loading...</div>
  }

  return (
    <section>
      {data?.length ? (
        data.map((post, i) => (
          <Card
            key={post._id}
            post={post}
            encodeDataAttribute={encodeDataAttribute.scope([i])}
          />
        ))
      ) : (
        <Welcome />
      )}
    </section>
  )
}