import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const GOLD = "#D6B56A";
const GOLD_SOFT = "rgba(214,181,106,0.35)";
const BG1 = "#071A2A";
const BG2 = "#061424";
const STONE = "rgba(12, 35, 52, 0.78)";

export default function HomeTab() {
  return (
    <LinearGradient
      colors={[BG1, BG2, "#050E18"]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.container}
    >
      {/* faint vignette */}
      <View style={styles.vignette} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoWrap}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>GYM FORGE</Text>
        <Text style={styles.subtitle}>forge • train • progress</Text>
      </View>

      {/* Buttons */}
      <View style={styles.center}>
        <RuneButton
          title="WORKOUTS"
          subtitle="Train today"
          icon="barbell-outline"
          onPress={() => router.push("/workouts")}
        />

        <RuneButton
          title="PROGRAMS"
          subtitle="Follow a path"
          icon="grid-outline"
          onPress={() => router.push("/programs")}
        />
      </View>
    </LinearGradient>
  );
}

function RuneButton({
  title,
  subtitle,
  icon,
  onPress,
}: {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && { transform: [{ scale: 0.99 }], opacity: 0.96 },
      ]}
    >
      {/* Gold rim */}
      <View style={styles.cardRim} />

      {/* Optional rune texture overlay.
          If you don't have runes.png, comment this ImageBackground block. */}
      <ImageBackground
        source={require("../../assets/images/runes.png")}
        resizeMode="cover"
        imageStyle={styles.runesImg}
        style={styles.cardInner}
      >
        {/* Left sigil */}
        <View style={styles.sigil}>
          <Ionicons name={icon} size={26} color={GOLD} />
        </View>

        {/* Text */}
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSub}>{subtitle}</Text>
        </View>

        {/* Chevron */}
        <Ionicons name="chevron-forward" size={22} color={GOLD} />
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  vignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.12)",
  },

  header: {
    paddingTop: 48,
    alignItems: "center",
    gap: 8,
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

  logo: {
    width: 118,
    height: 118,
  },

  title: {
    marginTop: 2,
    fontSize: 16,
    letterSpacing: 2.2,
    color: "rgba(255,255,255,0.70)",
    fontWeight: "900",
  },

  subtitle: {
    fontSize: 12,
    letterSpacing: 1.4,
    color: "rgba(214,181,106,0.65)",
    textTransform: "uppercase",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 18,
    paddingBottom: 18,
  },

  card: {
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },

  cardRim: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1.5,
    borderColor: GOLD_SOFT,
    borderRadius: 18,
  },

  cardInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: STONE,
  },

  runesImg: {
    opacity: 0.18,
    transform: [{ scale: 1.1 }],
  },

  sigil: {
    width: 44,
    height: 44,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: GOLD_SOFT,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: {
    fontSize: 16,
    letterSpacing: 1.6,
    color: "#ffffff",
    fontWeight: "900",
  },

  cardSub: {
    marginTop: 4,
    fontSize: 12,
    letterSpacing: 0.8,
    color: "rgba(255,255,255,0.55)",
    fontWeight: "600",
  },
});