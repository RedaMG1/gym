import React, { useMemo } from "react";
import { View, Text, Pressable, StyleSheet, FlatList, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";

const GOLD = "#D6B56A";
const MUTED = "rgba(255,255,255,0.65)";
const BG1 = "#071A2A";
const BG2 = "#061424";
const CARD_BG = "rgba(12, 35, 52, 0.75)";
const CARD_BORDER = "rgba(214,181,106,0.22)";

function prettyName(v?: string) {
  if (!v) return "";
  return v.replace(/-/g, " ").toUpperCase();
}

type Row = { id: string; title: string; gif?: any };

export default function ExercisePage() {
  const { group, exercise } = useLocalSearchParams<{ group?: string; exercise?: string }>();
  const title = prettyName(exercise);

  // ✅ Centralized GIF map (exact filenames)
  const chestGifs = useMemo(
    () =>
      ({
        "chest-fly": require("../../assets/gifs/chest/chest flys.gif"),
        "chest-dips": require("../../assets/gifs/chest/chest dips.gif"),
        "flat-bench-press": require("../../assets/gifs/chest/flat Bench Press.gif"),
        "incline-bench-press": require("../../assets/gifs/chest/incline Bench Press.gif"),
        "decline-bench-press": require("../../assets/gifs/chest/decline Bench Press.gif"),
        "flat-dumbbell-press": require("../../assets/gifs/chest/flat Dumbbell Press.gif"),
        "incline-dumbbell-press": require("../../assets/gifs/chest/incline Dumbbell Press.gif"),
      }) as Record<string, any>,
    []
  );

  const shoulderGifs = useMemo(
    () =>
      ({
        "dumbbell-shoulder-press": require("../../assets/gifs/shoulders/dumbbell Shoulder Press.gif"),
        "machine-shoulder-press": require("../../assets/gifs/shoulders/machine Shoulder Press.gif"),
        "dumbbell-lateral-raise": require("../../assets/gifs/shoulders/dumbbell lateral Raise.gif"),
        // ✅ THIS is the one you’re missing in UI:
        "cable-lateral-raise": require("../../assets/gifs/shoulders/cable Lateral Raise.gif"),
        "reverse-pec-deck-fly": require("../../assets/gifs/shoulders/reverse Pec Deck Fly.gif"),
      }) as Record<string, any>,
    []
  );

  const rows: Row[] = useMemo(() => {
    const g = (group ?? "").toLowerCase();

    if (g === "chest") {
      switch (exercise) {
        case "bench-press":
          return [
            { id: "flat-bench-press", title: "FLAT BENCH PRESS", gif: chestGifs["flat-bench-press"] },
            { id: "incline-bench-press", title: "INCLINE BENCH PRESS", gif: chestGifs["incline-bench-press"] },
            { id: "decline-bench-press", title: "DECLINE BENCH PRESS", gif: chestGifs["decline-bench-press"] },
          ];
        case "dumbbell-press":
          return [
            { id: "flat-dumbbell-press", title: "FLAT DUMBBELL PRESS", gif: chestGifs["flat-dumbbell-press"] },
            { id: "incline-dumbbell-press", title: "INCLINE DUMBBELL PRESS", gif: chestGifs["incline-dumbbell-press"] },
          ];
        case "chest-fly":
          return [{ id: "chest-fly", title: "CHEST FLY", gif: chestGifs["chest-fly"] }];
        case "chest-dips":
          return [{ id: "chest-dips", title: "CHEST DIPS", gif: chestGifs["chest-dips"] }];
        default:
          return [];
      }
    }

    if (g === "shoulders") {
      switch (exercise) {
        case "shoulder-press":
          return [
            {
              id: "dumbbell-shoulder-press",
              title: "DUMBBELL SHOULDER PRESS",
              gif: shoulderGifs["dumbbell-shoulder-press"],
            },
            {
              id: "machine-shoulder-press",
              title: "MACHINE SHOULDER PRESS",
              gif: shoulderGifs["machine-shoulder-press"],
            },
          ];

        case "lateral-raise":
          return [
            {
              id: "dumbbell-lateral-raise",
              title: "DUMBBELL LATERAL RAISE",
              gif: shoulderGifs["dumbbell-lateral-raise"],
            },
            {
              id: "cable-lateral-raise",
              title: "CABLE LATERAL RAISE",
              gif: shoulderGifs["cable-lateral-raise"],
            },
          ];

        case "rear-delt-fly":
          return [
            {
              id: "reverse-pec-deck-fly",
              title: "REVERSE PEC DECK FLY",
              gif: shoulderGifs["reverse-pec-deck-fly"],
            },
          ];
        default:
          return [];
      }
    }

    return [];
  }, [group, exercise, chestGifs, shoulderGifs]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <LinearGradient
        colors={[BG1, BG2, "#050E18"]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={styles.container}
      >
        <View style={styles.topNav}>
          <Pressable
            onPress={() =>
              router.replace({
                pathname: "/workouts-group",
                params: { group: group ?? "" },
              })
            }
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={20} color={GOLD} />
          </Pressable>

          <View style={styles.navCenter}>
            <Text style={styles.navTitle}>{title}</Text>
            <Text style={styles.navSub}>SELECT A VARIATION</Text>
          </View>

          <View style={{ width: 40 }} />
        </View>

        <FlatList
          data={rows}
          keyExtractor={(i) => i.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/tracker",
                  params: { group: group ?? "", exercise: exercise ?? "", variant: item.id, title: item.title },
                })
              }
              style={({ pressed }) => [
                styles.row,
                pressed && { transform: [{ scale: 0.99 }], opacity: 0.96 },
              ]}
            >
              <View style={styles.rowLeft}>
                <View style={styles.thumb}>
                  {item.gif ? (
                    <Image source={item.gif} style={styles.thumbImg} resizeMode="cover" />
                  ) : (
                    <Ionicons name="image-outline" size={18} color={GOLD} />
                  )}
                </View>

                <Text style={styles.rowTitle}>{item.title}</Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color={GOLD} />
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

  list: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 12,
  },

  row: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },

  thumb: {
    width: 44,
    height: 44,
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: CARD_BORDER,
    backgroundColor: "rgba(0,0,0,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbImg: { width: "100%", height: "100%" },

  rowTitle: {
    fontSize: 13,
    letterSpacing: 1.4,
    fontWeight: "900",
    color: "#fff",
  },
});