"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function ContractAddressButton() {
  const [copied, setCopied] = useState(false);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
    // CA wird später hinzugefügt
    const contractAddress: string = ""; // "To be announced"
  
  useEffect(() => {
    const updateWidth = () => {
      const socialContainer = document.getElementById("social-buttons-container");
      if (socialContainer && buttonRef.current) {
        const containerWidth = socialContainer.offsetWidth;
        setWidth(containerWidth);
      }
    };
    
    // Initial width calculation
    setTimeout(updateWidth, 100);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  
  const handleCopy = async () => {
    if (!contractAddress) {
      // Wenn keine CA vorhanden ist, zeige eine lustige Nachricht
      return;
    }
    
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleCopy}
      disabled={!contractAddress}
      className={cn(
        "group relative flex items-center justify-center gap-3 px-6 py-2 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 shadow-lg",
        contractAddress
          ? "bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white border-2 border-orange-600 cursor-pointer"
          : "bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-400 border-2 border-gray-400 dark:border-gray-600 cursor-not-allowed opacity-75"
      )}
      whileHover={contractAddress ? { scale: 1.05 } : {}}
      whileTap={contractAddress ? { scale: 0.95 } : {}}
      style={{ width: width ? `${width}px` : "100%" }}
    >
      <Wallet className="h-4 w-4" />
      
      <AnimatePresence mode="wait">
        {contractAddress ? (
          <motion.span
            key="address"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <span className="font-mono text-xs md:text-sm">
                  {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
                </span>
                <Copy className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              </>
            )}
          </motion.span>
        ) : (
          <motion.span
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <span>CA: Happiness loading...</span>
          </motion.span>
        )}
      </AnimatePresence>
      
      {/* Glow Effect */}
      {contractAddress && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300 -z-10"
          initial={false}
        />
      )}
    </motion.button>
  );
}
