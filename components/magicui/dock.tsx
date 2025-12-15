"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef, useState, Children, isValidElement } from "react";
import Image from "next/image";

export function Dock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-full border border-border bg-background/80 backdrop-blur-lg px-4 py-2 shadow-lg",
        className
      )}
    >
      {Children.map(children, (child, index) => {
        if (isValidElement(child) && child.props.id) {
          return <div key={child.props.id}>{child}</div>;
        }
        return <div key={index}>{child}</div>;
      })}
    </div>
  );
}

export function DockIcon({
  children,
  href,
  className,
  tooltip,
  logo,
  alt,
  id,
}: {
  children?: ReactNode;
  href: string;
  className?: string;
  tooltip?: string;
  logo?: string;
  alt?: string;
  id?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(Infinity);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const width = useSpring(useTransform(distance, [-150, 0, 150], [40, 80, 40]), {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <div className="relative group">
      <motion.a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ width }}
        onMouseMove={(e) => {
          mouseX.set(e.pageX);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
          setIsHovered(false);
        }}
        className={cn(
          "flex aspect-square items-center justify-center rounded-full bg-muted transition-colors hover:bg-accent",
          className
        )}
      >
        {logo ? (
          <Image
            src={logo}
            alt={alt || ""}
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
            unoptimized
          />
        ) : (
          children
        )}
      </motion.a>
      
      {/* Tooltip */}
      {tooltip && (
        <div className={cn(
          "absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50",
          isHovered && "opacity-100"
        )}>
          <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
            {tooltip}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
          </div>
        </div>
      )}
    </div>
  );
}

