"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function AnimatedThemeToggler() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Verhindert Hydration-Mismatch
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-full border border-border bg-background" />
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      className="relative h-9 w-9 rounded-full p-0 overflow-visible"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {/* MagicUI Mega-Animation: Glow + Orbit */}
      <motion.div
        className="absolute -inset-1 rounded-full bg-gradient-to-r from-neon-cyan/20 to-neon-pink/20 dark:from-neon-cyan/30 dark:to-neon-pink/30 blur opacity-75 -z-10"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-cyan opacity-0 dark:opacity-20 -z-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Icon Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: -90 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? (
            <Sun className="h-4 w-4 text-happiness-yellow drop-shadow-[0_0_8px_rgba(255,232,31,0.8)]" />
          ) : (
            <Moon className="h-4 w-4 text-foreground" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}
