// app/ellemment-ui/components/account/account-panel.tsx

import { NavLink } from '@remix-run/react';
import { Button } from '#app/components/ui/button';
import { Icon } from '#app/components/ui/icon';

type Content = {
  id: string;
  title: string;
};

interface AccountPanelProps {
  username: string;
  contents: Content[];
}

export function AccountPanel({ username, contents }: AccountPanelProps) {
  return (
    <div className="m-4">
      <Button asChild variant="outline" className="w-full mb-4">
        <NavLink to={`/${username}/content/new`} className="flex items-center justify-center">
          <Icon name="plus" className="mr-2 h-4 w-4" />
          <span className="text-sm">Create</span>
        </NavLink>
      </Button>
      
      <ul className="space-y-1">
        {contents.map((content) => (
          <li key={content.id}>
            <NavLink
              to={`/${username}/content/${content.id}`}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-muted/80'
                }`
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