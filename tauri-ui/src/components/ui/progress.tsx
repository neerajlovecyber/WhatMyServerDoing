import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { value: number }
>(({ className, value, ...props }, ref) => {
  let barColor = "bg-green-400";

  // Determine color based on the percentage value
  if (value >= 50 && value < 80) {
    barColor = "bg-yellow-400";
  } else if (value >= 80) {
    barColor = "bg-red-400";
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={`h-full w-full flex-1 transition-all ${barColor}`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
