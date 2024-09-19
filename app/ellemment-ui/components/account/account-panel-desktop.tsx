// app/ellemment-ui/components/account/account-panel-desktop.tsx

import { NavLink, useLocation } from '@remix-run/react';
import { Button } from '#app/components/ui/button';
import { Icon } from '#app/components/ui/icon';

type Content = {
  id: string;
  title: string;
};

interface AccountPanelDesktopProps {
  username: string;
  contents: Content[];
}

export function AccountPanelDesktop({ username, contents }: AccountPanelDesktopProps) {
  const location = useLocation();
  const isContentPage = location.pathname.includes('/content/');

  return (
    <div className={`hidden lg:block ${isContentPage ? 'lg:block' : ''}`}>
      <Button asChild variant="outline" className="w-full mb-4">
        <NavLink to={`${username}/content/new`} className="flex items-center justify-center">
          <Icon name="plus" className="mr-2 h-4 w-4" />
          <span className="text-sm">Create</span>
        </NavLink>
      </Button>
      
      <ul className="space-y-1">
        {contents.map((content) => (
          <li key={content.id}>
            <NavLink
              to={`${username}/content/${content.id}`}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted/80'}`
              }
            >
              <Icon name="file-text" className="mr-2 h-4 w-4" />
              <span className="text-sm">{content.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}