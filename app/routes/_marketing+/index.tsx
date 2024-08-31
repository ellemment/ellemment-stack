// app/routes/_marketing+/index.tsx
import { type MetaFunction } from '@remix-run/node'
import Hero from '#app/components/landing/hero'
import Discover from '#app/components/landing/discover'
import Product from '#app/components/landing/product'
import Reports from '#app/components/landing/reports'

export const meta: MetaFunction = () => [{ title: 'ellemment' }]

export default function Index() {
  return (
    <main className="font-poppins grid h-full place-items-center">
      <Hero />
      <Discover />
      <Product />
      <Reports /> 
    </main>
  )
}