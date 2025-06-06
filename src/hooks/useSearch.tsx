import React from "react";

import { SearchContext } from "@/context/search-context";
import type { SearchContextType } from "@/context/search-context";

export const useSearch = (): SearchContextType => {
  const searchContext = React.useContext(SearchContext);

  if (!searchContext) {
    throw new Error("useSearch has to be used within <SearchContext.Provider>");
  }

  return searchContext;
};
