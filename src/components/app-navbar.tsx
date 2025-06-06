import { Search } from "./search";

import { SidebarTrigger } from "@/ui/sidebar";

import { TenantSwitcher } from "@/components/tenant-switcher";
import ThemeToggler from "@/components/theme-toggler";
import { UserDropdown } from "@/components/user-dropdown.tsx";

const AppNavbar = () => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
      </div>
      <div className="flex items-center gap-2 px-4">
        <div className="hidden md:flex">
          <Search />
        </div>
        <TenantSwitcher />
        <UserDropdown />
        <ThemeToggler />
      </div>
    </header>
  );
};

export default AppNavbar;
