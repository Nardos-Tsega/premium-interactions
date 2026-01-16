import { darkTheme, lightTheme } from "@/theme/tokens";
import React, { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme, useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export type ThemeMode = "system" | "light" | "dark";

type ThemeColors = typeof lightTheme.colors;

type Ctx = {
  mode: ThemeMode;
  // Use this instead of setMode for animated transitions:
  setModeAnimated: (m: ThemeMode) => void;

  // Current resolved theme (non-animated, for logic)
  theme: { dark: boolean; colors: ThemeColors };

  // Animated color values for styles
  aBg: Animated.SharedValue<string>;
  aCard: Animated.SharedValue<string>;
  aCard2: Animated.SharedValue<string>;
  aText: Animated.SharedValue<string>;
  aMuted: Animated.SharedValue<string>;
  aBorder: Animated.SharedValue<string>;
  aDrawerActive: Animated.SharedValue<string>;

  // Slide reveal progress (0 → 1)
  slideX: Animated.SharedValue<number>;
};

const ThemeCtx = createContext<Ctx | null>(null);

function resolveTheme(mode: ThemeMode, system: "light" | "dark" | null) {
  const resolved =
    mode === "system" ? (system === "dark" ? "dark" : "light") : mode;
  return resolved === "dark" ? darkTheme : lightTheme;
}

export function AnimatedThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const system = useColorScheme(); // "light" | "dark" | null
  const { width } = useWindowDimensions();

  const [mode, setMode] = useState<ThemeMode>("system");

  // We keep “from” and “to” themes so we can animate between them.
  const [fromTheme, setFromTheme] = useState(() =>
    resolveTheme("system", system)
  );
  const [toTheme, setToTheme] = useState(() => resolveTheme("system", system));

  // progress drives color interpolation like sunrise/sunset
  const t = useSharedValue(1); // start at “toTheme” fully
  const slideX = useSharedValue(0); // slide reveal position

  // Derived animated colors
  const aBg = useDerivedValue(
    () =>
      interpolateColor(
        t.value,
        [0, 1],
        [fromTheme.colors.bg, toTheme.colors.bg]
      ) as string
  );
  const aCard = useDerivedValue(
    () =>
      interpolateColor(
        t.value,
        [0, 1],
        [fromTheme.colors.card, toTheme.colors.card]
      ) as string
  );
  const aCard2 = useDerivedValue(
    () =>
      interpolateColor(
        t.value,
        [0, 1],
        [fromTheme.colors.card2, toTheme.colors.card2]
      ) as string
  );
  const aText = useDerivedValue(
    () =>
      interpolateColor(
        t.value,
        [0, 1],
        [fromTheme.colors.text, toTheme.colors.text]
      ) as string
  );
  const aMuted = useDerivedValue(
    () =>
      interpolateColor(
        t.value,
        [0, 1],
        [fromTheme.colors.muted, toTheme.colors.muted]
      ) as string
  );
  const aBorder = useDerivedValue(
    () =>
      interpolateColor(
        t.value,
        [0, 1],
        [fromTheme.colors.border, toTheme.colors.border]
      ) as string
  );
  const aDrawerActive = useDerivedValue(
    () =>
      interpolateColor(
        t.value,
        [0, 1],
        [fromTheme.colors.drawerActive, toTheme.colors.drawerActive]
      ) as string
  );

  const theme = useMemo(() => resolveTheme(mode, system), [mode, system]);

  // If system changes while in system mode, animate too.
  React.useEffect(() => {
    if (mode !== "system") return;
    const next = resolveTheme("system", system);
    // animate from current to next smoothly
    setFromTheme(toTheme);
    setToTheme(next);
    t.value = 0;
    slideX.value = -width * 0.15; // small slide, subtle
    t.value = withTiming(1, {
      duration: 650,
      easing: Easing.inOut(Easing.quad),
    });
    slideX.value = withTiming(0, {
      duration: 650,
      easing: Easing.out(Easing.quad),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [system]);

  const setModeAnimated = (nextMode: ThemeMode) => {
    // Figure out target theme
    const nextTheme = resolveTheme(nextMode, system);

    // Set up from/to for interpolation
    setFromTheme(toTheme);
    setToTheme(nextTheme);

    // Reset animation state
    t.value = 0;

    // Slide direction: light→dark slide in from right, dark→light slide in from left
    const goingDark = nextTheme.dark;
    slideX.value = goingDark ? width : -width;

    // Animate: sunrise/sunset + sliding reveal
    t.value = withTiming(
      1,
      { duration: 900, easing: Easing.inOut(Easing.cubic) },
      (finished) => {
        if (finished) runOnJS(setMode)(nextMode);
      }
    );

    slideX.value = withTiming(0, {
      duration: 900,
      easing: Easing.inOut(Easing.cubic),
    });
  };

  const value = useMemo(
    () => ({
      mode,
      setModeAnimated,
      theme,
      aBg,
      aCard,
      aCard2,
      aText,
      aMuted,
      aBorder,
      aDrawerActive,
      slideX,
    }),
    [
      mode,
      theme,
      aBg,
      aCard,
      aCard2,
      aText,
      aMuted,
      aBorder,
      aDrawerActive,
      slideX,
    ]
  );

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useAnimatedTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx)
    throw new Error(
      "useAnimatedTheme must be used inside AnimatedThemeProvider"
    );
  return ctx;
}
