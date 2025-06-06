import { IconDeviceLaptop, IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/ui/command";

import { useSearch } from "@/hooks/useSearch";

export function CommandMenu() {
  const { setTheme } = useTheme();
  const { open, setOpen } = useSearch();

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    [setOpen],
  );

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        {/* <ScrollArea type="hover" className="h-72 pr-1"> */}
        <CommandEmpty>No results found.</CommandEmpty>
        {/* {sidebarData.navGroups.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((navItem, i) => {
                if (navItem.url)
                  return (
                    <CommandItem
                      key={`${navItem.url}-${i}`}
                      value={navItem.title}
                      onSelect={() => {
                        runCommand(() => navigate({ to: navItem.url }));
                      }}
                    >
                      <div className="mr-2 flex h-4 w-4 items-center justify-center">
                        <IconArrowRight className="text-muted-foreground/80 size-2" />
                      </div>
                      {navItem.title}
                    </CommandItem>
                  );

                return navItem.items?.map((subItem, i) => (
                  <CommandItem
                    key={`${navItem.title}-${subItem.url}-${i}`}
                    value={`${navItem.title}-${subItem.url}`}
                    onSelect={() => {
                      runCommand(() => navigate({ to: subItem.url }));
                    }}
                  >
                    <div className="mr-2 flex h-4 w-4 items-center justify-center">
                      <IconArrowRightDashed className="text-muted-foreground/80 size-2" />
                    </div>
                    {navItem.title} <IconChevronRight /> {subItem.title}
                  </CommandItem>
                ));
              })}
            </CommandGroup>
          ))} */}
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
        {/* </ScrollArea> */}
      </CommandList>
    </CommandDialog>
  );
}
