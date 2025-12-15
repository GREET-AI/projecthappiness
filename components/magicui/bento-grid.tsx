"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-max grid-cols-1 gap-4 md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  className,
  name,
  classNameHeader,
  header,
  icon,
  children,
}: {
  className?: string;
  name: string;
  classNameHeader?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      {header}
      <div className={cn("font-sans font-bold text-neutral-600 dark:text-neutral-300", classNameHeader)}>
        {name}
      </div>
      <div className="font-sans text-sm font-normal text-neutral-600 dark:text-neutral-300">
        {children}
      </div>
      {icon}
    </motion.div>
  );
}

