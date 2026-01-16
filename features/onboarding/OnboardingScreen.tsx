import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { slides } from "./slides";

function clamp(n: number, min: number, max: number) {
  "worklet";
  return Math.max(min, Math.min(n, max));
}

export default function OnboardingScreen({ onDone }: { onDone?: () => void }) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const listRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  const isLast = index === slides.length - 1;

  const viewabilityConfig = useMemo(
    () => ({
      itemVisiblePercentThreshold: 60,
    }),
    []
  );

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (!viewableItems?.length) return;
    const nextIndex = viewableItems[0].index ?? 0;
    setIndex(nextIndex);
  }).current;

  const handleNext = () => {
    const next = clamp(index + 1, 0, slides.length - 1);
    listRef.current?.scrollToIndex({ index: next, animated: true });
  };

  const handleSkip = () => {
    listRef.current?.scrollToIndex({
      index: slides.length - 1,
      animated: true,
    });
  };

  const handleDone = () => {
    onDone?.();
    // later: navigate to auth/home
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.brand}>ConceptOS</Text>
        {!isLast ? (
          <Pressable onPress={handleSkip} hitSlop={10}>
            <Text style={styles.skip}>Skip</Text>
          </Pressable>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>

      {/* Slides */}
      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={styles.artwork}>
              <Text style={styles.artworkText}>{item.artwork}</Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, i) => ({
          length: width,
          offset: width * i,
          index: i,
        })}
      />

      {/* Bottom controls */}
      <View
        style={[styles.bottom, { paddingBottom: Math.max(insets.bottom, 12) }]}
      >
        <Dots count={slides.length} activeIndex={index} />

        <View style={styles.actions}>
          {!isLast ? (
            <Pressable
              style={[styles.button, styles.primary]}
              onPress={handleNext}
            >
              <Text style={[styles.buttonText, styles.primaryText]}>Next</Text>
            </Pressable>
          ) : (
            <Pressable
              style={[styles.button, styles.primary]}
              onPress={handleDone}
            >
              <Text style={[styles.buttonText, styles.primaryText]}>
                Get Started
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

function Dots({ count, activeIndex }: { count: number; activeIndex: number }) {
  return (
    <View style={styles.dots}>
      {Array.from({ length: count }).map((_, i) => {
        const active = i === activeIndex;
        return (
          <View key={i} style={[styles.dot, active && styles.dotActive]} />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B0B10" },
  topBar: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: { color: "white", fontSize: 16, fontWeight: "700" },
  skip: { color: "rgba(255,255,255,0.75)", fontSize: 14, fontWeight: "600" },

  slide: {
    paddingHorizontal: 22,
    justifyContent: "center",
    gap: 14,
  },
  artwork: {
    height: 180,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  artworkText: { fontSize: 56 },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  subtitle: { color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 22 },

  bottom: {
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  dots: { flexDirection: "row", gap: 8, alignSelf: "center", marginBottom: 12 },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  dotActive: { width: 18, backgroundColor: "white" },

  actions: { gap: 10 },
  button: {
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: { backgroundColor: "white" },
  buttonText: { fontSize: 15, fontWeight: "800" },
  primaryText: { color: "#0B0B10" },
});
