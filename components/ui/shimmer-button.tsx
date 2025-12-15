"use client";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./button";

export function ShimmerButton({
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Button
      className={cn(
        "relative overflow-hidden bg-gradient-to-r from-primary via-primary/80 to-primary",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

