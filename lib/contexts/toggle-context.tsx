"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ToggleContextType {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

export function ToggleProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <ToggleContext.Provider value={{ isActive, setIsActive }}>
      {children}
    </ToggleContext.Provider>
  );
}

export function useToggle() {
  const context = useContext(ToggleContext);
  if (context === undefined) {
    throw new Error("useToggle must be used within a ToggleProvider");
  }
  return context;
}

