import Cookies from "js-cookie";
import { ThemeProvider } from "next-themes";
import { Outlet } from "react-router";

import { SidebarInset, SidebarProvider } from "@/ui/sidebar";
import { Toaster } from "@/ui/sonner.tsx";

import AppNavbar from "@/components/app-navbar";
// import KBar from "@/components/kbar";
import RadarSidebar from "@/components/radar-sidebar";

import { SearchProvider } from "@/providers/search-provider";

export default function RadarLayout() {
  // Persisting the sidebar state in the cookie.
  const defaultOpen = Cookies.get("sidebar_state") !== "false";

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} storageKey="dashboard-theme">
        <SearchProvider>
          <SidebarProvider defaultOpen={defaultOpen}>
            <RadarSidebar />
            <SidebarInset>
              {/* TODO сюда допистаь компонеент */}
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
