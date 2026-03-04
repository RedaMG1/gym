import React from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";

const GOLD = "#D6B56A";
const MUTED = "rgba(255,255,255,0.65)";
const BG1 = "#071A2A";
const BG2 = "#061424";
const CARD_BG = "rgba(12, 35, 52, 0.75)";
const CARD_BORDER = "rgba(214,181,106,0.22)";

const MUSCLES = [
  { key: "chest", label: "CHEST", icon: "body-outline" as const },
  { key: "back", label: "BACK", icon: "shield-outline" as const },
  { key: "biceps", label: "BICEPS", icon: "fitness-outline" as const },
  { key: "triceps", label: "TRICEPS", icon: "flash-outline" as const },
  { key: "shoulders", label: "SHOULDERS", icon: "sparkles-outline" as const },
  { key: "legs", label: "LEGS", icon: "walk-outline" as const },
];

export default function WorkoutsIndex() {
  return (
    <>
      {/* hide default white header */}
      <Stack.Screen options={{ headerShown: false }} />

      <LinearGradient
        colors={[BG1, BG2, "#050E18"]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={styles.container}
      >
        {/* themed top area */}
        <View style={styles.topNav}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color={GOLD} />
          </Pressable>

          <View style={styles.navCenter}>
            <Text style={styles.navTitle}>WORKOUTS</Text>
            <Text style={styles.navSub}>Choose a muscle group</Text>
          </View>

          <View style={{ width: 40 }} />
        </View>

        <FlatList
          data={MUSCLES}
          keyExtractor={(item) => item.key}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={styles.content}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/workouts/[group]",
                  params: { group: item.key },
                })
              }
              style={({ pressed }) => [
                styles.card,
                pressed && { transform: [{ scale: 0.99 }], opacity: 0.96 },
              ]}
            >
              <View style={styles.cardTop}>
                <View style={styles.sigil}>
                  <Ionicons name={item.icon} size={22} color={GOLD} />
                </View>
                <Ionicons name="chevron-forward" size={18} color={GOLD} />
              </View>

              <Text style={styles.cardTitle}>{item.label}</Text>
              <Text style={styles.cardHint}>Tap to view exercises</Text>
            </Pressable>
          )}
        />
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

  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },

  card: {
    flex: 1,
    minHeight: 130,
    borderRadius: 18,
    padding: 14,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sigil: {
    width: 42,
    height: 42,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    backgroundColor: "rgba(0,0,0,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    marginTop: 14,
    fontSize: 14,
    letterSpacing: 1.6,
    fontWeight: "900",
    color: "#fff",
  },
  cardHint: {
    marginTop: 6,
    fontSize: 11,
    color: MUTED,
    fontWeight: "600",
  },
});