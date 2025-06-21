import Cookies from "js-cookie";
import { ThemeProvider } from "next-themes";
import { Outlet } from "react-router";

import { SidebarInset, SidebarProvider } from "@/ui/sidebar";
import { Toaster } from "@/ui/sonner.tsx";

import { radarSearchItem } from "@/constants/search";

import { SearchProvider } from "@/providers/search";

import AppNavbar from "@/components/app-navbar";
import RadarSidebar from "@/components/radar-sidebar";

export default function RadarLayout() {
  // Persisting the sidebar state in the cookie.
  const defaultOpen = Cookies.get("sidebar_state") !== "false";

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} storageKey="dashboard-theme">
        <SearchProvider navItemList={radarSearchItem}>
          <SidebarProvider defaultOpen={defaultOpen}>
            <RadarSidebar />
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
