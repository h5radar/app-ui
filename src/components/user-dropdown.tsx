import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

import { Avatar, AvatarFallback } from "@/ui/avatar";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

import { BILLING_ENABLED, NOTIFICATIONS_ENABLED } from "@/constants/application";

export function UserDropdown() {
  const navigate = useNavigate();
  const auth = useAuth();

  if (auth?.user?.profile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{auth?.user?.profile.name?.[0]}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{auth?.user?.profile.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{auth?.user?.profile?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate("/")}>
              Radar
              <DropdownMenuShortcut>⇧⌘R</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/account")}>
              Account
              <DropdownMenuShortcut>⇧⌘O</DropdownMenuShortcut>
            </DropdownMenuItem>
            {NOTIFICATIONS_ENABLED === "true" && (
              <DropdownMenuItem onClick={() => navigate("/notifications")}>
                Notifications
                <DropdownMenuShortcut>⇧⌘F</DropdownMenuShortcut>
              </DropdownMenuItem>
            )}
            {BILLING_ENABLED === "true" && (
              <DropdownMenuItem onClick={() => navigate("/billing")}>
                Billing
                <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => auth.signoutRedirect()}>
            Log out
            <DropdownMenuShortcut>⇧⌘U</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
