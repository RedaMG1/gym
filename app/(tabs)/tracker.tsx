import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet, Image, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { getLatestExerciseWeight, saveExerciseWeight } from "@/lib/db";

const GOLD = "#D6B56A";
const BG1 = "#071A2A";
const BG2 = "#061424";
const CARD_BG = "rgba(12, 35, 52, 0.55)";
const CARD_BORDER = "rgba(214,181,106,0.22)";
const MUTED = "rgba(255,255,255,0.65)";

function prettyName(v?: string) {
  if (!v) return "";
  return v.replace(/-/g, " ").toUpperCase();
}

export default function Tracker() {
  const { group, exercise, variant, title } = useLocalSearchParams<{
    group?: string;
    exercise?: string;
    variant?: string;
    title?: string;
  }>();

  const g = String(group ?? "");
  const ex = String(exercise ?? "");
  const v = String(variant ?? "");

  const displayTitle = title ? String(title).toUpperCase() : prettyName(variant);

  const media = useMemo(() => {
    if (!variant) return undefined;
    const gg = (group ?? "").toLowerCase();

    const chest: Record<string, any> = {
      "flat-bench-press": require("../../assets/gifs/chest/flat Bench Press.gif"),
      "incline-bench-press": require("../../assets/gifs/chest/incline Bench Press.gif"),
      "decline-bench-press": require("../../assets/gifs/chest/decline Bench Press.gif"),
      "flat-dumbbell-press": require("../../assets/gifs/chest/flat Dumbbell Press.gif"),
      "incline-dumbbell-press": require("../../assets/gifs/chest/incline Dumbbell Press.gif"),
      "chest-fly": require("../../assets/gifs/chest/chest flys.gif"),
      "chest-dips": require("../../assets/gifs/chest/chest dips.gif"),
    };

    const shoulders: Record<string, any> = {
      "dumbbell-shoulder-press": require("../../assets/gifs/shoulders/dumbbell Shoulder Press.gif"),
      "machine-shoulder-press": require("../../assets/gifs/shoulders/machine Shoulder Press.gif"),
      "dumbbell-lateral-raise": require("../../assets/gifs/shoulders/dumbbell lateral Raise.gif"),
      "cable-lateral-raise": require("../../assets/gifs/shoulders/cable Lateral Raise.gif"),
      "reverse-pec-deck-fly": require("../../assets/gifs/shoulders/reverse Pec Deck Fly.gif"),
    };

    const legs: Record<string, any> = {
      "leg-press": require("../../assets/gifs/legs/leg press.gif"),
      "leg-extension": require("../../assets/gifs/legs/leg extension.gif"),
      "leg-curl": require("../../assets/gifs/legs/Leg curl.gif"),
      "hip-abduction": require("../../assets/gifs/legs/hip abduction.gif"),
      "hack-squat": require("../../assets/gifs/legs/hack squat.jpg"),
    };

    if (gg === "chest") return chest[String(variant)];
    if (gg === "shoulders") return shoulders[String(variant)];
    if (gg === "legs") return legs[String(variant)];
    return undefined;
  }, [group, variant]);

  // ✅ per-exercise current weight, default 0
  const [currentWeight, setCurrentWeight] = useState<number>(0);
  const [newWeight, setNewWeight] = useState<string>("");

  // load last weight for THIS exercise/variant only
  useEffect(() => {
    (async () => {
      if (!g || !ex || !v) {
        setCurrentWeight(0);
        return;
      }
      const w = await getLatestExerciseWeight({ group: g, exercise: ex, variant: v });
      setCurrentWeight(typeof w === "number" ? w : 0);
    })();
  }, [g, ex, v]);

  async function submitWeight() {
    const cleaned = newWeight.replace(",", ".").trim();
    const value = Number(cleaned);
    if (!Number.isFinite(value) || value <= 0) return;

    await saveExerciseWeight({ group: g, exercise: ex, variant: v, weight: value });
    setCurrentWeight(value);
    setNewWeight("");
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <LinearGradient colors={[BG1, BG2, "#050E18"]} style={styles.container}>
        <View style={styles.topNav}>
          <Pressable
            onPress={() =>
              router.replace({
                pathname: "/exercise",
                params: { group: group ?? "", exercise: exercise ?? "" },
              })
            }
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={20} color={GOLD} />
          </Pressable>

          <View style={styles.centerTitle}>
            <Text style={styles.title}>{displayTitle}</Text>
            <Text style={styles.subtitle}>TRACKER</Text>
          </View>

          <View style={{ width: 40 }} />
        </View>

        <View style={styles.body}>
          <View style={styles.card}>
            <View style={styles.cardInner}>
              {media ? (
                <Image source={media} style={styles.media} resizeMode="contain" />
              ) : (
                <View style={styles.mediaEmpty} />
              )}
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.weightHeader}>
              <Text style={styles.h1}>Current weight</Text>
              <Text style={styles.current}>{currentWeight} kg</Text>
            </View>

            <View style={styles.formRow}>
              <View style={styles.inputWrap}>
                <Text style={styles.inputLabel}>New weight (kg)</Text>
                <TextInput
                  value={newWeight}
                  onChangeText={setNewWeight}
                  placeholder="e.g. 82.5"
                  placeholderTextColor="rgba(255,255,255,0.35)"
                  keyboardType="decimal-pad"
                  style={styles.input}
                />
              </View>

              <Pressable
                onPress={submitWeight}
                style={({ pressed }) => [
                  styles.btn,
                  pressed && { transform: [{ scale: 0.99 }], opacity: 0.95 },
                ]}
              >
                <Ionicons name="checkmark" size={18} color="#0b1b2c" />
                <Text style={styles.btnText}>Save</Text>
              </Pressable>
            </View>

            <Text style={styles.note}>Tip: use “.” for decimals (82.5). Commas also work.</Text>
          </View>
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
    paddingBottom: 10,
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
  centerTitle: { alignItems: "center", gap: 4, flex: 1 },
  title: {
    color: "rgba(255,255,255,0.88)",
    fontWeight: "900",
    letterSpacing: 2,
    fontSize: 14,
    textAlign: "center",
  },
  subtitle: {
    color: "rgba(214,181,106,0.65)",
    letterSpacing: 1.4,
    fontWeight: "700",
    fontSize: 11,
  },

  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    gap: 14,
  },

  card: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    backgroundColor: CARD_BG,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
    overflow: "hidden",
    padding: 14,
  },

  media: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.12)",
  },
  mediaEmpty: {
    height: 220,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.12)",
  },
  cardInner: {},

  weightHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  h1: {
    color: "#fff",
    fontWeight: "900",
    letterSpacing: 1.2,
    fontSize: 14,
  },
  current: {
    color: "rgba(214,181,106,0.95)",
    fontWeight: "900",
    letterSpacing: 1,
    fontSize: 16,
  },

  formRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  inputWrap: { flex: 1 },
  inputLabel: {
    color: MUTED,
    fontWeight: "700",
    fontSize: 11,
    letterSpacing: 0.8,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  input: {
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(214,181,106,0.18)",
    backgroundColor: "rgba(0,0,0,0.18)",
    paddingHorizontal: 12,
    color: "#fff",
    fontWeight: "700",
  },

  btn: {
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: GOLD,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
  },
  btnText: {
    color: "#0b1b2c",
    fontWeight: "900",
    letterSpacing: 0.8,
  },

  note: {
    marginTop: 10,
    color: "rgba(255,255,255,0.45)",
    fontWeight: "600",
    fontSize: 12,
  },
});