"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ChristmasContextType {
  isChristmasActive: boolean;
  setIsChristmasActive: (active: boolean) => void;
}

const ChristmasContext = createContext<ChristmasContextType | undefined>(undefined);

export function ChristmasProvider({ children }: { children: ReactNode }) {
  const [isChristmasActive, setIsChristmasActive] = useState(false);

  return (
    <ChristmasContext.Provider value={{ isChristmasActive, setIsChristmasActive }}>
      {children}
    </ChristmasContext.Provider>
  );
}

export function useChristmas() {
  const context = useContext(ChristmasContext);
  if (context === undefined) {
    throw new Error("useChristmas must be used within a ChristmasProvider");
  }
  return context;
}

