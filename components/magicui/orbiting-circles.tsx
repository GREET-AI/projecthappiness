"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface OrbitingCircleProps {
  className?: string;
  children?: React.ReactNode;
  radius?: number;
  duration?: number;
  delay?: number;
  reverse?: boolean;
}

export function OrbitingCircles({
  className,
  children,
  radius = 50,
  duration = 20,
  delay = 0,
  reverse = false,
}: OrbitingCircleProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center", className)}>
      <motion.div
        style={{
          width: radius * 2,
          height: radius * 2,
        }}
        animate={{
          rotate: reverse ? -360 : 360,
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
        className="absolute"
      >
        <div className="absolute left-1/2 top-0 size-4 -translate-x-1/2 -translate-y-1/2">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

