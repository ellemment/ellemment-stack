

// app/ellemment-ui/components/account/account-footer.tsx


import { useLocation, useNavigate } from "@remix-run/react";
import { DirectionAwareTabs } from "#app/components/ui/navtab";

interface AccountNavbarProps {
  isAuthenticated: boolean;
}

export function AccountNavbar({ isAuthenticated }: AccountNavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const tabs = [
    {
      id: 0,
      label: "Discover",
      content: null,
    },
    {
      id: 1,
      label: isAuthenticated ? "Account" : "Sign in",
      content: null,
    },
  ];
  
  const activeTabIndex = location.pathname === "/" ? 0 : 1;
  
  const handleTabChange = (newTabId: number) => {
    navigate(newTabId === 0 ? "/" : isAuthenticated ? "/account" : "/login");
  };
  
  return (
    <div className="w-full mx-auto mt-4">
      <nav className="w-full">
        <DirectionAwareTabs
          tabs={tabs}
          className="bg-background shadow-xl"
          onChange={handleTabChange}
          activeTab={activeTabIndex}
        />
      </nav>
    </div>
  );
}