import { AppTheme, darkTheme, lightTheme } from "@/theme/tokens";
import React, { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

export type ThemeMode = "system" | "light" | "dark";

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  theme: AppTheme;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme(); // "light" | "dark" | null
  const [mode, setMode] = useState<ThemeMode>("system");

  const theme = useMemo(() => {
    const resolved =
      mode === "system" ? (system === "dark" ? "dark" : "light") : mode;
    return resolved === "dark" ? darkTheme : lightTheme;
  }, [mode, system]);

  const value = useMemo(() => ({ mode, setMode, theme }), [mode, theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useAppTheme must be used inside ThemeProvider");
  return ctx;
}
