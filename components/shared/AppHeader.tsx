import { useAnimatedTheme } from "@/context/AnimatedThemeProvider";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
};

export default function AppHeader({ title, subtitle, showBack }: Props) {
  const insets = useSafeAreaInsets();
  const { theme } = useAnimatedTheme();
  const navigation = useNavigation<any>();

  return (
    <View style={{ backgroundColor: theme.colors.bg, paddingTop: insets.top }}>
      <View
        style={[
          styles.bar,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
        ]}
      >
        {/* Left: drawer or back */}
        <Pressable
          onPress={() => {
            if (showBack) router.back();
            else navigation.dispatch(DrawerActions.toggleDrawer());
          }}
          style={[styles.iconBtn, { backgroundColor: theme.colors.card2 }]}
          hitSlop={10}
        >
          <Text style={{ color: theme.colors.text, fontWeight: "900" }}>
            {showBack ? "‹" : "≡"}
          </Text>
        </Pressable>

        {/* Center: title */}
        <View style={{ flex: 1, paddingHorizontal: 12 }}>
          <Text
            style={[styles.title, { color: theme.colors.text }]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {!!subtitle && (
            <Text
              style={[styles.subtitle, { color: theme.colors.muted }]}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          )}
        </View>

        {/* Right: Support + Profile */}
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Pressable
            onPress={() => router.push("/(drawer)/support" as any)}
            style={[
              styles.supportBtn,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <Text
              style={[
                styles.supportText,
                { color: theme.dark ? "#0B0B10" : "#FFFFFF" },
              ]}
            >
              Support Us
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    marginHorizontal: 14,
    marginBottom: 10,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 15, fontWeight: "900", letterSpacing: -0.2 },
  subtitle: { fontSize: 12, marginTop: 2 },
  supportBtn: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  supportText: { fontSize: 13, fontWeight: "900" },
});
