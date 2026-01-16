import {
  AnimatedThemeProvider,
  useAnimatedTheme,
} from "@/context/AnimatedThemeProvider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";

function NavThemeBridge({ children }: { children: React.ReactNode }) {
  const { theme } = useAnimatedTheme();
  const base = theme.dark ? DarkTheme : DefaultTheme;

  // Keep fonts intact by extending base theme
  const navTheme = {
    ...base,
    colors: {
      ...base.colors,
      background: theme.colors.bg,
      card: theme.colors.card,
      text: theme.colors.text,
      border: theme.colors.border,
      primary: theme.colors.primary,
      notification: theme.colors.primary,
    },
  };

  return <NavThemeProvider value={navTheme}>{children}</NavThemeProvider>;
}

export default function RootLayout() {
  return (
    <AnimatedThemeProvider>
      <NavThemeBridge>
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </NavThemeBridge>
    </AnimatedThemeProvider>
  );
}
