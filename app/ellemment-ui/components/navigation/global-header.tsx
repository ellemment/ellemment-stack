import React, { useState } from 'react';
import { Form, Link, useSubmit } from '@remix-run/react';
import { useRef } from 'react';
import { Button } from '#app/components/ui/button';
import { SearchBar } from '#app/components/search-bar';
import { ThemeSwitch, useTheme } from '#app/routes/resources+/theme-switch';
import { useOptionalUser, useUser } from '#app/utils/user';
import { Icon } from '#app/components/ui/icon';
import { Menu, MenuItem, HoveredLink } from './navbar-md';
import { type Theme } from '#app/utils/theme.server';
import { NavbarSm } from './navbar-sm';
import Logo from '#app/components/logo'


  const MobileMenuItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link
      to={to}
      className="block py-4 text-xl text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
    >
      {children}
    </Link>
  );
  
  export function GlobalHeader({ userPreference }: { userPreference: Theme | null }) {
    const user = useOptionalUser();
    const [active, setActive] = useState<string | null>(null);
  
    const menuItems = [
      { to: "/", label: "Discover" },
      { to: "/product", label: "Design", submenu: [
        { to: "/product", label: "ellemment UI" },
        { to: "/product", label: "ellemment UX" },
      ]},
      { to: "/", label: "Develop" },
      { to: user ? `/users/${user.username}` : "/login", label: "Account" },
      { to: "/", label: "Store" },
    ];
  
    return (
      <header className="bg-background">
        <div className="container mx-auto max-w-5xl px-4">
          <nav className="flex justify-between items-center h-16">
          <Logo /> 
            
            {/* Desktop menu */}
            <div className="hidden md:block">
              <Menu setActive={setActive} className="justify-self-center">
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    to={item.to}
                    setActive={setActive}
                    active={active}
                    item={item.label}
                  >
                    {item.submenu && (
                      <div className="grid z-20 gap-4 text-[13px]">
                        {item.submenu.map((subItem) => (
                          <HoveredLink key={subItem.label} to={subItem.to}>
                            {subItem.label}
                          </HoveredLink>
                        ))}
                      </div>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </div>
            
            <div className="flex items-center space-x-2">
              <ThemeSwitch userPreference={userPreference} />
              {/* Mobile menu */}
              <div className="md:hidden">
                <NavbarSm>
                  {menuItems.map((item) => (
                    <MobileMenuItem key={item.label} to={item.to}>
                      {item.label}
                    </MobileMenuItem>
                  ))}
                </NavbarSm>
              </div>
            </div>
          </nav>
        </div>
      </header>
    );
  }
  
  GlobalHeader.Logo = Logo;