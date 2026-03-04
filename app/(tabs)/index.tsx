import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HomeTab() {
  return (
    <LinearGradient
      colors={["#0a2a4a", "#0b1b2c", "#08121e"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* subtle overlay to make it feel richer */}
      <View style={styles.overlay} />

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>MY APP</Text>
      </View>

      {/* Buttons */}
      <View style={styles.center}>
        <Pressable
          onPress={() => router.push("/workouts")}
          style={({ pressed }) => [
            styles.card,
            styles.cardWorkouts,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="barbell-outline" size={44} color="#0b1b2c" />
          <Text style={styles.cardText}>WORKOUTS</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/programs")}
          style={({ pressed }) => [
            styles.card,
            styles.cardPrograms,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="grid-outline" size={44} color="#0b1b2c" />
          <Text style={styles.cardText}>PROGRAMS</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  header: {
    marginTop: 44,
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 88,
    height: 88,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    letterSpacing: 2,
    color: "rgba(255,255,255,0.55)",
    fontWeight: "800",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    gap: 18,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },

  card: {
    height: 120,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  cardWorkouts: { backgroundColor: "#1c7b92" },
  cardPrograms: { backgroundColor: "#d38b16" },

  cardText: {
    color: "#ffffff",
    fontWeight: "900",
    letterSpacing: 1,
    fontSize: 18,
  },
  pressed: { transform: [{ scale: 0.98 }], opacity: 0.92 },
});