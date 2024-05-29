import { useState } from "react"
import { invoke } from "@tauri-apps/api/tauri"

import { Menu } from "@/components/menu"

import { TailwindIndicator } from "./components/tailwind-indicator"
import { ThemeProvider } from "./components/theme-provider"
import DashboardPage from "./dashboard/page"
import { cn } from "./lib/utils"
import { UrlProvider } from '@/components/main/UrlContext';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <UrlProvider>
        <div className="h-screen overflow-clip">
          <Menu />
          <div
            className={cn(
              "h-screen overflow-auto border-t bg-background pb-8",
              // "scrollbar-none"
              "scrollbar scrollbar-track-transparent scrollbar-thumb-accent scrollbar-thumb-rounded-md"
            )}
          >
            <DashboardPage />
          </div>
        </div>
      </UrlProvider>
      <TailwindIndicator />
    </ThemeProvider>
  );
}

export default App;
