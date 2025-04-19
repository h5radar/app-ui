import { useNavigate } from "react-router-dom";
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, RadarIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useAuth } from "react-oidc-context";

/*
 * TODO:
 *  1.add signOut actions
   <DropdownMenuItem onClick={() => signOut()}>
    <LogOut />
    Log out
  </DropdownMenuItem>
 */
const AppSidebarFooter = () => {
  const auth = useAuth();
  // const { data: session } = useSession();
  const { data: session } = { data: { user: { image: null, name: "a5gurnakov", email: null } } };
  const navigate = useNavigate();

  // const { state, isMobile } = useSidebar();

  return (
    <>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={session?.user?.image || ""} alt={auth?.user?.profile.name || ""} />
                    <AvatarFallback className="rounded-lg">
                      {auth?.user?.profile.name?.[0]?.toUpperCase() || "CN"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{auth?.user?.profile.name || ""}</span>
                    <span className="truncate text-xs">{auth?.user?.profile.email || ""}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={session?.user?.image || ""} alt={auth?.user?.profile.name || ""} />
                      <AvatarFallback className="rounded-lg">
                        {auth?.user?.profile.name?.[0].toUpperCase() || "CN"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{auth?.user?.profile.name || ""}</span>
                      <span className="truncate text-xs"> {auth?.user?.profile.email || ""}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate("/")}>
                    <RadarIcon />
                    Radar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/account")}>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/billing")}>
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/notifications")}>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => auth.signoutRedirect()}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
};

export default AppSidebarFooter;
