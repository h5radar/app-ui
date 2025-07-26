import Cookies from "js-cookie";
import { ThemeProvider } from "next-themes";
import { Outlet } from "react-router";

import { SidebarInset, SidebarProvider } from "@/ui/sidebar";
import { Toaster } from "@/ui/sonner.tsx";

import { accountSearchItem } from "@/constants/search";

import { SearchProvider } from "@/providers/search";

import usePageTracking from "@/hooks/use-page-tracking";

import AccountSidebar from "@/components/account-sidebar";
import AppNavbar from "@/components/app-navbar";

export default function AccountLayout() {
  // Persisting the sidebar state in the cookie.
  const defaultOpen = Cookies.get("sidebar_state") !== "false";
  usePageTracking();
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} storageKey="dashboard-theme">
        <SearchProvider navItemList={accountSearchItem}>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AccountSidebar />
            <SidebarInset>
              <AppNavbar />
              <div className="flex">
                <div className="p-5 w-full md:max-w-[1440px]">
                  <Outlet />
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </SearchProvider>
        <Toaster />
      </ThemeProvider>
    </>
  );
}
