"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Snowflake } from "lucide-react";
import { useWindowSize } from "@/lib/hooks/use-window-size";
import { useChristmas } from "@/lib/contexts/christmas-context";
import { useToggle } from "@/lib/contexts/toggle-context";

export function ChristmasToggle() {
  const { isChristmasActive, setIsChristmasActive } = useChristmas();
  const { setIsActive } = useToggle();
  const { width, height } = useWindowSize();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio-Element initialisieren
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/files/christmas.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5; // 50% Lautstärke
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Audio abspielen/stoppen basierend auf isChristmasActive
  useEffect(() => {
    if (audioRef.current) {
      if (isChristmasActive) {
        audioRef.current.play().catch((error) => {
          console.log('Christmas audio play failed:', error);
        });
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Zurück zum Anfang
      }
    }
  }, [isChristmasActive]);

  const toggleChristmas = () => {
    const newState = !isChristmasActive;
    setIsChristmasActive(newState);
    // Wenn Christmas aktiviert wird, deaktiviere den anderen Toggle
    if (newState) {
      setIsActive(false);
    }
  };

  return (
    <>
      {/* Schneeflocken-Effekt */}
      {isChristmasActive && width && height && (
        <div 
          className="fixed inset-0 pointer-events-none overflow-hidden"
          style={{ 
            zIndex: 10002,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
          }}
        >
          {[...Array(50)].map((_, i) => {
            // Gleichmäßig über die gesamte Breite verteilen
            const startXPercent = (i / 50) * 100; // 0% bis 100%
            const startX = width ? (startXPercent / 100) * width : 0;
            const delay = Math.random() * 5;
            const duration = 10 + Math.random() * 10; // 10-20 Sekunden
            const size = 10 + Math.random() * 20; // 10-30px
            // Leichte horizontale Bewegung beim Fallen (wie echte Schneeflocken)
            const drift = width ? (Math.random() * 100 - 50) : 0; // -50px bis +50px Drift
            
            return (
              <motion.div
                key={`snowflake-${i}`}
                className="absolute text-white"
                initial={{
                  x: startX,
                  y: -50,
                  rotate: 0,
                  opacity: 0,
                }}
                animate={{
                  x: [startX, startX + drift, startX - drift, startX],
                  y: height + 50,
                  rotate: 360,
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: duration,
                  delay: delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  fontSize: `${size}px`,
                  filter: 'drop-shadow(0 0 4px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 2px rgba(255, 255, 255, 0.9))',
                  zIndex: 10002,
                  color: 'white',
                  textShadow: '0 0 8px rgba(255, 255, 255, 1), 0 0 4px rgba(0, 0, 0, 0.3)',
                }}
              >
                ❄
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={toggleChristmas}
        className={`
          relative flex items-center justify-center
          w-12 h-12 rounded-full
          transition-all duration-300
          ${isChristmasActive 
            ? 'bg-gradient-to-br from-red-500 to-green-500 shadow-lg shadow-red-500/50' 
            : 'bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800'
          }
          hover:scale-110 active:scale-95
        `}
        aria-label="Toggle Christmas Mode"
      >
        <Snowflake 
          className={`w-6 h-6 transition-all duration-300 ${
            isChristmasActive 
              ? 'text-white animate-spin' 
              : 'text-gray-600 dark:text-gray-300'
          }`}
          style={{
            animation: isChristmasActive ? 'spin 3s linear infinite' : 'none',
          }}
        />
        
        {/* Pulsierender Glow wenn aktiv */}
        {isChristmasActive && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: "radial-gradient(circle, rgba(255, 0, 0, 0.4) 0%, rgba(0, 255, 0, 0.4) 50%, transparent 100%)",
              filter: "blur(8px)",
            }}
          />
        )}
      </button>
    </>
  );
}

