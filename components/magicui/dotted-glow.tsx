"use client";

import { cn } from "@/lib/utils";

export function DottedGlow({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0",
        "bg-[radial-gradient(circle_at_1px_1px,rgba(100,116,139,0.15)_1px,transparent_0)]",
        "bg-[length:20px_20px]",
        className
      )}
    />
  );
}

