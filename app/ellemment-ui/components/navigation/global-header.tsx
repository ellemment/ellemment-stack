// app/ellemment-ui/components/navigation/global-header.tsx

import React, { useState } from 'react';
import { Form, Link, useSubmit } from '@remix-run/react';
import { useRef } from 'react';
import { Button } from '#app/components/ui/button';
import { SearchBar } from '#app/components/search-bar';
import { ThemeSwitch, useTheme } from '#app/routes/resources+/theme-switch';
import { useOptionalUser, useUser } from '#app/utils/user';
import { getUserImgSrc } from '#app/utils/misc';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuTrigger,
} from '#app/components/ui/dropdown-menu';
import { Icon } from '#app/components/ui/icon';
import { Menu, MenuItem, ProductItem, HoveredLink } from './navbar-menu';
import { type Theme } from '#app/utils/theme.server';

function Logo() {
    return (
        <Link to={"/"} className="font-medium text-black dark:text-white">
                ellemment
         </Link>
    );
}

function UserDropdown() {
    const user = useUser();
    const submit = useSubmit();
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button asChild variant="ghost">
                    <Link
                        to={`/users/${user.username}`}
                        onClick={(e) => e.preventDefault()}
                        className="grid grid-cols-[auto_1fr] gap-2 items-center"
                    >
                        <img
                            className="h-8 w-8 rounded-full object-cover"
                            alt={user.name ?? user.username}
                            src={getUserImgSrc(user.image?.id)}
                        />
                    </Link>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
                <DropdownMenuContent sideOffset={8} align="start">
                    <DropdownMenuItem asChild>
                        <Link prefetch="intent" to={`/settings/profile`}>
                            <Icon className="text-body-md" name="avatar">
                                Profile
                            </Icon>
                        </Link>
                    </DropdownMenuItem>
                  {/* <DropdownMenuItem asChild>
                        <Link prefetch="intent" to={`/users/${user.username}/notes`}>
                            <Icon className="text-body-md" name="pencil-2">
                                Notes
                            </Icon>
                        </Link>
                    </DropdownMenuItem> */}  
                    <DropdownMenuItem
                        asChild
                        onSelect={(event) => {
                            event.preventDefault();
                            submit(formRef.current);
                        }}
                    >
                        <Form action="/logout" method="POST" ref={formRef}>
                            <Icon className="text-body-md" name="exit">
                                <button type="submit">Logout</button>
                            </Icon>
                        </Form>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
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
                    <MenuItem href="/product" setActive={setActive} active={active} item="Info">
                    </MenuItem>
                        <MenuItem setActive={setActive} active={active} item="Projects">
                            <div className="grid z-20 gap-4 text-[13px]">
                                <HoveredLink href="/product">Formateco v.1</HoveredLink>
                                <HoveredLink href="/product">Changelog</HoveredLink>
                                <HoveredLink href="/product">Docs</HoveredLink>
                                <HoveredLink href="/product">API</HoveredLink>
                            </div>
                        </MenuItem>
                        <MenuItem href="/posts" setActive={setActive} active={active} item="Insights">
                        </MenuItem>
                        <MenuItem href="/posts" setActive={setActive} active={active} item="Store">
                        </MenuItem>
                    </Menu>
                    <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-center">
                        <ThemeSwitch userPreference={userPreference} />
                      {/* <SearchBar status="idle" /> */} 
                        {user ? (
                            <UserDropdown />
                        ) : (
                            <Button className='text-[13px] font-light rounded-full' asChild variant="default" size="sm">
                                <Link to="/login">Sign In</Link>
                            </Button>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}

GlobalHeader.Logo = Logo;