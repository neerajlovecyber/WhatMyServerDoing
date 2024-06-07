import { cn } from "@/lib/utils";

export function MainNav({
  className,
  setActiveComponent,
  ...props
}: React.HTMLAttributes<HTMLElement> & { setActiveComponent: (component: string) => void }) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6 ", className)} {...props}>
      <button
        onClick={() => setActiveComponent("Overview")}
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </button>
      <button
        onClick={() => setActiveComponent("Logs")}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Logs
      </button>
      {/* <button
        onClick={() => setActiveComponent("Processes")}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Processes
      </button>
      <button
        onClick={() => setActiveComponent("Settings")}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </button> */}
    </nav>
  );
}
