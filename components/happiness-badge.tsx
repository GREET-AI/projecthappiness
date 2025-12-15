"use client";

import { cn } from "@/lib/utils";
import { BadgeCheck, Shield, Crown } from "lucide-react";

type BadgeLevel = "supporter" | "guardian" | "god";

interface HappinessBadgeProps {
  level: BadgeLevel;
  className?: string;
}

const badgeConfig = {
  supporter: {
    icon: BadgeCheck,
    label: "Supporter",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
  guardian: {
    icon: Shield,
    label: "Guardian",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  god: {
    icon: Crown,
    label: "God",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
};

export function HappinessBadge({ level, className }: HappinessBadgeProps) {
  const config = badgeConfig[level];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1",
        config.bgColor,
        config.borderColor,
        className
      )}
    >
      <Icon className={cn("h-4 w-4", config.color)} />
      <span className={cn("text-sm font-medium", config.color)}>
        {config.label}
      </span>
    </div>
  );
}

