"use client";

import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "@/lib/hooks/use-window-size";

type LoadingState = {
  text: string;
  description?: string;
};

const roadmapSteps: LoadingState[] = [
  {
    text: "Launch $HAPPINESS on Pump.fun",
    description: "The happiest coin is born",
  },
  {
    text: "Dexscreener 100 Boost (within 24h)",
    description: "Maximum visibility from day one",
  },
  {
    text: "API Connection & Live Pool Data (within 24h)",
    description: "Real-time tracking goes live",
  },
  {
    text: "Secure Voting Activated",
    description: "Wallet check + reCAPTCHA for fairness",
  },
  {
    text: "Dexscreener Banner goes permanent",
    description: "Every trader sees us forever",
  },
  {
    text: "Live Features & Real Donations Launch",
    description: "Interactive streaming, live donations, and chat go live",
  },
  {
    text: "Stream Archive System Activated",
    description: "All shows saved for later viewing",
  },
  {
    text: "First live charity show (Day 1)",
    description: "First real human saved on stream",
  },
  {
    text: "100 people saved in first week",
    description: "Tears go viral",
  },
  {
    text: "First mainstream media feature",
    description: "Forbes, Bild, Yahoo Finance",
  },
  {
    text: "1.000 lives changed",
    description: "$100k+ distributed",
  },
  {
    text: "Reality Show Mode activated",
    description: "We start traveling the world",
  },
  {
    text: "First international surprise drop",
    description: "Thailand / Brazil / Africa",
  },
  {
    text: "10.000 lives changed",
    description: "$1 Million+ given away",
  },
  {
    text: "Daily World Tour begins",
    description: "New city, new happiness every single day",
  },
  {
    text: "Netflix & TV want the rights",
    description: "We stay independent",
  },
  {
    text: "100.000 lives changed",
    description: "$10 Million+ distributed",
  },
  {
    text: "Official Happiness Foundation",
    description: "Legal non-profit, global scale",
  },
  {
    text: "First Happiness Festival",
    description: "50.000 people live",
  },
  {
    text: "The Happiest Movement on Earth",
    description: "Millions smiling because of a meme coin",
  },
];

export function RoadmapModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  // ESC-Taste zum Schließen
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // Verhindere Body-Scroll wenn Modal offen ist
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    setShowConfetti(false);
  };

  return (
    <>
      {/* Confetti für Step 1 */}
      {showConfetti && isOpen && width && height && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          colors={['#FFE81F', '#9945FF', '#14F195', '#00D1FF', '#FB2BFF', '#FFD700']}
        />
      )}

      {/* Button zum Öffnen */}
      <button
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => setShowConfetti(true), 100);
          setTimeout(() => setShowConfetti(false), 3000);
        }}
        className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-orange-600"
      >
        View Roadmap
      </button>

      {/* Modal mit Roadmap - Original Aceternity Style */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-[100]"
            onClick={closeModal}
          >
            <MultiStepLoader
              loadingStates={roadmapSteps}
              loading={true}
              value={undefined}
              loop={true}
              duration={2000}
            />
            
            {/* Close Button unten RECHTS - Orange/Gelb Branding */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
              className="fixed bottom-6 right-6 z-[150] text-white bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 rounded-full p-2.5 transition-all shadow-lg hover:shadow-xl border-2 border-orange-600"
              aria-label="Close roadmap"
            >
              <X className="h-5 w-5 font-bold" strokeWidth={3} />
            </button>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

