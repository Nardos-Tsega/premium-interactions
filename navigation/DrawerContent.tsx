import type { ThemeMode } from "@/context/AnimatedThemeProvider"; // <-- use this, not ThemeProvider
import { useAnimatedTheme } from "@/context/AnimatedThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const items = [
  {
    key: "onboarding",
    title: "Onboarding",
    sub: "First-run experience",
    count: 3,
  },
  {
    key: "navigation",
    title: "Navigation & Transitions",
    sub: "Stacks, shared motion",
    count: 2,
  },
  {
    key: "sheets",
    title: "Bottom Sheets & Modals",
    sub: "Snap points, sheets",
    count: 4,
  },
  {
    key: "gestures",
    title: "Gestures",
    sub: "Swipe, reorder, cards",
    count: 4,
  },
  {
    key: "lists",
    title: "Lists & Feeds",
    sub: "Smooth scrolling UX",
    count: 3,
  },
  {
    key: "forms",
    title: "Forms & Inputs",
    sub: "Keyboard, validation",
    count: 3,
  },
  { key: "maps", title: "Maps", sub: "Pins, callouts, sheets", count: 2 },
  {
    key: "time",
    title: "Time & Calendar",
    sub: "Date pickers, agenda",
    count: 2,
  },
  { key: "i18n", title: "Localization", sub: "i18n + RTL ready", count: 1 },
  {
    key: "settings",
    title: "Settings & Theming",
    sub: "Theme & preferences",
    count: 1,
  },
];

export default function DrawerContent(props: any) {
  const {
    theme,
    mode,
    setModeAnimated,
    aBg,
    aCard,
    aCard2,
    aText,
    aMuted,
    aBorder,
    aDrawerActive,
  } = useAnimatedTheme();

  const pathname = usePathname();
  const activeKey = (pathname?.split("/")?.[1] || "onboarding").toLowerCase();

  const go = (key: string) => {
    props.navigation.closeDrawer?.();
    router.push(`/(drawer)/${key}` as any);
  };

  // Animated container background (real fade)
  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: aBg.value,
  }));

  // Header card (real fade)
  const headerStyle = useAnimatedStyle(() => ({
    backgroundColor: aCard.value,
    borderColor: aBorder.value,
  }));

  const titleStyle = useAnimatedStyle(() => ({ color: aText.value }));
  const subStyle = useAnimatedStyle(() => ({ color: aMuted.value }));
  const sectionLabelStyle = useAnimatedStyle(() => ({ color: aMuted.value }));

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.scroll}>
      <Animated.View style={[styles.container, containerStyle]}>
        {/* Header card */}
        <Animated.View style={[styles.header, headerStyle]}>
          <Animated.Text style={[styles.hTitle, titleStyle]}>
            Premium UX Lab
          </Animated.Text>

          <Animated.Text style={[styles.hSub, subStyle]}>
            A gallery of polished interactions with premium feel.
          </Animated.Text>

          {/* Sliding segmented theme switch */}
          <ThemeSegment mode={mode} onChange={setModeAnimated} />
        </Animated.View>

        <Animated.Text style={[styles.sectionLabel, sectionLabelStyle]}>
          INTERACTIONS
        </Animated.Text>

        <View style={{ gap: 6 }}>
          {items.map((it) => {
            const active = it.key === activeKey;

            const rowStyle = useAnimatedStyle(() => ({
              borderColor: aBorder.value,
              backgroundColor: active ? aDrawerActive.value : "transparent",
            }));

            const rowTitleStyle = useAnimatedStyle(() => ({
              color: aText.value,
            }));
            const rowSubStyle = useAnimatedStyle(() => ({
              color: aMuted.value,
            }));
            const badgeStyle = useAnimatedStyle(() => ({
              backgroundColor: aCard2.value,
            }));
            const badgeTextStyle = useAnimatedStyle(() => ({
              color: aMuted.value,
            }));

            return (
              <Pressable
                key={it.key}
                onPress={() => go(it.key)}
                style={styles.pressable}
              >
                <Animated.View style={[styles.row, rowStyle]}>
                  <View style={{ flex: 1 }}>
                    <Animated.Text style={[styles.rowTitle, rowTitleStyle]}>
                      {it.title}
                    </Animated.Text>
                    <Animated.Text style={[styles.rowSub, rowSubStyle]}>
                      {it.sub}
                    </Animated.Text>
                  </View>

                  <Animated.View style={[styles.badge, badgeStyle]}>
                    <Animated.Text style={[styles.badgeText, badgeTextStyle]}>
                      {it.count}
                    </Animated.Text>
                  </Animated.View>
                </Animated.View>
              </Pressable>
            );
          })}
        </View>
      </Animated.View>
    </DrawerContentScrollView>
  );
}

