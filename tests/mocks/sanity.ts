import { HttpResponse, http, passthrough } from 'msw'

const { json } = HttpResponse

export const handlers = [
  http.get('https://44e275i4.apicdn.sanity.io/v2023-03-20/data/query/production', ({ request }) => {
    // Pass through the request to the real Sanity API
    return passthrough()
  }),
]