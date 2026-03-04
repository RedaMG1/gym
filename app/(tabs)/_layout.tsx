import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const GOLD = "#D6B56A";
const MUTED = "rgba(255,255,255,0.55)";
const NAV_BG = "rgba(6, 20, 36, 0.92)";
const NAV_BORDER = "rgba(214,181,106,0.18)";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: GOLD,
        tabBarInactiveTintColor: MUTED,
        tabBarStyle: {
          backgroundColor: NAV_BG,
          borderTopColor: NAV_BORDER,
          borderTopWidth: 1,
          height: 78,
          paddingTop: 10,
          paddingBottom: 14,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          letterSpacing: 1,
          fontWeight: "700",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size ?? 22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="workouts"
        options={{
          title: "Workouts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="barbell" size={size ?? 22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size ?? 22} color={color} />
          ),
        }}
      />

      {/* hide anything you don't want */}
      <Tabs.Screen name="explore" options={{ href: null }} />
      <Tabs.Screen name="workouts-group" options={{ href: null }} />
    </Tabs>
  );
}