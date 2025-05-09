import { colors } from "@/config/colors";
import { PropsWithChildren } from "react";
import { StyleSheet, Text } from "react-native";

type LabelProps = PropsWithChildren;

export const Label = ({ children }: LabelProps) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontVariant: ["tabular-nums"],
    color: colors.blue,
    fontFamily: "Aeonik-Bold",
  },
});
