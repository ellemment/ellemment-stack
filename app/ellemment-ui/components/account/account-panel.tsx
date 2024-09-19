// app/ellemment-ui/components/account/account-panel.tsx

import { Link } from '@remix-run/react';
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
      <Link
        to={`/account/${username}/content/new`}
        className="flex items-center justify-center w-full mb-4 p-2 bg-muted rounded hover:bg-blue-600"
      >
        <Icon name="plus" className="mr-2 h-4 w-4" />
        <span className="text-sm">Create</span>
      </Link>
      <ul className="space-y-1">
        {contents.map((content) => (
          <li key={content.id}>
            <Link
              to={`/account/${username}/content/${content.id}`}
              className="flex items-center p-2 rounded-lg hover:bg-muted"
            >
              <Icon name="file-text" className="mr-2 h-4 w-4" />
              <span className="text-sm">{content.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}