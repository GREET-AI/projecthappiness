"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";

export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = -75,
  duration = 3,
  delay = 0,
  startYOffset = 0,
  endYOffset = 0,
}: {
  className?: string;
  containerRef: RefObject<HTMLDivElement>;
  fromRef: RefObject<HTMLDivElement>;
  toRef: RefObject<HTMLDivElement>;
  curvature?: number;
  duration?: number;
  delay?: number;
  startYOffset?: number;
  endYOffset?: number;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const fromRect = fromRef.current.getBoundingClientRect();
        const toRect = toRef.current.getBoundingClientRect();

        const startX = fromRect.left - containerRect.left + fromRect.width / 2;
        const startY =
          fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;
        const endX = toRect.left - containerRect.left + toRect.width / 2;
        const endY =
          toRect.top - containerRect.top + toRect.height / 2 + endYOffset;

        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;
        const distanceY = Math.abs(endY - startY);

        const cpx1 = midX - curvature;
        const cpy1 = midY - distanceY * 0.25;
        const cpx2 = midX + curvature;
        const cpy2 = midY + distanceY * 0.25;

        const path = `M ${startX} ${startY} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${endX} ${endY}`;

        setPathD(path);
        setSvgDimensions({
          width: containerRect.width,
          height: containerRect.height,
        });
      }
    };

    updatePath();
    window.addEventListener("resize", updatePath);

    return () => {
      window.removeEventListener("resize", updatePath);
    };
  }, [containerRef, fromRef, toRef, curvature, startYOffset, endYOffset]);

  return (
    <svg
      width={svgDimensions.width}
      height={svgDimensions.height}
      className={cn("pointer-events-none absolute left-0 top-0", className)}
    >
      <path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke={`url(#gradient-${delay})`}
        strokeWidth="2"
        className="dark:stroke-neon-cyan stroke-primary"
        strokeDasharray="10 5"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;-15"
          dur={`${duration}s`}
          repeatCount="indefinite"
        />
      </path>
      <defs>
        <linearGradient id={`gradient-${delay}`} gradientUnits="userSpaceOnUse">
          <stop stopColor="currentColor" stopOpacity="0" />
          <stop stopColor="currentColor" stopOpacity="0.5" />
          <stop stopColor="currentColor" stopOpacity="1" />
          <stop stopColor="currentColor" stopOpacity="0.5" />
          <stop stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

