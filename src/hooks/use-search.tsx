import React from "react";

import { SearchContext } from "@/contexts/search";
import type { SearchContextType } from "@/contexts/search";

export const useSearch = (): SearchContextType => {
  const searchContext = React.useContext(SearchContext);

  if (!searchContext) {
    throw new Error("useSearch has to be used within SearchProvider");
  }

  return searchContext;
};
