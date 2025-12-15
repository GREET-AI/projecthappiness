"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FlyingLogosToggle } from "./magicui/flying-logos-toggle";
import { ChristmasToggle } from "./magicui/christmas-toggle";
import { useChristmas } from "@/lib/contexts/christmas-context";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "home" },
  { href: "/how-it-works", label: "how it works" },
  { href: "/apply", label: "apply" },
  { href: "/vote", label: "vote" },
  { href: "/pool", label: "impact" },
  { href: "/analysis", label: "analysis" },
  { href: "/live", label: "live" },
  { href: "/transparency", label: "transparency" },
  { href: "/lore", label: "lore" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isChristmasActive } = useChristmas();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/20 bg-transparent backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo - größer */}
        <Link href="/" className="flex items-center">
          <Image
            src={isChristmasActive ? "/files/christmaslogo.png" : "/files/logo.png"}
            alt="PROJECT happiness Logo"
            width={80}
            height={80}
            className="h-16 w-16 md:h-20 md:w-20"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-normal transition-colors hover:text-orange-600 dark:hover:text-orange-500 lowercase",
                pathname === item.href
                  ? "text-orange-700 dark:text-orange-600 font-normal"
                  : "text-gray-900 dark:text-white"
              )}
              style={{ fontFamily: '"Borel", cursive' }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Side - Buy Button, Theme Toggler & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {/* Buy Button */}
          <Link
            href="https://pump.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-orange-600 uppercase"
          >
            buy $happiness
          </Link>
          
          <FlyingLogosToggle />
          <ChristmasToggle />
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-20 z-50 h-[calc(100vh-5rem)] w-[280px] border-r border-border/20 bg-background/95 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-base font-normal py-2 px-4 rounded-lg transition-colors lowercase",
                      pathname === item.href
                        ? "text-orange-700 dark:text-orange-600 font-normal bg-orange-500/20"
                        : "text-gray-800 dark:text-white hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-500/10"
                    )}
                    style={{ fontFamily: '"Borel", cursive' }}
                  >
                    {item.label}
                  </Link>
                ))}
                {/* Buy Button im Mobile Menu */}
                <Link
                  href="https://pump.fun"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-orange-600 uppercase text-center mt-4"
                >
                  buy $happiness
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

