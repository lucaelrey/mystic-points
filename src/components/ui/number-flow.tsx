import * as React from "react";
import { cn } from "@/lib/utils";

// Export the Value type
export type Value = number;

interface NumberFlowProps {
  value: Value;
  trend?: boolean;
  className?: string;
}

export default function NumberFlow({
  value,
  trend = true,
  className,
}: NumberFlowProps) {
  return (
    <span className={cn("tabular-nums", className)}>
      {value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}
    </span>
  );
}