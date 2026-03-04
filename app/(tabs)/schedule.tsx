import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";

export default function Schedule() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={["#071A2A", "#061424", "#050E18"]}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ color: "white", fontWeight: "800", letterSpacing: 2 }}>
          SCHEDULE
        </Text>
      </LinearGradient>
    </>
  );
}