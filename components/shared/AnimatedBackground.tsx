import { useAnimatedTheme } from "@/context/AnimatedThemeProvider";
import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

export default function AnimatedBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  const { aBg, slideX } = useAnimatedTheme();
  const { width } = useWindowDimensions();

  // Base background (interpolated)
  const baseStyle = useAnimatedStyle(() => ({
    backgroundColor: aBg.value,
  }));

  // Sliding “reveal” overlay for extra premium feel
  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value }],
    width,
  }));

  return (
    <Animated.View style={[styles.fill, baseStyle]}>
      {/* overlay that slides across */}
      <Animated.View style={[styles.overlay, slideStyle]} />
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.22, // subtle. Increase to 0.35 if you want more dramatic.
    backgroundColor: "white", // acts like “morning light”; on dark it feels like dawn
  },
});
