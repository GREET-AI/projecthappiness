"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("w-6 h-6 ", className)}
    >
      <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
};

const CheckFilled = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-6 h-6 ", className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

type LoadingState = {
  text: string;
  description?: string;
};

const LoaderCore = ({
  loadingStates,
  value = 0,
}: {
  loadingStates: LoadingState[];
  value?: number;
}) => {
  return (
    <div className="flex relative justify-start max-w-xl mx-auto flex-col">
      {loadingStates.map((loadingState, index) => {
        const distance = Math.abs(index - value);
        const opacity = Math.max(1 - distance * 0.2, 0);

        return (
          <motion.div
            key={index}
            className={cn(
              "text-left flex gap-2 mb-4 relative rounded-lg p-2 transition-all",
              index === value && "bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 dark:from-orange-500/20 dark:via-amber-500/20 dark:to-orange-500/20"
            )}
            initial={{ opacity: 0, y: -(value * 40) }}
            animate={{ opacity: opacity, y: -(value * 40) }}
            transition={{ duration: 0.5 }}
          >
            {/* Glow Effect for Active Step - Light Mode: Deep Blue + Green, Dark Mode: Neon Cyan + Pink */}
            {index === value && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none dark:hidden"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 200, 80, 0.4) 0%, rgba(255, 149, 0, 0.4) 50%, rgba(255, 200, 80, 0.4) 100%)",
                    boxShadow: "0 0 20px rgba(255, 200, 80, 0.5), 0 0 40px rgba(255, 149, 0, 0.4), 0 0 60px rgba(255, 200, 80, 0.3)",
                    filter: "blur(8px)",
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none hidden dark:block"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 200, 80, 0.4) 0%, rgba(255, 149, 0, 0.4) 50%, rgba(255, 200, 80, 0.4) 100%)",
                    boxShadow: "0 0 20px rgba(255, 200, 80, 0.5), 0 0 40px rgba(255, 149, 0, 0.4), 0 0 60px rgba(255, 200, 80, 0.3)",
                    filter: "blur(8px)",
                  }}
                />
              </>
            )}

            <div className="flex-shrink-0 relative z-10">
              {index > value && (
                <CheckIcon className="text-orange-600 dark:text-orange-400" />
              )}
              {index < value && (
                <CheckFilled className="text-orange-600 dark:text-orange-400" />
              )}
              {index === value && (
                <CheckFilled
                  className={cn(
                    "text-[#c67e15] dark:text-orange-400",
                    "opacity-100 animate-pulse"
                  )}
                />
              )}
            </div>
            <div className="flex-1 relative z-10">
              <span
                className={cn(
                  "font-bold text-sm md:text-base lg:text-lg",
                  index === value 
                    ? "text-[#c67e15] dark:text-orange-400" 
                    : "text-orange-600 dark:text-orange-400"
                )}
              >
                {loadingState.text}
              </span>
              {loadingState.description && (
                <p 
                  className={cn(
                    "text-xs md:text-sm mt-1",
                    index === value 
                      ? "text-gray-800 dark:text-gray-200" 
                      : "text-gray-600 dark:text-gray-400"
                  )}
                >
                  {loadingState.description}
                </p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export const MultiStepLoader = ({
  loadingStates,
  loading,
  duration = 2000,
  loop = true,
  value,
}: {
  loadingStates: LoadingState[];
  loading?: boolean;
  duration?: number;
  loop?: boolean;
  value?: number;
}) => {
  const [currentState, setCurrentState] = useState(value ?? 0);

  useEffect(() => {
    if (value !== undefined) {
      setCurrentState(value);
      return;
    }

    if (!loading) {
      setCurrentState(0);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentState((prevState) =>
        loop
          ? prevState === loadingStates.length - 1
            ? 0
            : prevState + 1
          : Math.min(prevState + 1, loadingStates.length - 1)
      );
    }, duration);

    return () => clearTimeout(timeout);
  }, [currentState, loading, loop, loadingStates.length, duration, value]);

  const displayValue = value !== undefined ? value : currentState;

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="w-full h-full fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl bg-black/30"
        >
          <div className="h-96 relative pointer-events-none">
            <div className="pointer-events-auto">
              <LoaderCore value={displayValue} loadingStates={loadingStates} />
            </div>
          </div>
          <div className="bg-gradient-to-t inset-x-0 z-20 bottom-0 bg-white dark:bg-black h-full absolute [mask-image:radial-gradient(900px_at_center,transparent_30%,white)] pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

