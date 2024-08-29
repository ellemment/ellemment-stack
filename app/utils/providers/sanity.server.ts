// app/utils/providers/sanity.server.ts

import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2023-05-03', 
})

export async function getPosts() {
  return sanityClient.fetch('*[_type == "post"] | order(publishedAt desc)')
}

export async function getPost(slug: string) {
  return sanityClient.fetch('*[_type == "post" && slug.current == $slug][0]', { slug })
}

// Add more Sanity-related queries and functions as needed