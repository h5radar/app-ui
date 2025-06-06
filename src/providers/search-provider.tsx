import React from "react";

import { CommandMenu } from "@/components/command-menu";

import { SearchContext } from "@/context/search-context";

interface Props {
  children: React.ReactNode;
}

export function SearchProvider({ children }: Props) {
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
      <CommandMenu />
      {children}
    </SearchContext.Provider>
  );
}
