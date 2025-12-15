"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Globe({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;

    const drawGlobe = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw grid lines
      ctx.strokeStyle = "rgba(100, 116, 139, 0.3)";
      ctx.lineWidth = 1;

      // Horizontal lines
      for (let i = -3; i <= 3; i++) {
        const y = centerY + (i * radius) / 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Vertical lines
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI * 2) / 12;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * radius,
          centerY + Math.sin(angle) * radius
        );
        ctx.stroke();
      }

      // Draw dots for "happiness spreading"
      ctx.fillStyle = "#22c55e";
      for (let i = 0; i < 20; i++) {
        const lat = (Math.random() - 0.5) * Math.PI;
        const lon = Math.random() * Math.PI * 2;
        const x = centerX + Math.cos(lat) * Math.cos(lon) * radius;
        const y = centerY + Math.sin(lat) * radius;

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    drawGlobe();
    const interval = setInterval(drawGlobe, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="rounded-full"
      />
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}

