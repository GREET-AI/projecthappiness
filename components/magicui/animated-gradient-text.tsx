"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function AnimatedGradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/40 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`absolute inset-0 block h-full w-full bg-gradient-to-r from-[#FFE81F]/50 via-[#9945FF]/50 via-[#14F195]/50 to-[#FFE81F]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask-composite:xor] animate-gradient`}
      />

      <motion.span
        className="relative inline-block bg-gradient-to-r from-[#FFE81F] via-[#9945FF] via-[#14F195] to-[#FFE81F] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent dark:from-[#FFE81F] dark:via-[#9945FF] dark:via-[#14F195] dark:to-[#FFE81F]"
        animate={{
          backgroundPosition: ["0%", "100%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}

