"use client";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./button";

export function RainbowButton({
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Button
      className={cn(
        "relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-[length:200%_auto]",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-pink-500 before:via-purple-500 before:to-cyan-500",
        "before:animate-[shimmer_3s_linear_infinite]",
        "hover:shadow-lg hover:shadow-purple-500/50",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  );
}

