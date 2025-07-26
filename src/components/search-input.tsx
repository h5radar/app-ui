import { IconSearch } from "@tabler/icons-react";

import { Button } from "@/ui/button";

import { cn } from "@/lib/utils";

import { useSearch } from "@/hooks/use-search";

interface SearchInputProps {
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
}

export function SearchInput({ className = "", placeholder = "Search" }: SearchInputProps) {
  const { setOpen } = useSearch();
  return (
    <Button
      variant="outline"
      className={cn(
        "relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64",
        className,
      )}
      onClick={() => setOpen(true)}
    >
      <IconSearch aria-hidden="true" className="mr-2 h-4 w-4" />
      <span>{placeholder}</span>
      <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
}
