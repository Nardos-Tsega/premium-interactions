import AnimatedBackground from "@/components/shared/AnimatedBackground";
import AppHeader from "@/components/shared/AppHeader";
import { useAnimatedTheme } from "@/context/AnimatedThemeProvider";
import DrawerContent from "@/navigation/DrawerContent";
import { Drawer } from "expo-router/drawer";
import React from "react";

export default function DrawerLayout() {
  const { theme } = useAnimatedTheme();

  return (
    <AnimatedBackground>
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          header: ({ route }) => (
            <AppHeader
              title={route.name
                .replace(/^\w/, (c) => c.toUpperCase())
                .replace("-", " ")}
              subtitle="Premium interactions catalog"
            />
          ),
          drawerStyle: { backgroundColor: theme.colors.bg },
          drawerType: "front",
          swipeEdgeWidth: 40,
        }}
      >
        <Drawer.Screen name="onboarding" options={{ title: "Onboarding" }} />
        <Drawer.Screen
          name="navigation"
          options={{ title: "Navigation & Transitions" }}
        />
        <Drawer.Screen
          name="sheets"
          options={{ title: "Bottom Sheets & Modals" }}
        />
        <Drawer.Screen name="gestures" options={{ title: "Gestures" }} />
        <Drawer.Screen name="lists" options={{ title: "Lists & Feeds" }} />
        <Drawer.Screen name="forms" options={{ title: "Forms & Inputs" }} />
        <Drawer.Screen name="maps" options={{ title: "Maps" }} />
        <Drawer.Screen name="time" options={{ title: "Time & Calendar" }} />
        <Drawer.Screen name="i18n" options={{ title: "Localization" }} />
        <Drawer.Screen
          name="settings"
          options={{ title: "Settings & Theming" }}
        />
        {/* Add these two routes */}
        <Drawer.Screen name="support" options={{ title: "Support" }} />
        <Drawer.Screen name="account" options={{ title: "Account" }} />
      </Drawer>
    </AnimatedBackground>
  );
}
