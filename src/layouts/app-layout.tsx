import { Outlet } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import KBar from "@/components/kbar";
import { Toaster } from "@/components/ui/sonner.tsx";

export default function AppLayout() {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} storageKey="dashboard-theme">
        <KBar>
          <Outlet />
        </KBar>
        <Toaster />
      </ThemeProvider>
    </>
  );
}
