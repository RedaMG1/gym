import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";

const GOLD = "#D6B56A";
const GOLD_SOFT = "rgba(214,181,106,0.35)";
const BG1 = "#071A2A";
const BG2 = "#061424";
const PANEL = "rgba(12, 35, 52, 0.78)";
const BORDER = "rgba(214,181,106,0.22)";

export default function HomeTab() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <LinearGradient
        colors={[BG1, BG2, "#050E18"]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.logoWrap}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>GYM FORGE</Text>
          <Text style={styles.subtitle}>FORGE • TRAIN • PROGRESS</Text>
        </View>

        <View style={styles.center}>
          <MenuBtn
            icon="barbell-outline"
            title="WORKOUTS"
            subtitle="Train today"
            onPress={() => router.push("/workouts")}
          />
          <MenuBtn
            icon="grid-outline"
            title="PROGRAMS"
            subtitle="Follow a path"
            onPress={() => router.push("/programs")}
          />
        </View>
      </LinearGradient>
    </>
  );
}

function MenuBtn({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        pressed && { transform: [{ scale: 0.99 }], opacity: 0.96 },
      ]}
    >
      <View style={styles.btnLeft}>
        <View style={styles.sigil}>
          <Ionicons name={icon} size={22} color={GOLD} />
        </View>
        <View>
          <Text style={styles.btnTitle}>{title}</Text>
          <Text style={styles.btnSub}>{subtitle}</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color={GOLD} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    paddingTop: 52,
    alignItems: "center",
    gap: 10,
  },
  logoWrap: {
    width: 130,
    height: 130,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: GOLD_SOFT,
    backgroundColor: "rgba(0,0,0,0.18)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  logo: { width: 118, height: 118 },

  title: {
    fontSize: 16,
    letterSpacing: 2.2,
    color: "rgba(255,255,255,0.75)",
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 11,
    letterSpacing: 1.3,
    color: "rgba(214,181,106,0.65)",
    textTransform: "uppercase",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 18,
    gap: 14,
  },

  btn: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: PANEL,
    borderWidth: 1,
    borderColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  btnLeft: { flexDirection: "row", alignItems: "center", gap: 12 },

  sigil: {
    width: 44,
    height: 44,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "rgba(0,0,0,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },

  btnTitle: {
    fontSize: 14,
    letterSpacing: 1.6,
    fontWeight: "900",
    color: "#fff",
  },
  btnSub: {
    marginTop: 4,
    fontSize: 11,
    color: "rgba(255,255,255,0.55)",
    fontWeight: "600",
  },
});