import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/*
 * TODO:
 *  1.add signOut actions
   <DropdownMenuItem onClick={() => signOut()}>
    <LogOut />
    Log out
  </DropdownMenuItem>
 * 2. Uncomment const { data: session } = useSession();
 */
export function UserNav() {
  // const { data: session } = useSession();
  const { data: session } = { data: { user: { image: null, name: "a5gurnakov", email: null } } };
  const navigate = useNavigate();
  const auth = useAuth();

  if (auth?.user?.profile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={session.user?.image ?? ""} alt={auth?.user?.profile.name ?? ""} />
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
              <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/billing")}>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/notifications")}>
              Notifications
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => null}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
