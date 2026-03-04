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
  if (!v) return "WORKOUT";
  return v.replace(/-/g, " ").toUpperCase();
}

type Block = {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  thumb?: any; // gif thumbnail on the right
};

export default function WorkoutsGroup() {
  const { group } = useLocalSearchParams<{ group?: string }>();
  const title = prettyName(group);

  const blocks: Block[] = useMemo(() => {
    if ((group ?? "").toLowerCase() === "chest") {
      return [
        {
          id: "bench-press",
          title: "BENCH PRESS",
          subtitle: "Flat • Incline • Decline",
          icon: "barbell-outline",
          // use one of the variations as the thumbnail
          thumb: require("../../assets/gifs/chest/flat Bench Press.gif"),
        },
        {
          id: "dumbbell-press",
          title: "DUMBBELL PRESS",
          subtitle: "Flat • Incline",
          icon: "fitness-outline",
          thumb: require("../../assets/gifs/chest/flat Dumbbell Press.gif"),
        },
        {
          id: "chest-fly",
          title: "CHEST FLY",
          subtitle: "Isolation movement",
          icon: "swap-horizontal-outline",
          thumb: require("../../assets/gifs/chest/chest flys.gif"),
        },
        {
          id: "chest-dips",
          title: "CHEST DIPS",
          subtitle: "Bodyweight strength",
          icon: "body-outline",
          thumb: require("../../assets/gifs/chest/chest dips.gif"),
        },
      ];
    }

    return [
      {
        id: "coming-soon",
        title: "COMING SOON",
        subtitle: "Add exercises for this group",
        icon: "sparkles-outline",
      },
    ];
  }, [group]);

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
          <Pressable onPress={() => router.replace("/workouts")} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color={GOLD} />
          </Pressable>

          <View style={styles.navCenter}>
            <Text style={styles.navTitle}>{title}</Text>
            <Text style={styles.navSub}>CHOOSE AN EXERCISE</Text>
          </View>

          <View style={{ width: 40 }} />
        </View>

        <FlatList
          data={blocks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/exercise",
                  params: { group: group ?? "", exercise: item.id },
                })
              }
              style={({ pressed }) => [
                styles.row,
                pressed && { transform: [{ scale: 0.99 }], opacity: 0.96 },
              ]}
            >
              <View style={styles.rowLeft}>
                <View style={styles.sigil}>
                  <Ionicons name={item.icon} size={22} color={GOLD} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.rowTitle}>{item.title}</Text>
                  <Text style={styles.rowSub}>{item.subtitle}</Text>
                </View>
              </View>

              {/* RIGHT SIDE: small gif thumbnail + chevron */}
              <View style={styles.right}>
                {item.thumb ? (
                  <View style={styles.thumbWrap}>
                    <Image source={item.thumb} style={styles.thumbImg} resizeMode="cover" />
                  </View>
                ) : (
                  <View style={styles.thumbWrap} />
                )}

                <Ionicons name="chevron-forward" size={20} color={GOLD} />
              </View>
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
    paddingVertical: 16,
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

  sigil: {
    width: 44,
    height: 44,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    backgroundColor: "rgba(0,0,0,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },

  rowTitle: {
    fontSize: 14,
    letterSpacing: 1.6,
    fontWeight: "900",
    color: "#fff",
  },
  rowSub: {
    marginTop: 4,
    fontSize: 11,
    color: MUTED,
    fontWeight: "600",
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 12,
  },

  // This is the red-square area (thumbnail)
  thumbWrap: {
    width: 56,
    height: 40,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(214,181,106,0.20)",
    backgroundColor: "rgba(0,0,0,0.20)",
  },
  thumbImg: {
    width: "100%",
    height: "100%",
  },
});