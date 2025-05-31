import { useCallback, useEffect, useRef } from "react";

import { Input } from "@/ui/input";

import { DEBOUNCE_TIME } from "@/constants/application";

interface ISearchInput {
  handleFilter: (value: string) => void;
}

export const FilterInput = ({ handleFilter }: ISearchInput) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedHandleFilter = useCallback(
    (value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => handleFilter(value), DEBOUNCE_TIME);
    },
    [handleFilter],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Input
      placeholder="Filter, for example Java%..."
      onChange={(event) => debouncedHandleFilter(event.target.value)}
      className="max-w-72 w-72"
    />
  );
};
