"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Confetti from "react-confetti";
import { useWindowSize } from "@/lib/hooks/use-window-size";
import { useToggle } from "@/lib/contexts/toggle-context";
import { useChristmas } from "@/lib/contexts/christmas-context";

export function FlyingLogosToggle() {
  const { isActive, setIsActive } = useToggle();
  const { isChristmasActive, setIsChristmasActive } = useChristmas();
  const { width, height } = useWindowSize();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio-Element initialisieren
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/files/soundtrack.mp3');
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

  // Audio abspielen/stoppen basierend auf isActive
  useEffect(() => {
    if (audioRef.current) {
      if (isActive) {
        audioRef.current.play().catch((error) => {
          console.log('Audio play failed:', error);
        });
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Zurück zum Anfang
      }
    }
  }, [isActive]);

  const toggleFlyingLogos = () => {
    const newState = !isActive;
    setIsActive(newState);
    // Wenn dieser Toggle aktiviert wird, deaktiviere Christmas
    if (newState) {
      setIsChristmasActive(false);
    }
  };

  return (
    <>
      {/* Blitzlicht/Disco-Effekt für den ganzen Bildschirm */}
      {isActive && (
        <>
          {/* Gelber Glow von außen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.5, 0.8, 0.5, 0],
              boxShadow: [
                "inset 0 0 0 0 rgba(255, 232, 31, 0)",
                "inset 0 0 250px 120px rgba(255, 232, 31, 0.6)",
                "inset 0 0 400px 200px rgba(255, 232, 31, 0.4)",
                "inset 0 0 250px 120px rgba(255, 232, 31, 0.6)",
                "inset 0 0 0 0 rgba(255, 232, 31, 0)",
              ],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9998,
              pointerEvents: 'none',
              mixBlendMode: 'screen',
            }}
          />
          {/* Lila Glow von außen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.4, 0.7, 0.4, 0],
              boxShadow: [
                "inset 0 0 0 0 rgba(153, 69, 255, 0)",
                "inset 0 0 300px 150px rgba(153, 69, 255, 0.5)",
                "inset 0 0 450px 220px rgba(153, 69, 255, 0.3)",
                "inset 0 0 300px 150px rgba(153, 69, 255, 0.5)",
                "inset 0 0 0 0 rgba(153, 69, 255, 0)",
              ],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1,
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9998,
              pointerEvents: 'none',
              mixBlendMode: 'screen',
            }}
          />
          {/* Grüner Glow (Solana) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.3, 0.6, 0.3, 0],
              boxShadow: [
                "inset 0 0 0 0 rgba(20, 241, 149, 0)",
                "inset 0 0 200px 100px rgba(20, 241, 149, 0.4)",
                "inset 0 0 350px 180px rgba(20, 241, 149, 0.3)",
                "inset 0 0 200px 100px rgba(20, 241, 149, 0.4)",
                "inset 0 0 0 0 rgba(20, 241, 149, 0)",
              ],
            }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9998,
              pointerEvents: 'none',
              mixBlendMode: 'screen',
            }}
          />
        </>
      )}

      {/* React Confetti für Feuerwerk-Effekt */}
      {isActive && width && height && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10000, pointerEvents: 'none' }}>
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={300}
            gravity={0.2}
            wind={0.02}
            colors={['#FFE81F', '#9945FF', '#14F195', '#00D1FF', '#FB2BFF', '#FFD700']}
            initialVelocityY={-20}
            initialVelocityX={0}
          />
        </div>
      )}

      {/* Flying Logos Container - auch im Christmas Mode */}
      {(isActive || isChristmasActive) && (
        <div 
          className="flying-logos" 
          style={{ 
            zIndex: 10001,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none'
          }}
        >
          {/* Von links nach rechts */}
          <Image
            src={isChristmasActive ? "/files/christmaslogo.png" : "/files/logo.png"}
            alt="Flying Logo"
            width={60}
            height={60}
            className="flying-logo left-to-right-1"
            style={{ zIndex: 10001 }}
            unoptimized
          />
          <Image
            src={isChristmasActive ? "/files/christmaslogo.png" : "/files/logo.png"}
            alt="Flying Logo"
            width={60}
            height={60}
            className="flying-logo left-to-right-2"
            style={{ zIndex: 10001 }}
            unoptimized
          />
          <Image
            src={isChristmasActive ? "/files/christmaslogo.png" : "/files/logo.png"}
            alt="Flying Logo"
            width={60}
            height={60}
            className="flying-logo left-to-right-3"
            style={{ zIndex: 10001 }}
            unoptimized
          />

          {/* Von rechts nach links */}
          <Image
            src={isChristmasActive ? "/files/christmaslogo.png" : "/files/logo.png"}
            alt="Flying Logo"
            width={60}
            height={60}
            className="flying-logo right-to-left-1"
            style={{ zIndex: 10001 }}
            unoptimized
          />
          <Image
            src={isChristmasActive ? "/files/christmaslogo.png" : "/files/logo.png"}
            alt="Flying Logo"
            width={60}
            height={60}
            className="flying-logo right-to-left-2"
            style={{ zIndex: 10001 }}
            unoptimized
          />
          <Image
            src={isChristmasActive ? "/files/christmaslogo.png" : "/files/logo.png"}
            alt="Flying Logo"
            width={60}
            height={60}
            className="flying-logo right-to-left-3"
            style={{ zIndex: 10001 }}
            unoptimized
          />

          {/* Von oben nach unten (Schnee) */}
          <Image
            src={isChristmasActive ? "/files/christmaslogo.png" : "/files/logo.png"}
            alt="Flying Logo"
            width={60}
            height={60}
            className="flying-logo snow-fall-1"
            style={{ zIndex: 10001 }}
            unoptimized
          />
          <Image
            src={isChristmasActive ? "/files/christmaslogo.png" : "/files/logo.png"}
            alt="Flying Logo"
            width={60}
            height={60}
            className="flying-logo snow-fall-2"
            style={{ zIndex: 10001 }}
            unoptimized
          />
          <Image
            src={isChristmasActive ? "/files/christmaslogo.png" : "/files/logo.png"}
            alt="Flying Logo"
            width={60}
            height={60}
            className="flying-logo snow-fall-3"
            style={{ zIndex: 10001 }}
            unoptimized
          />

          {/* Von unten nach oben (Bubbles) */}
          <Image
            src={isChristmasActive ? "/files/christmaslogo.png" : "/files/logo.png"}
            alt="Flying Logo"
            width={60}
            height={60}
            className="flying-logo bubble-up-1"
            style={{ zIndex: 10001 }}
            unoptimized
          />
          <Image
            src={isChristmasActive ? "/files/christmaslogo.png" : "/files/logo.png"}
            alt="Flying Logo"
            width={60}
            height={60}
            className="flying-logo bubble-up-2"
            style={{ zIndex: 10001 }}
            unoptimized
          />

          {/* Diagonal kreuz und quer */}
          <Image
            src={isChristmasActive ? "/files/christmaslogo.png" : "/files/logo.png"}
            alt="Flying Logo"
            width={60}
            height={60}
            className="flying-logo diagonal-1"
            style={{ zIndex: 10001 }}
            unoptimized
          />
          <Image
            src={isChristmasActive ? "/files/christmaslogo.png" : "/files/logo.png"}
            alt="Flying Logo"
            width={60}
            height={60}
            className="flying-logo diagonal-2"
            style={{ zIndex: 10001 }}
            unoptimized
          />
          <Image
            src={isChristmasActive ? "/files/christmaslogo.png" : "/files/logo.png"}
            alt="Flying Logo"
            width={60}
            height={60}
            className="flying-logo diagonal-3"
            style={{ zIndex: 10001 }}
            unoptimized
          />

          {/* Random Bewegungen */}
          <Image
            src={isChristmasActive ? "/files/christmaslogo.png" : "/files/logo.png"}
            alt="Flying Logo"
            width={60}
            height={60}
            className="flying-logo random-1"
            style={{ zIndex: 10001 }}
            unoptimized
          />
          <Image
            src={isChristmasActive ? "/files/christmaslogo.png" : "/files/logo.png"}
            alt="Flying Logo"
            width={60}
            height={60}
            className="flying-logo random-2"
            style={{ zIndex: 10001 }}
            unoptimized
          />
        </div>
      )}

      {/* Toggle Button */}
      <motion.button
        onClick={toggleFlyingLogos}
        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-accent hover:border-happiness-yellow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle flying logos"
      >
        {/* Feuerwerk-Glow Effekt */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isActive
              ? [
                  "0 0 0 0 rgba(255, 232, 31, 0)",
                  "0 0 30px 10px rgba(255, 232, 31, 0.8)",
                  "0 0 50px 20px rgba(153, 69, 255, 0.6)",
                  "0 0 30px 10px rgba(255, 232, 31, 0.8)",
                  "0 0 0 0 rgba(255, 232, 31, 0)",
                ]
              : "0 0 0 0 rgba(255, 232, 31, 0)",
          }}
          transition={{
            duration: 0.5,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut",
          }}
        />

        {/* Sparkles Icon */}
        <motion.div
          animate={{
            rotate: isActive ? 360 : 0,
            scale: isActive ? [1, 1.3, 1] : 1,
          }}
          transition={{
            rotate: {
              duration: 0.5,
              ease: "linear",
            },
            scale: {
              duration: 0.3,
              repeat: isActive ? Infinity : 0,
              ease: "easeInOut",
            },
          }}
        >
          <Sparkles className={`h-4 w-4 ${isActive ? 'text-happiness-yellow' : 'text-muted-foreground'}`} />
        </motion.div>
      </motion.button>
    </>
  );
}

