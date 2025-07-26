import { IconArrowRight, IconDeviceLaptop, IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import React from "react";
import { useNavigate } from "react-router";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/ui/command";
import { ScrollArea } from "@/ui/scroll-area";

import { globalNavItems } from "@/constants/search";

import { NavItem } from "@/types/nav-item";

import { useSearch } from "@/hooks/use-search";

interface CommandMenuProps {
  navItemList: NavItem[];
}
export function CommandMenu({ navItemList }: CommandMenuProps) {
  const { setTheme } = useTheme();
  const { open, setOpen } = useSearch();
  const navigate = useNavigate();

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    [setOpen],
  );

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search for pages or commands..." />
      <CommandList>
        <ScrollArea type="hover" className="h-72 pr-1">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {navItemList.map((item, key) => {
              return (
                <CommandItem
                  key={`${item.url}-${key}`}
                  value={item.title}
                  onSelect={() => {
                    runCommand(() => navigate(item.url));
                  }}
                >
                  <div className="mr-2 flex h-4 w-4 items-center justify-center">
                    <IconArrowRight className="text-muted-foreground/80 size-2" />
                  </div>
                  {item.title}
                </CommandItem>
              );
            })}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Services">
            {globalNavItems.map(
              (item, key) =>
                item.show && (
                  <CommandItem
                    key={`${item.url}-${key}`}
                    value={item.title}
                    onSelect={() => {
                      runCommand(() => navigate(item.url));
                    }}
                  >
                    <div className="mr-2 flex h-4 w-4 items-center justify-center">
                      <IconArrowRight className="text-muted-foreground/80 size-2" />
                    </div>
                    {item.title}
                  </CommandItem>
                ),
            )}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <IconSun /> <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <IconMoon className="scale-90" />
              <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <IconDeviceLaptop />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  );
}
