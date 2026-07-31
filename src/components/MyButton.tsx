import React from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
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
  style?: StyleProp<ViewStyle>;
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
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? <Fold size={AppSizes.ICON_20} color={textColor} /> : <Text style={[styles.text, { color: textColor }]}>{text}</Text>}
    </TouchableOpacity>
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
