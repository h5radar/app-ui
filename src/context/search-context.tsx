import React from "react";

export type SearchContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchContext = React.createContext<SearchContextType | null>(null);
