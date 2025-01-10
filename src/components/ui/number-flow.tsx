"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Export the Value type
export type Value = number;

interface NumberFlowProps {
  value: Value;
  trend?: boolean;
  className?: string;
}

const NumberFlow = React.forwardRef<HTMLDivElement, NumberFlowProps>(
  ({ value, trend = true, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("number-flow-root", className)}
        {...props}
      >
        <div className="number-flow-container">
          <span className="number-flow-value">{value}</span>
          {trend && (
            <span className={cn(
              "number-flow-trend",
              value > 0 ? "text-green-500" : "text-red-500"
            )}>
              {value > 0 ? "↑" : "↓"}
            </span>
          )}
        </div>
      </div>
    );
  }
);

NumberFlow.displayName = "NumberFlow";

export { NumberFlow };
export type { NumberFlowProps };