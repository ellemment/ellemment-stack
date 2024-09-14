
import { Link  } from '@remix-run/react';
import React, { useState } from 'react';
import Logo from '#app/components/logo'
import { ThemeSwitch } from '#app/routes/resources+/theme-switch';
import { type Theme } from '#app/utils/theme.server';
import { useOptionalUser } from '#app/utils/user';
import { Menu, MenuItem, HoveredLink } from './navbar-global-md';
import { NavbarSm } from './navbar-global-sm';

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
      { to: "/admin", label: "Design", submenu: [
        { to: "/admin", label: "ellemment UI" },
        { to: "/admin", label: "ellemment UX" },
      ]},
      { to: "/admin/", label: "Develop" },
      { to: user ? `/account` : "/login", label: "Account" },
    ];
  
    return (
      <header className="bg-background">
        <div className="container mx-auto max-w-7xl px-4">
          <nav className="flex justify-between items-center h-16">
          <div className='flex flex-1 items-center gap-2'>
          <Logo /> 
          <ThemeSwitch userPreference={userPreference} />
          </div>
            
            {/* Desktop menu */}
            <div className="hidden md:block">
              <Menu setActive={setActive} className="">
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