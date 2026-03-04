import React, { useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet, Image, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";

const GOLD = "#D6B56A";
const BG1 = "#071A2A";
const BG2 = "#061424";
const CARD_BG = "rgba(12, 35, 52, 0.55)";
const CARD_BORDER = "rgba(214,181,106,0.22)";
const MUTED = "rgba(255,255,255,0.65)";

export default function Tracker() {
  const { group, variant } = useLocalSearchParams<{
    group?: string;
    variant?: string;
  }>();

  const gif = useMemo(() => {
    if ((group ?? "").toLowerCase() !== "chest") return undefined;

    const map: Record<string, any> = {
      "flat-bench-press": require("../../assets/gifs/chest/flat Bench Press.gif"),
      "incline-bench-press": require("../../assets/gifs/chest/incline Bench Press.gif"),
      "decline-bench-press": require("../../assets/gifs/chest/decline Bench Press.gif"),

      "flat-dumbbell-press": require("../../assets/gifs/chest/flat Dumbbell Press.gif"),
      "incline-dumbbell-press": require("../../assets/gifs/chest/incline Dumbbell Press.gif"),

      "chest-fly": require("../../assets/gifs/chest/chest flys.gif"),
      "chest-dips": require("../../assets/gifs/chest/chest dips.gif"),
    };

    return variant ? map[String(variant)] : undefined;
  }, [group, variant]);

  // Weight state
  const [currentWeight, setCurrentWeight] = useState<number>(80); // default (change if you want)
  const [newWeight, setNewWeight] = useState<string>("");

  function submitWeight() {
    const cleaned = newWeight.replace(",", ".").trim();
    const value = Number(cleaned);

    if (!Number.isFinite(value) || value <= 0) return;

    setCurrentWeight(value);
    setNewWeight("");
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <LinearGradient
        colors={[BG1, BG2, "#050E18"]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={styles.container}
      >
        {/* Back button */}
        <View style={styles.topNav}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color={GOLD} />
          </Pressable>
        </View>

        <View style={styles.body}>
          {/* GIF CARD (shorter) */}
          <View style={styles.card}>
            <View style={styles.cardInner}>
              {gif ? (
                <Image source={gif} style={styles.gif} resizeMode="contain" />
              ) : (
                <View style={{ height: 220 }} />
              )}
            </View>
          </View>

          {/* WEIGHT CARD */}
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

            <Text style={styles.note}>
              Tip: use “.” for decimals (82.5). Commas also work.
            </Text>
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

  // shorter gif
  gif: {
    width: "100%",
    height: 220, // ✅ less height
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