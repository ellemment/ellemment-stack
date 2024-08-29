// app/routes/_marketing+/index.tsx
import { type MetaFunction } from '@remix-run/node'
import Creemson from '#app/components/creemson/ellemment'
import Research from '#app/components/creemson/research'
import Product from '#app/components/creemson/product'
import Reports from '#app/components/creemson/reports'
import Roadmap from '#app/components/creemson/roadmap'

export const meta: MetaFunction = () => [{ title: 'ellemment' }]

export default function Index() {
  return (
    <main className="font-poppins grid h-full place-items-center">
      <Creemson />
      <Research />
      <Product />
      <Reports />
      <Roadmap />
    </main>
  )
}