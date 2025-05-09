import { colors } from "@/config/colors";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

type DelayedContentRendererProps = PropsWithChildren<{
  delaySeconds?: number;
}>;

export const DelayedContentRenderer = ({
  children,
  delaySeconds = 3,
}: DelayedContentRendererProps) => {
  const [showContent, setShowContent] = useState(false);
  const [countdown, setCountdown] = useState(delaySeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setShowContent(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [delaySeconds]);

  if (showContent) {
    return children;
  }

  return (
    <View style={styles.countdownContainer}>
      <Text style={styles.countdownText}>Rendering in {countdown}...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  countdownContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  countdownText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.blue,
    fontFamily: "Aeonik-Regular",
  },
});
