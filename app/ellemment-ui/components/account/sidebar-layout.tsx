// app/ellemment-ui/components/account/sidebar-layout.tsx
'use client'
import {
  MagnifyingGlassIcon,
  MoonIcon,
  Bars2Icon
} from '@heroicons/react/16/solid';
import { Link, useLocation } from '@remix-run/react';
import React from 'react'
import {
  SidebarLabel,
} from './sidebar';


function MobileLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="lg:hidden">
      {children}
    </div>
  )
}

export function SidebarLayout({
  sidebar,
  children,
}: React.PropsWithChildren<{ navbar: React.ReactNode; sidebar: React.ReactNode }>) {
  const location = useLocation()
  const isAccountPage = location.pathname === '/account'

  return (
    <div className="relative isolate flex min-h-svh w-full max-lg:flex-col">
      {/* Sidebar on desktop */}
      <div className="fixed inset-y-0 left-0 w-96 max-lg:hidden">{sidebar}</div>

      {/* Mobile layout */}
      {isAccountPage ? (
        <MobileLayout>{sidebar}</MobileLayout>
      ) : (
        <>
          {/* Navbar on mobile */}
          <header className="lg:hidden">
            <div className="flex items-center justify-between m-4 p-4">
              <div className="flex items-center">
                <Link to="/account">
                  <SidebarLabel className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">ellemment</SidebarLabel>
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <Link to="/account" className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </Link>
                <Link to="/account" className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
                  <MoonIcon className="h-5 w-5" />
                </Link>
                <Link to="/account" className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
                  <Bars2Icon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </header>

          {/* Content on mobile (non-account pages) */}
          <main className="flex-1 p-6 lg:hidden">
            <div className="mx-auto max-w-5xl">{children}</div>
          </main>
        </>
      )}

      {/* Content on desktop */}
      <main className="hidden lg:flex lg:flex-1 lg:flex-col lg:pb-2 lg:pl-96 lg:pr-2 lg:pt-2">
        <div className="grow p-6 rounded-lg bg-white shadow-sm ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
          <div className="mx-auto max-w-5xl">{children}</div>
        </div>
      </main>
    </div>
  )
}