import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Fold } from "react-native-animated-spinkit";
import { scale } from "../utils/responsive";
import { AppSizes } from "../utils/AppSizes";
import { getColors } from "../theme/color/theme";
import { useThemeContext } from "../theme/ThemeContex";

interface Props {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textColor?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const MyButton = ({ text, onPress, disabled, loading, style, textColor = "#fff" }: Props) => {
  const { theme } = useThemeContext();
  const colors = getColors(theme);

  const scaleValue = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
  }));

  const handlePressIn = () => {
    if (!disabled && !loading) {
      scaleValue.value = withSpring(0.96, { damping: 15, stiffness: 300 });
    }
  };

  const handlePressOut = () => {
    if (!disabled && !loading) {
      scaleValue.value = withSpring(1, { damping: 15, stiffness: 300 });
    }
  };

  return (
    <AnimatedPressable
      style={[
        styles.button,
        { backgroundColor: disabled ? colors.borderColor : colors.primaryColor },
        style,
        animatedStyle,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
    >
      {loading ? <Fold size={AppSizes.ICON_20} color={textColor} /> : <Text style={[styles.text, { color: textColor }]}>{text}</Text>}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: scale(8),
    borderRadius: AppSizes.RADIUS_10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: AppSizes.FONT_18,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
});

export default MyButton;
