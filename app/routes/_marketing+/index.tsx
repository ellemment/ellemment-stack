// app/routes/_marketing+/index.tsx
import { type MetaFunction } from '@remix-run/node'
import Creemson from '#app/components/landing/hero'
import Research from '#app/components/landing/research'
import Product from '#app/components/landing/product'
import Reports from '#app/components/landing/reports'
import Roadmap from '#app/components/landing/roadmap'

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