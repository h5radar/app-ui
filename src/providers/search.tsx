import React from "react";

import { NavItem } from "@/types/nav-item";

import { CommandMenu } from "@/components/command-menu";

import { SearchContext } from "@/contexts/search";

interface SearchProviderProps {
  children: React.ReactNode;
  navItemList: NavItem[];
}

export function SearchProvider({ children, navItemList }: SearchProviderProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <SearchContext.Provider value={{ open, setOpen }}>
      <CommandMenu navItemList={navItemList} />
      {children}
    </SearchContext.Provider>
  );
}
