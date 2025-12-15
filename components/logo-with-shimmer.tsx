"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToggle } from "@/lib/contexts/toggle-context";
import { useChristmas } from "@/lib/contexts/christmas-context";

interface LogoWithShimmerProps {
  className?: string;
}

export function LogoWithShimmer({ className }: LogoWithShimmerProps) {
  const { isActive } = useToggle();
  const { isChristmasActive } = useChristmas();

  return (
    <div className={cn("relative", className)}>
      {/* Schweißfunken/Blitze-Effekt - ausgewogen */}
      {isActive && (
        <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-visible">
          {/* Pulsierender Lichtring um das Logo */}
          <motion.div
            className="absolute w-full h-full rounded-full"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: "radial-gradient(circle, rgba(255, 232, 31, 0.6) 0%, rgba(255, 200, 80, 0.4) 30%, rgba(255, 150, 0, 0.3) 50%, transparent 70%)",
              boxShadow: `0 0 60px rgba(255, 232, 31, 0.7), 0 0 120px rgba(255, 200, 80, 0.5)`,
              filter: "blur(15px)",
            }}
          />

          {/* Kleine Funken (16 statt 24) */}
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: [
                  0,
                  Math.cos((i * 22.5) * Math.PI / 180) * (80 + Math.random() * 40),
                  Math.cos((i * 22.5) * Math.PI / 180) * (140 + Math.random() * 50),
                ],
                y: [
                  0,
                  Math.sin((i * 22.5) * Math.PI / 180) * (80 + Math.random() * 40),
                  Math.sin((i * 22.5) * Math.PI / 180) * (140 + Math.random() * 50),
                ],
                opacity: [0, 0.9, 0.7, 0],
                scale: [0, 1.3, 1, 0],
              }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              style={{
                background: `radial-gradient(circle, 
                  rgba(255, 232, 31, 0.9) 0%, 
                  rgba(255, 200, 80, 0.7) 40%, 
                  rgba(255, 150, 0, 0.5) 60%, 
                  transparent 100%
                )`,
                boxShadow: `0 0 12px rgba(255, 232, 31, 0.8), 0 0 24px rgba(255, 200, 80, 0.6)`,
                filter: 'blur(0.5px)',
              }}
            />
          ))}
          
          {/* Größere Blitze (8 statt 12) */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`spark-${i}`}
              className="absolute w-1 h-20"
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
                rotate: i * 45,
              }}
              animate={{
                x: [
                  0,
                  Math.cos((i * 45) * Math.PI / 180) * 100,
                  Math.cos((i * 45) * Math.PI / 180) * 160,
                ],
                y: [
                  0,
                  Math.sin((i * 45) * Math.PI / 180) * 100,
                  Math.sin((i * 45) * Math.PI / 180) * 160,
                ],
                opacity: [0, 0.9, 0.8, 0],
                scale: [0, 1, 0.9, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeOut",
              }}
              style={{
                background: `linear-gradient(to bottom, 
                  rgba(255, 232, 31, 0.8) 0%, 
                  rgba(255, 200, 80, 0.7) 40%, 
                  rgba(255, 150, 0, 0.5) 70%, 
                  transparent 100%
                )`,
                boxShadow: `0 0 20px rgba(255, 232, 31, 0.8), 0 0 40px rgba(255, 200, 80, 0.6)`,
                filter: 'blur(1px)',
              }}
            />
          ))}
        </div>
      )}

      {/* Hintergrund-Glow - ausgewogen */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        {/* Pulsierender Glow wenn aktiv */}
        <motion.div
          className="absolute w-full h-full max-w-[350px] max-h-[350px] rounded-full"
          animate={{
            opacity: isActive ? [0.5, 0.7, 0.5] : [0.2, 0.4, 0.2],
            scale: isActive ? [1, 1.3, 1] : [1, 1.15, 1],
          }}
          transition={{
            duration: isActive ? 1.5 : 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: isActive
              ? "radial-gradient(circle, rgba(255, 232, 31, 0.5) 0%, rgba(255, 200, 80, 0.4) 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)"
              : "radial-gradient(circle, rgba(255, 200, 80, 0.3) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%)",
            filter: isActive ? "blur(70px)" : "blur(60px)",
            boxShadow: isActive ? "0 0 100px rgba(255, 232, 31, 0.6), 0 0 200px rgba(255, 200, 80, 0.4)" : "none",
          }}
        />
        
        {/* Rotierender Ring wenn aktiv */}
        <motion.div
          className="absolute w-full h-full max-w-[400px] max-h-[400px] rounded-full"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: isActive ? 8 : 30,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: isActive
              ? "radial-gradient(circle, rgba(255, 232, 31, 0.3) 0%, rgba(255, 200, 80, 0.2) 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)"
              : "radial-gradient(circle, rgba(255, 200, 80, 0.15) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)",
            filter: isActive ? "blur(55px)" : "blur(50px)",
          }}
        />
      </div>
      
      {/* Logo - rotierend (schneller wenn aktiv) */}
      <motion.div
        key={isActive ? 'active' : 'inactive'}
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: isActive ? [1, 1.03, 1] : 1,
          rotate: 360
        }}
        transition={{ 
          opacity: { duration: 0.8, ease: "easeOut" },
          scale: { 
            duration: isActive ? 0.8 : 0.8,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut"
          },
          rotate: {
            duration: isActive ? 3 : 20, // Schneller wenn aktiv, aber nicht zu extrem
            repeat: Infinity,
            ease: "linear"
          }
        }}
        whileHover={{ scale: 1.05 }}
      >
        <Image
          src={isChristmasActive ? "/files/christmaslogo.png" : "/files/logo.png"}
          alt="PROJECT happiness Logo"
          width={320}
          height={320}
          className="w-full h-auto"
          style={{
            filter: isActive 
              ? 'drop-shadow(0 0 20px rgba(255, 232, 31, 0.8)) drop-shadow(0 0 40px rgba(255, 200, 80, 0.6)) drop-shadow(0 0 60px rgba(255, 150, 0, 0.4))'
              : isChristmasActive
              ? 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.6)) drop-shadow(0 0 40px rgba(0, 255, 0, 0.4))'
              : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
          }}
          priority
        />
      </motion.div>
    </div>
  );
}

