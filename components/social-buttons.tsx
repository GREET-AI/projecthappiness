"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SocialButtonProps {
  href: string;
  logo: string;
  alt: string;
  className?: string;
  index?: number;
  isCommunity?: boolean;
}

function SocialButton({ href, logo, alt, className, index, isCommunity }: SocialButtonProps) {
  // Deterministische Rotation basierend auf Index (verhindert Hydration Error)
  const rotations = [-6, 4, -7, 5]; // Feste Rotationen für jeden Button
  const rotation = index !== undefined ? rotations[index % rotations.length] : 0;
  
  return (
    <motion.div
      style={{ rotate: rotation }}
      whileHover={{ 
        scale: 1.2, 
        y: -6,
        rotate: rotation + 5,
        filter: "brightness(1.2)"
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17
      }}
      className="relative group"
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "relative flex items-center justify-center",
          "bg-gradient-to-br from-orange-400 to-amber-500",
          "border-3 border-orange-600",
          "rounded-2xl",
          "p-2 md:p-2.5",
          "shadow-lg hover:shadow-2xl",
          "transition-all duration-300",
          "hover:border-orange-400",
          "group",
          "min-w-[56px] min-h-[56px] md:min-w-[64px] md:min-h-[64px]",
          className
        )}
        style={{
          borderWidth: '3px',
        }}
      >
        {/* Leuchteffekt beim Hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle, rgba(255, 232, 31, 0.6) 0%, rgba(255, 200, 80, 0.4) 50%, transparent 80%)",
            boxShadow: "0 0 30px rgba(255, 232, 31, 0.8), 0 0 60px rgba(255, 200, 80, 0.6)",
            filter: "blur(10px)",
          }}
        />
        
        {/* Zusätzlicher Glow-Ring beim Hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: "0 0 20px rgba(255, 232, 31, 0.9), 0 0 40px rgba(255, 200, 80, 0.7), inset 0 0 20px rgba(255, 232, 31, 0.3)",
          }}
        />
        
        <Image
          src={logo}
          alt={alt}
          width={40}
          height={40}
          className="w-10 h-10 md:w-12 md:h-12 relative z-10 transition-transform duration-300 group-hover:scale-110 drop-shadow-lg"
          unoptimized
        />
      </Link>
      
      {/* Tooltip für X Community */}
      {isCommunity && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
          <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
            X Community
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function SocialButtons() {
  const socialLinks = [
    {
      id: "x-main",
      href: "https://x.com/projecthappysol",
      logo: "/files/cryptologos/Twitter Logo.png",
      alt: "Twitter / X",
    },
    {
      id: "pumpfun",
      href: "https://pump.fun",
      logo: "/files/cryptologos/PumpFun Logo.png",
      alt: "Pump.fun",
    },
    {
      id: "x-community",
      href: "https://x.com/projecthappysol",
      logo: "/files/cryptologos/Twitter Logo.png",
      alt: "X Community",
      isCommunity: true,
    },
    {
      id: "dexscreener",
      href: "https://dexscreener.com",
      logo: "/files/cryptologos/Dexscreener Logo.png",
      alt: "DexScreener",
    },
  ];

  return (
    <div id="social-buttons-container" className="flex flex-wrap gap-6 md:gap-8 justify-center items-center">
      {socialLinks.map((link, index) => (
        <motion.div
          key={link.id}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            delay: index * 0.1, 
            duration: 0.5,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
        >
          <SocialButton
            href={link.href}
            logo={link.logo}
            alt={link.alt}
            index={index}
            isCommunity={link.isCommunity}
          />
        </motion.div>
      ))}
    </div>
  );
}

