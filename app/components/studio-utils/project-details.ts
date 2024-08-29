const {
  SANITY_STUDIO_PROJECT_ID,
  SANITY_STUDIO_DATASET,
  SANITY_STUDIO_URL = 'https://ellemment.sanity.studio',
  SANITY_STUDIO_STEGA_ENABLED = 'false',
} = typeof document === 'undefined' ? process.env : window.ENV

export const projectId = SANITY_STUDIO_PROJECT_ID!
export const dataset = SANITY_STUDIO_DATASET!
export const studioUrl = SANITY_STUDIO_URL!
export const stegaEnabled = SANITY_STUDIO_STEGA_ENABLED === 'true'

if (!projectId) throw new Error('Missing SANITY_STUDIO_PROJECT_ID in .env')
if (!dataset) throw new Error('Missing SANITY_STUDIO_DATASET in .env')
if (!studioUrl) throw new Error('Missing SANITY_STUDIO_URL in .env')
if (stegaEnabled === undefined)
  throw new Error('Missing SANITY_STUDIO_STEGA_ENABLED in .env')