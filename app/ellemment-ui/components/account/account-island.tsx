// app/ellemment-ui/components/account/account-island.tsx
import { Link, Form } from '@remix-run/react';
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '#app/components/ui/avatar';
import { Button } from '#app/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '#app/components/ui/dropdown-menu';
import { Icon } from '#app/components/ui/icon';

interface User {
  id: string;
  name: string | null;
  username: string;
  email: string;
  image?: { id: string } | null;
}

interface AccountIslandProps {
  user: User;
}

export function AccountIsland({ user }: AccountIslandProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const userDisplayName = user.name || user.username;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start p-2 h-auto">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.image ? `/resources/user-images/${user.image.id}` : undefined} alt={userDisplayName} />
              <AvatarFallback>{userDisplayName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{userDisplayName}</span>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
          </div>
          <Icon name={isOpen ? "chevron-down" : "chevron-right"} className="ml-auto h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full" align="start">
        <DropdownMenuItem asChild>
          <Link to="/account/settings" className="flex items-center">
            <Icon name="settings" className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Form action="/logout" method="POST" className="w-full">
            <Button type="submit" variant="ghost" className="w-full justify-start p-0">
              <Icon name="exit" className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </Form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}