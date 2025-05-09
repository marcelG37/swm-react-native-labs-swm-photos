import { colors } from "@/config/colors";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";

export function Logo() {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require("@/assets/images/adaptive-icon.png")}
        style={styles.logo}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: colors.blue,
    borderRadius: 100,
    padding: 16,
  },
  logo: {
    height: 80,
    width: 80,
  },
});
