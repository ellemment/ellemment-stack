import { HttpResponse, http, passthrough } from 'msw'
import { createClient } from '@sanity/client'

const { json } = HttpResponse

// Sanity client setup
const sanityClient = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2023-05-03',
})

// Query functions
async function getPosts() {
  return sanityClient.fetch('*[_type == "post"] | order(publishedAt desc)')
}

async function getPost(slug: string) {
  return sanityClient.fetch('*[_type == "post" && slug.current == $slug][0]', { slug })
}

export const handlers = [
  http.get('https://44e275i4.apicdn.sanity.io/v2023-03-20/data/query/production', async ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('query')

    if (query?.includes('*[_type == "post"]')) {
      // This is a request for all posts
      const posts = await getPosts()
      return json({ result: posts })
    } else if (query?.includes('*[_type == "post" && slug.current ==')) {
      // This is a request for a specific post
      const slugMatch = query.match(/slug\.current == '(.+?)'/)
      if (slugMatch && slugMatch[1]) {
        const slug = slugMatch[1]
        const post = await getPost(slug)
        return json({ result: post })
      }
    }

    // If the query doesn't match our known patterns, pass through to the real API
    return passthrough()
  }),
]