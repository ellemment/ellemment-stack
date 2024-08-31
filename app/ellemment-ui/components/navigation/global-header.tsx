import React, { useState } from 'react';
import { Form, Link, useSubmit } from '@remix-run/react';
import { useRef } from 'react';
import { Button } from '#app/components/ui/button';
import { SearchBar } from '#app/components/search-bar';
import { ThemeSwitch, useTheme } from '#app/routes/resources+/theme-switch';
import { useOptionalUser, useUser } from '#app/utils/user';
import { Icon } from '#app/components/ui/icon';
import { Menu, MenuItem, ProductItem, HoveredLink } from './navbar-menu';
import { type Theme } from '#app/utils/theme.server';



function Logo() {
    return (
        <Link to="/" className="font-medium text-black dark:text-white">
            ellemment
        </Link>
    );
}


export function GlobalHeader({ userPreference }: { userPreference: Theme | null }) {
    const user = useOptionalUser();
    const [active, setActive] = useState<string | null>(null);

    return (
        <header className="bg-background">
            <div className="container mx-auto max-w-5xl px-4">
                <nav className="grid grid-cols-[auto_1fr_auto] gap-4 items-center h-16">
                    <Logo />
                    <Menu setActive={setActive} className="justify-self-center">
                        <MenuItem to="/" setActive={setActive} active={active} item="Discover" />
                        <MenuItem setActive={setActive} active={active} item="Design">
                            <div className="grid z-20 gap-4 text-[13px]">
                                <HoveredLink to="/product">ellemment UI</HoveredLink>
                                <HoveredLink to="/product">ellemment UX</HoveredLink>
                            </div>
                        </MenuItem>
                        <MenuItem to="/" setActive={setActive} active={active} item="Develop" />
                        <MenuItem to="/" setActive={setActive} active={active} item="Store" />
                        <MenuItem 
                            to={user ? `/users/${user.username}` : "/login"} 
                            setActive={setActive} 
                            active={active} 
                            item="Account" 
                        />
                    </Menu>
                    <div className="grid gap-4 items-center">
                        <ThemeSwitch userPreference={userPreference} />
                           {/* <SearchBar status="idle" /> */} 
                    </div>
                </nav>
            </div>
        </header>
    );
}

GlobalHeader.Logo = Logo;