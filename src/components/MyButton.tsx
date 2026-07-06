import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { Fold } from "react-native-animated-spinkit";
// import { useTheme } from "../theme/ThemeContext";
import { scale, } from "../utils/responsive";
// import { useTheme } from "../theme/ThemeContex";
import { AppSizes } from "../utils/AppSizes";

import { getColors } from "../theme/color/theme";
import { useThemeContext } from "../theme/ThemeContex";
// import Icon from "../utils/Icons";

interface Props {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textColor?: string;
}

const MyButton = ({ text, onPress, disabled, loading, style, textColor = "#fff" }: Props) => {
  const { theme } = useThemeContext();
  const colors = getColors(theme);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? colors.borderColor : colors.primaryColor },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled || loading}
    >
      {loading ? <Fold size={28} color={textColor} /> : <Text style={[styles.text, { color: textColor }]}>{text}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: scale(12),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: AppSizes.FONT_18,
    // fontWeight: "600",
    fontFamily:'PlusJakartaSans-Bold'
  },
});

export default MyButton;
