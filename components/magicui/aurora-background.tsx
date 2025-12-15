"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className="absolute -inset-[10px] opacity-50 blur-3xl"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.3), transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.3), transparent 50%)",
            "radial-gradient(circle at 40% 20%, rgba(6, 182, 212, 0.3), transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          background: "radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.3), transparent 50%)",
        }}
      />
    </div>
  );
}

