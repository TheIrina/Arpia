"use client";

import React, { createContext, useContext } from "react";
import Lenis from "lenis";

interface LenisContextType {
  lenisRef: React.MutableRefObject<Lenis | null>;
}

const LenisContext = createContext<LenisContextType>({
  lenisRef: { current: null },
});

export const useLenis = () => useContext(LenisContext);

export const LenisContextProvider = ({ children, lenisRef }: { children: React.ReactNode; lenisRef: React.MutableRefObject<Lenis | null> }) => {
  return (
    <LenisContext.Provider value={{ lenisRef }}>
      {children}
    </LenisContext.Provider>
  );
};
