import imageUrlBuilder from '@sanity/image-url'
import type { Image } from '@sanity/types'

import { projectId, dataset } from './project-details'

const builder = imageUrlBuilder({ projectId, dataset })

export function urlFor(source: Image) {
  return builder.image(source)
}