function ThemeSegment({
  mode,
  onChange,
}: {
  mode: ThemeMode;
  onChange: (m: ThemeMode) => void;
}) {
  const { aCard, aBorder, aDrawerActive, theme } = useAnimatedTheme();

  const options = useMemo(
    () =>
      [
        { key: "system" as const, icon: "phone-portrait-outline" },
        { key: "light" as const, icon: "sunny-outline" },
        { key: "dark" as const, icon: "moon-outline" },
      ] as const,
    []
  );

  const activeIndex = options.findIndex((o) => o.key === mode);

  // Shared values only (no React state)
  const segW = useSharedValue(0);
  const x = useSharedValue(0);

  // Keep slider synced if mode changes from elsewhere
  React.useEffect(() => {
    if (!segW.value) return;
    // Use a snappy spring instead of slow timing
    x.value = withTiming(activeIndex * segW.value, {
      duration: 220,
      easing: Easing.out(Easing.cubic),
    });
  }, [activeIndex]);

  const segmentStyle = useAnimatedStyle(() => ({
    backgroundColor: aCard.value,
    borderColor: aBorder.value,
  }));

  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
    backgroundColor: aDrawerActive.value,
    width: segW.value - 12, // 👈 important: pill width is EXACT segment width
  }));

  return (
    <Animated.View
      style={[styles.segment, segmentStyle]}
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        // each segment width
        segW.value = w / options.length;
        // snap immediately to correct position (no animation on first layout)
        x.value = activeIndex * segW.value;
      }}
    >
      {/* Sliding pill */}
      <Animated.View style={[styles.segmentPill, pillStyle]} />

      {/* Buttons */}
      {options.map((opt, idx) => {
        const isActive = idx === activeIndex;

        return (
          <Pressable
            key={opt.key}
            onPress={() => {
              // Move slider immediately (feels instant), then trigger theme animation
              if (segW.value) {
                x.value = withTiming(idx * segW.value, {
                  duration: 220,
                  easing: Easing.out(Easing.cubic),
                });
              }
              onChange(opt.key);
            }}
            style={styles.segmentItem}
            hitSlop={8}
          >
            <Ionicons
              name={opt.icon as any}
              size={18}
              color={isActive ? theme.colors.text : theme.colors.muted}
            />
          </Pressable>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1 },
  container: { flexGrow: 1 },

  header: {
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    marginBottom: 14,
  },
  hTitle: { fontSize: 18, fontWeight: "900", letterSpacing: -0.3 },
  hSub: { fontSize: 13, marginTop: 6, lineHeight: 18, marginBottom: 12 },

  sectionLabel: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.2,
    marginTop: 8,
    marginBottom: 8,
  },

  pressable: { borderRadius: 16 },

  row: {
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowTitle: { fontSize: 14, fontWeight: "900" },
  rowSub: { fontSize: 12, marginTop: 2 },

  badge: {
    minWidth: 32,
    height: 28,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  badgeText: { fontWeight: "900" },

  segment: {
    borderRadius: 18,
    padding: 6,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    position: "relative",
    overflow: "hidden",
  },
  segmentPill: {
    position: "absolute",
    top: 6,
    bottom: 6,
    left: 6,
    borderRadius: 14,
  },
  segmentItem: {
    flex: 1,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});
