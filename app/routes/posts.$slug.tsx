import { PortableText } from '@portabletext/react'
import { type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'
import { formatDate } from '#app/components/studio-utils/format-data'
import { urlFor } from '#app/components/studio-utils/image'
import { loadQuery } from '#app/components/studio-utils/loader.server'
import { POST_QUERY } from '#app/components/studio-utils/queries'
import { Post } from '#app/components/studio-utils/types'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const initial = await loadQuery<Post>(POST_QUERY, params)

  return { initial, query: POST_QUERY, params }
}

export default function PostRoute() {
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
    <section data-sanity={encodeDataAttribute('slug')} className="post">
      {data?.mainImage ? (
        <img
          data-sanity={encodeDataAttribute('mainImage')}
          className="post__cover"
          src={urlFor(data.mainImage).url()}
          alt=""
        />
      ) : (
        <div className="post__cover--none" />
      )}
      <div className="post__container">
        <h1 className="post__title">{data?.title}</h1>
        <p className="post__excerpt">{data?.excerpt}</p>
        {data?._createdAt && (
          <p className="post__date">{formatDate(data._createdAt)}</p>
        )}
        {data?.body && (
          <div className="post__content">
            <PortableText value={data.body} />
          </div>
        )}
      </div>
    </section>
  )
}