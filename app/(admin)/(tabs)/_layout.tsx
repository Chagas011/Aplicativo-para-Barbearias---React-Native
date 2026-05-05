import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function AdminTabsLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard ADMIN",
          tabBarIcon: () => (
            <Ionicons name="cut" size={24} color={"hsl(210 100% 55%)"} />
          ),
        }}
      />
    </Tabs>
  );
}
