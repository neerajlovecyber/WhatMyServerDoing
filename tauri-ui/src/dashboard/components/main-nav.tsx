import React from "react";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  activeComponent,
  setActiveComponent,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  activeComponent: string;
  setActiveComponent: (component: string) => void;
}) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <button
        onClick={() => setActiveComponent("Overview")}
        className={cn("text-sm font-medium transition-colors hover:text-primary", {
          "text-primary": activeComponent === "Overview",
          "text-red-500": activeComponent === "Overview", // Highlight in red for Overview
        })}
      >
        Overview
      </button>
      <button
        onClick={() => setActiveComponent("Logs")}
        className={cn("text-sm font-medium transition-colors hover:text-primary", {
          "text-primary": activeComponent === "Logs",
          "text-red-500": activeComponent === "Logs", // Highlight in red for Logs
        })}
      >
        Logs
      </button>
    </nav>
  );
}
