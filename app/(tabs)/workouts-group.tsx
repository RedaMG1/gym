import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";

const GOLD = "#D6B56A";
const BG1 = "#071A2A";
const BG2 = "#061424";

function prettyName(v?: string) {
  if (!v) return "WORKOUT";
  return v.replace(/-/g, " ").toUpperCase();
}

export default function WorkoutsGroup() {
  const { group } = useLocalSearchParams<{ group?: string }>();
  const title = prettyName(group);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <LinearGradient
        colors={[BG1, BG2, "#050E18"]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={styles.container}
      >
        {/* Top navigation */}
        <View style={styles.topNav}>
          {/* ALWAYS go to Workouts tab */}
          <Pressable onPress={() => router.replace("/workouts")} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color={GOLD} />
          </Pressable>

          <View style={styles.navCenter}>
            <Text style={styles.navTitle}>{title}</Text>
            <Text style={styles.navSub}>EXERCISES</Text>
          </View>

          <View style={{ width: 40 }} />
        </View>

        {/* Content */}
        <View style={styles.body}>
          <Text style={styles.big}>{title}</Text>
          <Text style={styles.small}>
            Next step: add exercises + sets/reps tracker here.
          </Text>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  topNav: {
    paddingTop: 44,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(214,181,106,0.25)",
    backgroundColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  navCenter: { alignItems: "center", gap: 4 },
  navTitle: {
    fontSize: 14,
    letterSpacing: 2,
    fontWeight: "900",
    color: "rgba(255,255,255,0.85)",
  },
  navSub: {
    fontSize: 11,
    letterSpacing: 1,
    color: "rgba(214,181,106,0.65)",
    textTransform: "uppercase",
  },

  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  big: {
    fontSize: 20,
    letterSpacing: 2,
    fontWeight: "900",
    color: "rgba(255,255,255,0.9)",
  },
  small: {
    marginTop: 10,
    textAlign: "center",
    color: "rgba(255,255,255,0.55)",
    fontWeight: "600",
  },
});