import { colors } from "@/config/colors";
import { PropsWithChildren, useCallback } from "react";
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type ButtonProps = PressableProps &
  PropsWithChildren & {
    style?: StyleProp<ViewStyle>;
    invert?: boolean;
  };

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button = ({
  style,
  children,
  invert,
  onPress,
  ...props
}: ButtonProps) => {
  const backgroundColor = useSharedValue(invert ? "transparent" : colors.blue);
  const pulseTransparency = useSharedValue(1);

  const pressWrapper = useCallback(
    async (e: GestureResponderEvent) => {
      backgroundColor.value = withTiming(invert ? "transparent" : colors.sea, {
        duration: 200,
      });
      pulseTransparency.value = withRepeat(
        withSequence(
          withTiming(0.6, { duration: 600 }),
          withTiming(1, { duration: 600 }),
        ),
        -1,
        true,
      );
      await onPress?.(e);
      pulseTransparency.value = withTiming(1, { duration: 300 });
      backgroundColor.value = withTiming(invert ? "transparent" : colors.blue, {
        duration: 200,
      });
    },
    [backgroundColor, invert, onPress, pulseTransparency],
  );

  const animatedBackground = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
    opacity: pulseTransparency.value,
  }));

  return (
    <AnimatedPressable
      style={[styles.button, animatedBackground, style]}
      onPress={pressWrapper}
      {...props}
    >
      <Text style={[styles.text, invert && styles.invertColor]}>
        {children}
      </Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  invertColor: {
    color: colors.blue,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "Aeonik-Medium",
    textAlign: "center",
  },
});
